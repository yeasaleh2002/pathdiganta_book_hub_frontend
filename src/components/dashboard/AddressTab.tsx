"use client";

import React, { useState } from 'react';
import { MapPin, Edit2, Trash2, Check, Plus } from 'lucide-react';

export const AddressTab = () => {
  const [addresses, setAddresses] = useState([
    { id: '1', name: 'Home', phone: '01711223344', details: 'House 12, Road 5, Dhanmondi, Dhaka', isEditing: false },
    { id: '2', name: 'Office', phone: '01811223344', details: 'Level 4, IT Park, Karwan Bazar, Dhaka', isEditing: false }
  ]);

  const toggleEdit = (id: string) => {
    setAddresses(addresses.map(a => a.id === id ? { ...a, isEditing: !a.isEditing } : a));
  };

  const updateField = (id: string, field: string, value: string) => {
    setAddresses(addresses.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const saveAddress = (id: string) => {
    // API Controller Payload execution goes here
    setAddresses(addresses.map(a => a.id === id ? { ...a, isEditing: false } : a));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
          <MapPin className="text-blue-600" /> Address Book
        </h2>
        <button className="px-5 py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-black dark:hover:bg-gray-700 text-white font-bold text-sm rounded-xl transition-colors flex items-center gap-2 shadow-sm">
          <Plus size={16} /> New Address
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {addresses.map(addr => (
          <div key={addr.id} className={`bg-white dark:bg-gray-900 border-2 rounded-2xl p-6 shadow-sm flex flex-col transition-colors ${addr.isEditing ? 'border-blue-500' : 'border-gray-200 dark:border-gray-800'}`}>
            
            {addr.isEditing ? (
              <div className="space-y-4 flex-1 animate-in fade-in">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">Location Tag</label>
                  <input value={addr.name} onChange={(e) => updateField(addr.id, 'name', e.target.value)} className="w-full p-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-950 text-sm font-bold outline-none focus:border-blue-500 text-gray-900 dark:text-white transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">Phone Network</label>
                  <input value={addr.phone} onChange={(e) => updateField(addr.id, 'phone', e.target.value)} className="w-full p-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-950 text-sm font-semibold outline-none focus:border-blue-500 text-gray-900 dark:text-white transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">Full Details</label>
                  <textarea rows={2} value={addr.details} onChange={(e) => updateField(addr.id, 'details', e.target.value)} className="w-full p-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-950 text-sm font-semibold outline-none focus:border-blue-500 text-gray-900 dark:text-white resize-none transition-colors" />
                </div>
              </div>
            ) : (
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-black text-gray-900 dark:text-white text-xl">{addr.name}</span>
                  {addr.id === '1' && <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-blue-200 dark:border-blue-800">Default</span>}
                </div>
                <div className="text-sm font-bold text-gray-500 dark:text-gray-400">{addr.phone}</div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed pr-6">{addr.details}</div>
              </div>
            )}

            <div className={`mt-6 pt-5 flex justify-end gap-3 border-t ${addr.isEditing ? 'border-blue-100 dark:border-gray-700' : 'border-gray-100 dark:border-gray-800'}`}>
              {addr.isEditing ? (
                <>
                  <button onClick={() => toggleEdit(addr.id)} className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">Cancel</button>
                  <button onClick={() => saveAddress(addr.id)} className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm flex items-center gap-2">
                    <Check size={16} /> Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors border border-transparent hover:border-red-200">
                    <Trash2 size={18} />
                  </button>
                  <button onClick={() => toggleEdit(addr.id)} className="px-5 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-colors flex items-center gap-2">
                    <Edit2 size={14} /> Edit Data
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
