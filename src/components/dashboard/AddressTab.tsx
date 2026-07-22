"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, Edit2, Trash2, Check, Plus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";

const DISTRICTS = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur", "Chapai Nawabganj", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajgonj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];

export const AddressTab = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const tDash = useTranslations("Dashboard");
  const tCheck = useTranslations("Checkout");

  const fetchAddresses = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/v1/addresses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAddresses(data.addresses.map((a: any) => ({ ...a, isEditing: false })));
      }
    } catch (error) {
      console.error("Failed to fetch addresses", error);
      toast.error("Failed to load addresses.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const toggleEdit = (id: string) => {
    setAddresses(addresses.map(a => (a._id === id || a.id === id) ? { ...a, isEditing: !a.isEditing } : a));
  };

  const updateField = (id: string, field: string, value: any) => {
    setAddresses(addresses.map(a => (a._id === id || a.id === id) ? { ...a, [field]: value } : a));
  };

  const addNewAddressForm = () => {
    if (addresses.some(a => a._id === 'new' || a.id === 'new')) return;
    
    setAddresses([{ 
      id: 'new', 
      title: 'Home', 
      phone: '', 
      addressLine: '', 
      isInsideDhaka: true,
      district: '',
      thana: '',
      isDefault: false, 
      isEditing: true 
    }, ...addresses]);
  };

  const cancelEdit = (id: string) => {
    if (id === 'new') {
      setAddresses(addresses.filter(a => a._id !== 'new' && a.id !== 'new'));
    } else {
      fetchAddresses();
    }
  };

  const saveAddress = async (addr: any) => {
    if (!addr.title || !addr.phone || !addr.addressLine) {
      toast.error("Please fill in Title, Phone, and Address Line.");
      return;
    }

    if (!addr.isInsideDhaka && (!addr.district || !addr.thana)) {
      toast.error("District and Thana are required when outside Dhaka.");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const addressId = addr.id || addr._id;
      const isNew = addressId === 'new';
      const method = isNew ? 'POST' : 'PUT';
      const url = isNew ? `${API_URL}/api/v1/addresses` : `${API_URL}/api/v1/addresses/${addressId}`;
      
      const payload: any = {
        title: addr.title,
        phone: addr.phone,
        addressLine: addr.addressLine,
        isInsideDhaka: addr.isInsideDhaka,
        isDefault: addr.isDefault || false
      };

      if (!addr.isInsideDhaka) {
        payload.district = addr.district;
        payload.thana = addr.thana;
      }

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        toast.success(isNew ? "Address added successfully" : "Address updated successfully");
        fetchAddresses();
      } else {
        toast.error(data.message || data.errors?.[0]?.message || "Failed to save address");
      }
    } catch (error) {
      toast.error("An error occurred while saving the address");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteAddress = async (id: string) => {
    if (id === 'new') {
      cancelEdit(id);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/v1/addresses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        toast.success("Address deleted successfully");
        setAddresses(addresses.filter(a => a._id !== id && a.id !== id));
      } else {
        toast.error(data.message || "Failed to delete address");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the address");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
          <MapPin className="text-blue-600" /> {tDash("addressBook")}
        </h2>
        <button onClick={addNewAddressForm} className="px-5 py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-black dark:hover:bg-gray-700 text-white font-bold text-sm rounded-xl transition-colors flex items-center gap-2 shadow-sm cursor-pointer">
          <Plus size={16} /> {tCheck("addNewAddress")}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {addresses.length === 0 && !isLoading && (
          <div className="col-span-full p-8 text-center bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500 font-semibold">{tDash("noSavedAddressesCheckout")}</p>
          </div>
        )}

        {addresses.map(addr => (
          <div key={addr.id || addr._id} className={`bg-white dark:bg-gray-900 border-2 rounded-2xl p-6 shadow-sm flex flex-col transition-colors ${addr.isEditing ? 'border-blue-500' : 'border-gray-200 dark:border-gray-800'}`}>
            
            {addr.isEditing ? (
              <div className="space-y-4 flex-1 animate-in fade-in">
                {/* Location Toggle */}
                <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                  <button
                    onClick={() => updateField(addr.id || addr._id, 'isInsideDhaka', true)}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${addr.isInsideDhaka ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                  >
                    {tCheck("insideDhaka")}
                  </button>
                  <button
                    onClick={() => updateField(addr.id || addr._id, 'isInsideDhaka', false)}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${!addr.isInsideDhaka ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                  >
                    {tCheck("outsideDhaka")}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">{tDash("locationType")}</label>
                    <input value={addr.title || ''} onChange={(e) => updateField(addr.id || addr._id, 'title', e.target.value)} className="w-full p-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-950 text-sm font-bold outline-none focus:border-blue-500 text-gray-900 dark:text-white transition-colors" placeholder="Home, Office..." />
                  </div>
                  <div className="col-span-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">{tCheck("phoneNumber")}</label>
                    <input value={addr.phone || ''} onChange={(e) => updateField(addr.id || addr._id, 'phone', e.target.value)} className="w-full p-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-950 text-sm font-semibold outline-none focus:border-blue-500 text-gray-900 dark:text-white transition-colors" placeholder="01712..." />
                  </div>
                </div>

                {!addr.isInsideDhaka && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">{tCheck("district")}</label>
                      <select value={addr.district || ''} onChange={(e) => updateField(addr.id || addr._id, 'district', e.target.value)} className="w-full p-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-950 text-sm font-semibold outline-none focus:border-blue-500 text-gray-900 dark:text-white transition-colors cursor-pointer">
                        <option value="">{tCheck("selectDistrict")}</option>
                        {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="col-span-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">{tCheck("thana")}</label>
                      <input value={addr.thana || ''} onChange={(e) => updateField(addr.id || addr._id, 'thana', e.target.value)} className="w-full p-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-950 text-sm font-semibold outline-none focus:border-blue-500 text-gray-900 dark:text-white transition-colors" placeholder="Thana/Upazila" />
                    </div>
                  </div>
                )}

                <div className="col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">{tDash("addressLine")}</label>
                  <textarea rows={2} value={addr.addressLine || ''} onChange={(e) => updateField(addr.id || addr._id, 'addressLine', e.target.value)} className="w-full p-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-950 text-sm font-semibold outline-none focus:border-blue-500 text-gray-900 dark:text-white resize-none transition-colors" placeholder="House/Road Details..." />
                </div>
                
                <label className="flex items-center gap-2 cursor-pointer mt-2">
                  <input type="checkbox" checked={addr.isDefault || false} onChange={(e) => updateField(addr.id || addr._id, 'isDefault', e.target.checked)} className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{tDash("setAsDefault")}</span>
                </label>
              </div>
            ) : (
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-gray-900 dark:text-white text-xl capitalize">{addr.title || 'Address'}</span>
                    {addr.isDefault && <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-blue-200 dark:border-blue-800">{tCheck("default")}</span>}
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${addr.isInsideDhaka ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}`}>
                    {addr.isInsideDhaka ? tCheck("insideDhaka") : tCheck("outsideDhaka")}
                  </span>
                </div>
                
                <div className="text-sm font-bold text-gray-500 dark:text-gray-400">Phone: {addr.phone}</div>
                
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed pr-6">
                  {addr.addressLine}
                  {!addr.isInsideDhaka && addr.district && (
                    <span className="block mt-1 text-gray-500">
                      {addr.thana ? `${addr.thana}, ` : ''}{addr.district}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className={`mt-6 pt-5 flex justify-end gap-3 border-t ${addr.isEditing ? 'border-blue-100 dark:border-gray-700' : 'border-gray-100 dark:border-gray-800'}`}>
              {addr.isEditing ? (
                <>
                  <button onClick={() => cancelEdit(addr.id || addr._id)} disabled={isSubmitting} className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer disabled:opacity-50">{tCheck("cancel")}</button>
                  <button onClick={() => saveAddress(addr)} disabled={isSubmitting} className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50">
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} {tDash("saveChanges")}
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => deleteAddress(addr.id || addr._id)} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors border border-transparent hover:border-red-200 cursor-pointer">
                    <Trash2 size={18} />
                  </button>
                  <button onClick={() => toggleEdit(addr.id || addr._id)} className="px-5 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-colors flex items-center gap-2 cursor-pointer">
                    <Edit2 size={14} /> {tDash("editData")}
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
