"use client";

import React, { useState, useEffect } from 'react';
import { Package, Truck, Star, X, CheckCircle2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";

export const OrdersTab = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [activeReviewItem, setActiveReviewItem] = useState<any>(null);
  const [activeOrderForReview, setActiveOrderForReview] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/v1/orders/my-orders`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
        toast.error("Failed to load your orders");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const openReviewModal = (order: any, item: any) => {
    setActiveOrderForReview(order);
    setActiveReviewItem(item);
    setRating(0);
    setReviewText('');
    setReviewModalOpen(true);
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please provide a star rating.");
      return;
    }
    
    setIsSubmittingReview(true);
    try {
      const token = localStorage.getItem('token');
      // Adjusting endpoint if needed, assuming POST /api/v1/reviews exists based on standard practices
      const res = await fetch(`${API_URL}/api/v1/reviews`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          book: activeReviewItem.book?._id || activeReviewItem._id, // Depends on populated structure
          rating,
          comment: reviewText
        })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        toast.success(`Review submitted for ${activeReviewItem.title || 'the book'}`);
        // Optionally update the local state to show it as reviewed
        setReviewModalOpen(false);
      } else {
        toast.error(data.message || "Failed to submit review");
      }
    } catch (error) {
      toast.error("An error occurred while submitting review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
        <Package className="text-blue-600" /> Order History
      </h2>

      {orders.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 font-semibold">You haven't placed any orders yet.</p>
        </div>
      ) : (
        orders.map(order => {
          const orderItems = order.items || order.orderItems || [];
          return (
          <div key={order.id || order._id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            
            <div className="bg-gray-50 dark:bg-gray-950 p-5 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 text-sm">
                <div>
                  <span className="block text-gray-500 uppercase tracking-widest text-[10px] font-bold mb-1">Order Placed</span>
                  <span className="font-black text-gray-900 dark:text-white text-base">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="block text-gray-500 uppercase tracking-widest text-[10px] font-bold mb-1">Total Amount</span>
                  <span className="font-black text-gray-900 dark:text-white text-base">৳{order.grandTotal}</span>
                </div>
                <div>
                  <span className="block text-gray-500 uppercase tracking-widest text-[10px] font-bold mb-1">Order ID</span>
                  <span className="font-black text-gray-900 dark:text-white text-base bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 rounded">{order.orderNumber}</span>
                </div>
              </div>
              
              <div className="w-full sm:w-auto flex justify-end">
                {order.orderStatus === 'SHIPPED' && order.trackingLink && (
                  <button className="w-full sm:w-auto px-5 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest rounded-xl border border-blue-200 dark:border-blue-800 flex justify-center items-center gap-2 transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/40 cursor-pointer">
                    <Truck size={16} /> Track Active Order
                  </button>
                )}
                {order.orderStatus === 'DELIVERED' && (
                  <span className="w-full sm:w-auto px-5 py-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest rounded-xl border border-emerald-200 dark:border-emerald-800/50 flex justify-center items-center gap-2">
                    <CheckCircle2 size={16} /> Delivered
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 flex flex-col gap-5">
              {orderItems.length > 0 ? orderItems.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-5 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white text-base line-clamp-1">{item.title || item.book?.title || 'Unknown Item'}</h4>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-1">Qty: {item.quantity || item.qty || 1} × ৳{item.price || 0}</p>
                  </div>
                  
                  {/* order.orderStatus === 'DELIVERED' && !item.reviewed && (
                    <button 
                      onClick={() => openReviewModal(order, item)}
                      className="px-5 py-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold text-xs uppercase tracking-wider rounded-lg hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 dark:hover:border-blue-500 transition-colors shadow-sm cursor-pointer"
                    >
                      Write a Review
                    </button>
                  ) */}
                  {/* order.orderStatus === 'DELIVERED' && item.reviewed && (
                    <span className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 bg-gray-50 dark:bg-gray-950 rounded-lg">
                      <Star size={14} className="fill-current" /> Reviewed
                    </span>
                  ) */}
                </div>
              )) : (
                <div className="text-sm text-gray-500">No items found for this order.</div>
              )}
            </div>
          </div>
        );
        })
      )}

      {/* 5-Star Interactive Review Submission Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50">
              <h3 className="font-black text-xl text-gray-900 dark:text-white">Rate Your Purchase</h3>
              <button onClick={() => setReviewModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1 bg-white dark:bg-gray-800 rounded-full shadow-sm cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={submitReview} className="p-8">
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-6 text-center">{activeReviewItem?.title || activeReviewItem?.book?.title}</p>
              
              <div className="flex gap-2 justify-center mb-8">
                {[1, 2, 3, 4, 5].map(star => (
                  <button 
                    key={star} 
                    type="button" 
                    onClick={() => setRating(star)}
                    className={`transition-colors transform hover:scale-110 active:scale-95 cursor-pointer ${star <= rating ? 'text-amber-500' : 'text-gray-200 dark:text-gray-800'}`}
                  >
                    <Star size={42} className="fill-current" />
                  </button>
                ))}
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Detailed Feedback</label>
                <textarea 
                  required 
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4} 
                  placeholder="What did you like or dislike about this book? (Minimum 10 characters)" 
                  className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors resize-none text-sm font-medium"
                />
              </div>

              <button type="submit" disabled={rating === 0 || isSubmittingReview} className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-xl shadow-lg transition-transform disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 cursor-pointer flex justify-center items-center gap-2">
                {isSubmittingReview ? <Loader2 className="animate-spin" /> : "Submit Verified Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
