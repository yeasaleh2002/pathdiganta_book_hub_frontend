"use client";

import React from 'react';
import { Search, Bell, UserCircle, Menu, LogOut } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { useAdminStore } from '@/store/adminStore';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const AdminTopbar = () => {
  const { toggleMobileSidebar } = useAdminStore();
  const { user, fetchUser, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = () => {
    if(confirm("Are you sure you want to log out of the admin portal?")) {
      logout();
      router.push('/login');
    }
  };

  return (
    <header className="h-20 bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20 shrink-0">
      
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleMobileSidebar}
          className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="relative w-full max-w-md hidden md:block">
          <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search orders, inventory, or customers globally..." 
            className="w-full pl-11 pr-4 py-3 bg-gray-100/80 dark:bg-gray-900 border-none rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white transition-shadow"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <button className="relative p-2.5 text-gray-500 hover:text-gray-900 dark:hover:text-white bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-xl transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-gray-50 dark:border-gray-900"></span>
        </button>

        <div className="w-px h-8 bg-gray-200 dark:bg-gray-800 mx-1 md:mx-3"></div>

        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{user?.name || 'System Master'}</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Operations Deck</p>
          </div>
          {user?.name ? (
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold border-2 border-white dark:border-[#121212] shadow-sm uppercase">
              {user.name.charAt(0)}
            </div>
          ) : (
            <UserCircle size={38} className="text-blue-600 dark:text-blue-500" />
          )}
          
          <button onClick={handleLogout} className="ml-2 p-2.5 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-xl transition-colors" title="Log Out">
            <LogOut size={20} />
          </button>
        </div>
      </div>

    </header>
  );
};
