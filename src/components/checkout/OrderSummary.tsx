"use client";

import React, { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { Tag, Gift, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const OrderSummary = () => {
  const { items } = useCartStore();
  
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [pointsApplied, setPointsApplied] = useState(false);
  
  const availablePoints = 450;
  const pointValue = 45; 

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = items.length > 0 ? 60 : 0; 
  
  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.toUpperCase() === 'NURIX10') {
      setDiscount(subtotal * 0.1);
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid or expired coupon code.");
    }
  };

  const pointsDiscount = pointsApplied ? pointValue : 0;
  const grandTotal = subtotal + shipping - discount - pointsDiscount;

  if (items.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm sticky top-28">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">Order Summary</h2>
      
      {/* Items Review Matrix */}
      <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-700">
        {items.map(item => (
          <div key={item.id} className="flex gap-4 text-sm bg-gray-50 dark:bg-gray-800/50 p-2 rounded-xl">
            <div className="w-14 h-20 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700">
              <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <span className="font-bold text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight pr-2">{item.title}</span>
              <span className="text-gray-500 dark:text-gray-400 mt-1 font-medium text-xs">Qty: {item.quantity} × ৳{item.price}</span>
            </div>
            <div className="font-black text-gray-900 dark:text-white flex items-center">
              ৳{item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-px bg-gray-100 dark:bg-gray-800 mb-6"></div>

      {/* Coupon Application Block */}
      <form onSubmit={applyCoupon} className="mb-6">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
          <Tag size={16} /> Promo Code
        </label>
        <div className="flex gap-2 relative">
          <input 
            type="text" 
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            disabled={discount > 0}
            placeholder="e.g. NURIX10" 
            className="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 uppercase text-sm font-bold disabled:opacity-50"
          />
          {discount > 0 ? (
            <button type="button" onClick={() => { setDiscount(0); setCoupon(''); }} className="px-5 py-2.5 bg-red-100 dark:bg-red-900/30 text-red-600 font-bold rounded-xl transition-colors text-sm">
              Remove
            </button>
          ) : (
            <button type="submit" className="px-5 py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-black dark:hover:bg-gray-700 text-white font-bold rounded-xl transition-colors text-sm">
              Apply
            </button>
          )}
        </div>
      </form>

      {/* Loyalty Points Block */}
      <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl flex items-center justify-between shadow-sm">
        <div>
          <span className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5 text-sm"><Gift size={16} className="text-amber-500" /> Reward Points</span>
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mt-0.5">Balance: {availablePoints} pts (৳{pointValue})</span>
        </div>
        <button 
          onClick={() => setPointsApplied(!pointsApplied)}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 ${pointsApplied ? 'bg-amber-500 text-white shadow-sm' : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-amber-400'}`}
        >
          {pointsApplied ? <><CheckCircle2 size={14} /> Applied</> : 'Redeem'}
        </button>
      </div>

      <div className="w-full h-px bg-gray-100 dark:bg-gray-800 mb-5"></div>

      {/* Breakdowns */}
      <div className="space-y-3 mb-6 text-sm">
        <div className="flex justify-between font-medium text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span className="text-gray-900 dark:text-white">৳{subtotal}</span>
        </div>
        <div className="flex justify-between font-medium text-gray-600 dark:text-gray-400">
          <span>Estimated Shipping</span>
          <span className="text-gray-900 dark:text-white">৳{shipping}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between font-bold text-emerald-600 dark:text-emerald-400">
            <span>Coupon Discount</span>
            <span>-৳{discount.toFixed(0)}</span>
          </div>
        )}
        
        {pointsApplied && (
          <div className="flex justify-between font-bold text-amber-600 dark:text-amber-400">
            <span>Points Redeemed</span>
            <span>-৳{pointsDiscount}</span>
          </div>
        )}
      </div>

      <div className="w-full h-px bg-gray-100 dark:bg-gray-800 mb-5"></div>
      
      <div className="flex justify-between items-end bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
        <span className="text-lg font-bold text-gray-900 dark:text-white">Grand Total</span>
        <span className="text-3xl font-black text-blue-600 dark:text-blue-400 leading-none">৳{grandTotal.toFixed(0)}</span>
      </div>
    </div>
  );
};
