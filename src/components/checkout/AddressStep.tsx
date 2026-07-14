"use client";

import React, { useState } from 'react';
import { MapPin, Plus, CheckCircle2 } from 'lucide-react';

const mockAddresses = [
  { id: '1', name: 'Home', phone: '01711223344', address: 'House 12, Road 5, Dhanmondi, Dhaka' },
  { id: '2', name: 'Office', phone: '01811223344', address: 'Level 4, IT Park, Karwan Bazar, Dhaka' }
];

export const AddressStep = ({ onComplete }: { onComplete: (address: any) => void }) => {
  const [selectedId, setSelectedId] = useState(mockAddresses[0].id);
  const [isAdding, setIsAdding] = useState(false);

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
        <form className="space-y-5 animate-in fade-in zoom-in-95 duration-200" onSubmit={(e) => { e.preventDefault(); setIsAdding(false); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
              <input type="text" required placeholder="e.g. Rahim Uddin" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
              <input type="tel" required placeholder="01XXXXXXXXX" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Detailed Address (House, Road, Area)</label>
            <textarea required rows={3} placeholder="Please provide exact location details..." className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors">Save Address</button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {mockAddresses.map(addr => (
            <div 
              key={addr.id} 
              onClick={() => setSelectedId(addr.id)}
              className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all ${selectedId === addr.id ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 shadow-[0_0_0_1px_rgba(37,99,235,1)]' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-gray-600'}`}
            >
              {selectedId === addr.id && <CheckCircle2 className="absolute top-4 right-4 text-blue-600" size={24} />}
              <div className="font-bold text-gray-900 dark:text-white mb-1.5 flex items-center gap-2">
                {addr.name} 
                {addr.id === '1' && <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Default</span>}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{addr.phone}</div>
              <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pr-8">{addr.address}</div>
            </div>
          ))}
        </div>
      )}

      {!isAdding && (
        <div className="flex justify-end border-t border-gray-100 dark:border-gray-800 pt-6">
          <button 
            onClick={() => onComplete(mockAddresses.find(a => a.id === selectedId))} 
            className="w-full md:w-auto px-10 py-3.5 bg-gray-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm"
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};
