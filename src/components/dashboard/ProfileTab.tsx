"use client";

import React, { useState, useEffect } from 'react';
import { User, Shield, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";

export const ProfileTab = () => {
  const { user, fetchUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    currentPassword: '',
    newPassword: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const payload: any = { name: formData.name, phone: formData.phone };
      
      if (formData.currentPassword && formData.newPassword) {
        payload.currentPassword = formData.currentPassword;
        payload.newPassword = formData.newPassword;
      }
      
      const res = await fetch(`${API_URL}/api/v1/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        toast.success("Profile updated successfully!");
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '' })); // clear passwords
        fetchUser(); // refresh user store
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
        <User className="text-blue-600" /> Profile Settings
      </h2>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-10 shadow-sm">
        
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-2">Full Legal Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" 
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-2">Registered Email</label>
              <input 
                type="email" 
                disabled 
                value={user?.email || ''} 
                className="w-full p-3.5 border-2 border-gray-200 dark:border-gray-800 rounded-xl bg-gray-100 dark:bg-gray-950/50 text-gray-500 font-bold cursor-not-allowed outline-none" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-2">Verified Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full max-w-md p-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" 
            />
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 mt-8">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Shield size={20} className="text-gray-400" /> Security Credentials
            </h3>
            <div className="space-y-5 max-w-md">
              <input 
                type="password" 
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter Current Password" 
                className="w-full p-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" 
              />
              <input 
                type="password" 
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter New Password" 
                className="w-full p-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" 
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting && <Loader2 size={20} className="animate-spin" />}
              Sync Account Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
