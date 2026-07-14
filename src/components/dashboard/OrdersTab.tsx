"use client";

import React, { useState } from 'react';
import { Package, Truck, Star, X, CheckCircle2 } from 'lucide-react';

const mockOrders = [
  {
    id: 'PHB-728193',
    date: '2026-10-15',
    total: 1950,
    status: 'SHIPPED',
    trackingUrl: '/track/PHB-728193',
    items: [
      { id: '1', title: 'The Art of Clean Code Architecture', qty: 1, price: 850, reviewed: false }
    ]
  },
  {
    id: 'PHB-103942',
    date: '2026-09-02',
    total: 2400,
    status: 'DELIVERED',
    trackingUrl: null,
    items: [
      { id: '2', title: 'Introduction to Algorithms', qty: 1, price: 1250, reviewed: false },
      { id: '3', title: 'Domain-Driven Design', qty: 1, price: 1150, reviewed: true }
    ]
  }
];

export const OrdersTab = () => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [activeReviewItem, setActiveReviewItem] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const openReviewModal = (item: any) => {
    setActiveReviewItem(item);
    setRating(0);
    setReviewText('');
    setReviewModalOpen(true);
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate structural API Call POST /api/reviews
    alert(`Structural Review Logic Passed: ${activeReviewItem.title} - ${rating}/5 Stars.`);
    setReviewModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
        <Package className="text-blue-600" /> Order History
      </h2>

      {mockOrders.map(order => (
        <div key={order.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          
          <div className="bg-gray-50 dark:bg-gray-950 p-5 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 text-sm">
              <div>
                <span className="block text-gray-500 uppercase tracking-widest text-[10px] font-bold mb-1">Order Placed</span>
                <span className="font-black text-gray-900 dark:text-white text-base">{order.date}</span>
              </div>
              <div>
                <span className="block text-gray-500 uppercase tracking-widest text-[10px] font-bold mb-1">Total Amount</span>
                <span className="font-black text-gray-900 dark:text-white text-base">৳{order.total}</span>
              </div>
              <div>
                <span className="block text-gray-500 uppercase tracking-widest text-[10px] font-bold mb-1">Order ID</span>
                <span className="font-black text-gray-900 dark:text-white text-base bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 rounded">{order.id}</span>
              </div>
            </div>
            
            <div className="w-full sm:w-auto flex justify-end">
              {order.status === 'SHIPPED' && order.trackingUrl && (
                <button className="w-full sm:w-auto px-5 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest rounded-xl border border-blue-200 dark:border-blue-800 flex justify-center items-center gap-2 transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/40">
                  <Truck size={16} /> Track Active Order
                </button>
              )}
              {order.status === 'DELIVERED' && (
                <span className="w-full sm:w-auto px-5 py-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest rounded-xl border border-emerald-200 dark:border-emerald-800/50 flex justify-center items-center gap-2">
                  <CheckCircle2 size={16} /> Delivered
                </span>
              )}
            </div>
          </div>

          <div className="p-6 flex flex-col gap-5">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-5 last:border-0 last:pb-0">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white text-base line-clamp-1">{item.title}</h4>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-1">Qty: {item.qty} × ৳{item.price}</p>
                </div>
                
                {order.status === 'DELIVERED' && !item.reviewed && (
                  <button 
                    onClick={() => openReviewModal(item)}
                    className="px-5 py-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold text-xs uppercase tracking-wider rounded-lg hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 dark:hover:border-blue-500 transition-colors shadow-sm"
                  >
                    Write a Review
                  </button>
                )}
                {order.status === 'DELIVERED' && item.reviewed && (
                  <span className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 bg-gray-50 dark:bg-gray-950 rounded-lg">
                    <Star size={14} className="fill-current" /> Reviewed
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 5-Star Interactive Review Submission Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50">
              <h3 className="font-black text-xl text-gray-900 dark:text-white">Rate Your Purchase</h3>
              <button onClick={() => setReviewModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={submitReview} className="p-8">
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-6 text-center">{activeReviewItem?.title}</p>
              
              <div className="flex gap-2 justify-center mb-8">
                {[1, 2, 3, 4, 5].map(star => (
                  <button 
                    key={star} 
                    type="button" 
                    onClick={() => setRating(star)}
                    className={`transition-colors transform hover:scale-110 active:scale-95 ${star <= rating ? 'text-amber-500' : 'text-gray-200 dark:text-gray-800'}`}
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

              <button type="submit" disabled={rating === 0} className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-xl shadow-lg transition-transform disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5">
                Submit Verified Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
