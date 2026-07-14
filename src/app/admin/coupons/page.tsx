"use client";

import React, { useState, useEffect } from 'react';
import { Ticket, Plus, Tag, Gift, Truck, Users, Calendar, Search, Trash2, ShieldCheck, Activity, Check } from 'lucide-react';
import ConfirmModal from '@/components/admin/ConfirmModal';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";

type Coupon = {
  id: string;
  code: string;
  type: string;
  value: number;
  minSpend?: number;
  validUntil: string;
  isActive: boolean;
};

export default function PromotionalCouponsAdminPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [search, setSearch] = useState('');
  
  // Builder Engine States
  const [isBuilding, setIsBuilding] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '', type: 'PERCENTAGE', value: '', minSpend: '', validUntil: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [cacheStatus, setCacheStatus] = useState<string | null>(null);

  // Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<string | null>(null);

  const showToast = (message: string) => {
    setCacheStatus(message);
    setTimeout(() => {
      setCacheStatus(null);
    }, 2500);
  };

  const fetchCoupons = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/v1/admin/coupons`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setCoupons(data.coupons);
      }
    } catch (error) {
      console.error("Failed to load coupons", error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const filtered = coupons.filter(c => c.code.toLowerCase().includes(search.toLowerCase()));

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const payload = {
        code: newCoupon.code.toUpperCase().replace(/\s/g, ''),
        type: newCoupon.type,
        value: Number(newCoupon.value),
        validUntil: new Date(newCoupon.validUntil).toISOString(),
        ...(newCoupon.minSpend ? { minSpend: Number(newCoupon.minSpend) } : {})
      };

      const res = await fetch(`${API_URL}/api/v1/admin/coupons`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (data.success) {
        setIsBuilding(false);
        setNewCoupon({ code: '', type: 'PERCENTAGE', value: '', minSpend: '', validUntil: '' });
        showToast("Coupon deployed to production!");
        fetchCoupons();
      } else {
        alert(data.message || "Failed to create coupon.");
      }
    } catch (error) {
      alert("An error occurred during coupon creation.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setCouponToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!couponToDelete) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/v1/admin/coupons/${couponToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.success) {
        setCoupons(coupons.filter(c => c.id !== couponToDelete));
        showToast("Coupon revoked permanently.");
      } else {
        alert(data.message || "Failed to delete coupon.");
      }
    } catch (error) {
      alert("An error occurred during coupon deletion.");
    } finally {
      setDeleteModalOpen(false);
      setCouponToDelete(null);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PERCENTAGE': return <Tag size={16} />;
      case 'FIXED': return <Gift size={16} />;
      case 'FREE_DELIVERY': return <Truck size={16} />;
      default: return <Tag size={16} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'PERCENTAGE': return 'Percentage';
      case 'FIXED': return 'Fixed Amount';
      case 'FREE_DELIVERY': return 'Free Delivery';
      default: return type;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl relative">
      
      <ConfirmModal 
        isOpen={deleteModalOpen}
        title="Revoke Promotional Asset?"
        message="DANGER: Are you sure you want to deactivate and purge this operational coupon code? This immediately impacts cart checkouts and cannot be undone."
        confirmText="Yes, Revoke Asset"
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setCouponToDelete(null);
        }}
      />
      
      {cacheStatus && (
        <div className="fixed top-24 right-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-in slide-in-from-right-10 fade-in duration-300">
          <Check size={20} className="text-emerald-400 dark:text-emerald-600" />
          <span className="font-bold text-sm tracking-wide">{cacheStatus}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Ticket className="text-blue-600" /> Promotion Coupon Engine
          </h1>
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-widest">Architect dynamic marketing codes to control cart subtotal overrides.</p>
        </div>
        <button 
          onClick={() => setIsBuilding(true)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-transform hover:-translate-y-0.5 flex items-center gap-2"
        >
          <Plus size={18} strokeWidth={3} /> Architect New Coupon
        </button>
      </div>

      {isBuilding && (
        <form onSubmit={handleCreateCoupon} className="bg-white dark:bg-[#121212] border-2 border-blue-500 dark:border-blue-600 p-8 rounded-3xl shadow-lg animate-in slide-in-from-top-4">
          <div className="flex items-center gap-3 border-b-2 border-gray-100 dark:border-gray-800 pb-6 mb-6">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl"><ShieldCheck size={24} /></div>
            <div>
              <h3 className="font-black text-xl text-gray-900 dark:text-white">Active Node Configuration</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">All data parameters strictly enforce checkout logic automatically.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="lg:col-span-1">
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Unique Code</label>
              <input required autoFocus value={newCoupon.code} onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})} placeholder="e.g. SUMMER26" className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-black outline-none focus:border-blue-500 transition-colors uppercase tracking-widest placeholder:text-gray-400 placeholder:font-bold" />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Campaign Type</label>
              <select required value={newCoupon.type} onChange={(e) => setNewCoupon({...newCoupon, type: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors appearance-none">
                <option value="PERCENTAGE">Percentage</option>
                <option value="FIXED">Fixed Amount</option>
                <option value="FREE_DELIVERY">Free Delivery</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Discount Asset Size</label>
              <input required={newCoupon.type !== 'FREE_DELIVERY'} disabled={newCoupon.type === 'FREE_DELIVERY'} type="number" min="0" value={newCoupon.value} onChange={(e) => setNewCoupon({...newCoupon, value: e.target.value})} placeholder={newCoupon.type === 'FREE_DELIVERY' ? 'N/A' : 'Amount (e.g. 10)'} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-emerald-600 dark:text-emerald-400 font-black outline-none focus:border-emerald-500 transition-colors disabled:opacity-50 placeholder:text-gray-400 placeholder:font-bold" />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Min Spend (Opt)</label>
              <input type="number" min="0" value={newCoupon.minSpend} onChange={(e) => setNewCoupon({...newCoupon, minSpend: e.target.value})} placeholder="e.g. 500" className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400 placeholder:font-bold" />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Target Expiry Date</label>
              <input required type="datetime-local" value={newCoupon.validUntil} onChange={(e) => setNewCoupon({...newCoupon, validUntil: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" />
            </div>

          </div>

          <div className="mt-8 pt-6 border-t-2 border-gray-100 dark:border-gray-800 flex justify-end gap-3">
            <button type="button" onClick={() => setIsBuilding(false)} disabled={isLoading} className="px-6 py-4 text-xs uppercase tracking-widest font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors disabled:opacity-50">Abort</button>
            <button type="submit" disabled={isLoading} className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-transform hover:-translate-y-0.5 shadow-sm flex items-center gap-2 disabled:opacity-50"><Check size={18} strokeWidth={3} /> Inject Coupon Array</button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-[#121212] border-2 border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-6 md:p-8 border-b-2 border-gray-100 dark:border-gray-800 flex items-center bg-gray-50/50 dark:bg-gray-900/50">
          <div className="relative w-full max-w-lg">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Query structural matrix by Promo Code Anchor..." 
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:border-blue-500 text-gray-900 dark:text-white transition-colors placeholder:text-gray-400 placeholder:font-bold"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-gray-900/80 border-b-2 border-gray-200 dark:border-gray-800">
                <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500">Promo Code Anchor</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-center">Logic Type</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-right">Value Payload</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-center">Constraints</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-center">State Status</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-50 dark:divide-gray-800/50 text-sm">
              {filtered.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="font-mono font-black text-base text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-lg tracking-widest">{coupon.code}</span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex items-center justify-center gap-1.5 font-bold text-gray-600 dark:text-gray-400">
                      {getTypeIcon(coupon.type)}
                      <span>{getTypeLabel(coupon.type)}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right font-black text-emerald-600 dark:text-emerald-400 text-lg">
                    {coupon.type === 'FREE_DELIVERY' ? '-' : coupon.type === 'PERCENTAGE' ? `${coupon.value}%` : `৳${coupon.value}`}
                  </td>
                  <td className="px-8 py-5 text-center">
                    <p className="font-bold text-gray-500 text-xs uppercase tracking-widest">Min ৳{coupon.minSpend || 0}</p>
                    <p className="font-bold text-gray-900 dark:text-gray-200 text-xs mt-1">Exp: {new Date(coupon.validUntil).toLocaleDateString()}</p>
                  </td>
                  <td className="px-8 py-5 text-center">
                    {coupon.isActive ? (
                      <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-1 justify-center w-max mx-auto"><Activity size={12} /> Active</span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-[10px] font-black uppercase tracking-widest rounded border border-red-200 dark:border-red-800/50 flex items-center gap-1 justify-center w-max mx-auto"><Activity size={12} /> Deprecated</span>
                    )}
                  </td>
                  <td className="px-8 py-5 text-right opacity-40 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleDelete(coupon.id)} className="p-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-500 rounded-xl transition-colors"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <p className="text-gray-500 font-black text-xl mb-2">No promotional assets matched query.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
