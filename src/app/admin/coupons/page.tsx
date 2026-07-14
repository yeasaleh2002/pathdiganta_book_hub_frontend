"use client";

import React, { useState } from 'react';
import { Ticket, Plus, Tag, Gift, Truck, Users, Calendar, Search, Trash2, ShieldCheck, Activity, Check } from 'lucide-react';

const mockCoupons = [
  { id: '1', code: 'EID2026', type: 'Percentage', value: 15, currentUses: 342, maxUses: 1000, expiry: '2026-08-01', active: true },
  { id: '2', code: 'FREESHIP', type: 'Free Delivery', value: 0, currentUses: 1205, maxUses: 5000, expiry: '2026-12-31', active: true },
  { id: '3', code: 'NEWUSER50', type: 'Fixed', value: 50, currentUses: 89, maxUses: 500, expiry: '2026-07-30', active: true },
  { id: '4', code: 'EXPIRED10', type: 'Percentage', value: 10, currentUses: 500, maxUses: 500, expiry: '2026-01-01', active: false },
];

export default function PromotionalCouponsAdminPage() {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [search, setSearch] = useState('');
  
  // Builder Engine States
  const [isBuilding, setIsBuilding] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '', type: 'Percentage', value: '', maxUses: '', expiry: ''
  });

  const filtered = coupons.filter(c => c.code.toLowerCase().includes(search.toLowerCase()));

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: Math.random().toString(),
      code: newCoupon.code.toUpperCase().replace(/\s/g, ''),
      type: newCoupon.type,
      value: Number(newCoupon.value) || 0,
      currentUses: 0,
      maxUses: Number(newCoupon.maxUses) || 9999,
      expiry: newCoupon.expiry,
      active: true
    };
    
    setCoupons([payload, ...coupons]);
    setIsBuilding(false);
    setNewCoupon({ code: '', type: 'Percentage', value: '', maxUses: '', expiry: '' });
  };

  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to deactivate and purge this operational coupon code?")) {
      setCoupons(coupons.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl">
      
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
            
            <div className="lg:col-span-2">
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Unique Code Anchor</label>
              <input required autoFocus value={newCoupon.code} onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})} placeholder="e.g. SUMMER26" className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-black outline-none focus:border-blue-500 transition-colors uppercase tracking-widest" />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Campaign Type</label>
              <select required value={newCoupon.type} onChange={(e) => setNewCoupon({...newCoupon, type: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors appearance-none">
                <option>Percentage</option>
                <option>Fixed</option>
                <option>Free Delivery</option>
                <option>Referral</option>
                <option>Birthday</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Discount Asset Size</label>
              <input required={newCoupon.type !== 'Free Delivery'} disabled={newCoupon.type === 'Free Delivery'} type="number" min="1" value={newCoupon.value} onChange={(e) => setNewCoupon({...newCoupon, value: e.target.value})} placeholder={newCoupon.type === 'Free Delivery' ? 'N/A' : 'Amount'} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-emerald-600 dark:text-emerald-400 font-black outline-none focus:border-emerald-500 transition-colors disabled:opacity-50" />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Target Expiry Date</label>
              <input required type="date" value={newCoupon.expiry} onChange={(e) => setNewCoupon({...newCoupon, expiry: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" />
            </div>

          </div>

          <div className="mt-8 pt-6 border-t-2 border-gray-100 dark:border-gray-800 flex justify-end gap-3">
            <button type="button" onClick={() => setIsBuilding(false)} className="px-6 py-4 text-xs uppercase tracking-widest font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">Abort</button>
            <button type="submit" className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-transform hover:-translate-y-0.5 shadow-sm flex items-center gap-2"><Check size={18} strokeWidth={3} /> Inject Coupon Array</button>
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
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:border-blue-500 text-gray-900 dark:text-white transition-colors"
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
                <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-center">Usage Burn Rate</th>
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
                      {coupon.type === 'Percentage' && <Tag size={16} />}
                      {coupon.type === 'Fixed' && <Gift size={16} />}
                      {coupon.type === 'Free Delivery' && <Truck size={16} />}
                      {coupon.type === 'Referral' && <Users size={16} />}
                      {coupon.type === 'Birthday' && <Calendar size={16} />}
                      <span>{coupon.type}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right font-black text-emerald-600 dark:text-emerald-400 text-lg">
                    {coupon.type === 'Free Delivery' ? '-' : coupon.type === 'Percentage' ? `${coupon.value}%` : `৳${coupon.value}`}
                  </td>
                  <td className="px-8 py-5 text-center">
                    <p className="font-bold text-gray-900 dark:text-gray-200">{coupon.currentUses} <span className="text-gray-400 mx-1">/</span> {coupon.maxUses}</p>
                    <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto mt-2 overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${Math.min((coupon.currentUses / coupon.maxUses) * 100, 100)}%` }}></div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    {coupon.active ? (
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
