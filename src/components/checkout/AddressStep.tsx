"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, Plus, CheckCircle2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";

export const AddressStep = ({ onComplete }: { onComplete: (address: any) => void }) => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newAddress, setNewAddress] = useState({ title: '', phone: '', addressLine: '' });

  const fetchAddresses = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/v1/addresses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0 && !selectedId) {
          const defaultAddr = data.addresses.find((a: any) => a.isDefault) || data.addresses[0];
          setSelectedId(defaultAddr._id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.title || !newAddress.phone || !newAddress.addressLine) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/v1/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAddress)
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Address added successfully");
        setIsAdding(false);
        setNewAddress({ title: '', phone: '', addressLine: '' });
        fetchAddresses();
      } else {
        toast.error(data.message || "Failed to save address");
      }
    } catch (error) {
      toast.error("An error occurred while saving the address");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <MapPin className="text-blue-600" /> Shipping Information
        </h2>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline">
            <Plus size={16} /> Add New Address
          </button>
        )}
      </div>

      {isAdding ? (
        <form className="space-y-5 animate-in fade-in zoom-in-95 duration-200" onSubmit={handleSaveAddress}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Location Title (e.g. Home, Office)</label>
              <input type="text" value={newAddress.title} onChange={e => setNewAddress({...newAddress, title: e.target.value})} required placeholder="e.g. Home" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
              <input type="tel" value={newAddress.phone} onChange={e => setNewAddress({...newAddress, phone: e.target.value})} required placeholder="01XXXXXXXXX" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Detailed Address (House, Road, Area)</label>
            <textarea value={newAddress.addressLine} onChange={e => setNewAddress({...newAddress, addressLine: e.target.value})} required rows={3} placeholder="Please provide exact location details..." className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" disabled={isSubmitting} onClick={() => setIsAdding(false)} className="px-6 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50">
              {isSubmitting && <Loader2 size={16} className="animate-spin" />} Save Address
            </button>
          </div>
        </form>
      ) : isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin text-blue-600" />
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400 mb-4">You don't have any saved addresses yet.</p>
          <button onClick={() => setIsAdding(true)} className="px-6 py-2.5 text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {addresses.map(addr => (
            <div 
              key={addr._id} 
              onClick={() => setSelectedId(addr._id)}
              className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all ${selectedId === addr._id ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 shadow-[0_0_0_1px_rgba(37,99,235,1)]' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-gray-600'}`}
            >
              {selectedId === addr._id && <CheckCircle2 className="absolute top-4 right-4 text-blue-600" size={24} />}
              <div className="font-bold text-gray-900 dark:text-white mb-1.5 flex items-center gap-2">
                {addr.title} 
                {addr.isDefault && <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Default</span>}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{addr.phone}</div>
              <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pr-8">{addr.addressLine}</div>
            </div>
          ))}
        </div>
      )}

      {!isAdding && addresses.length > 0 && (
        <div className="flex justify-end border-t border-gray-100 dark:border-gray-800 pt-6">
          <button 
            onClick={() => onComplete(addresses.find(a => a._id === selectedId))} 
            disabled={!selectedId}
            className="w-full md:w-auto px-10 py-3.5 bg-gray-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm disabled:opacity-50"
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};
