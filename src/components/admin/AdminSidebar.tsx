"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Library, Boxes, ShoppingCart, Megaphone, Settings, Store, X, Bell } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';
import { useAuthStore } from '@/store/authStore';

const navItems = [
  { label: 'Metrics Analytics', href: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Order Pipelines', href: '/admin/orders', icon: <ShoppingCart size={20} /> },
  { label: 'Inventory Management', href: '/admin/inventory', icon: <Boxes size={20} /> },
  { label: 'Dynamic Categories', href: '/admin/categories', icon: <Library size={20} /> },
  { label: 'Promotion Builders', href: '/admin/promotions', icon: <Megaphone size={20} /> },
  { label: 'Coupon Engine', href: '/admin/coupons', icon: <Megaphone size={20} /> },
  { label: 'System Notifications', href: '/admin/notifications', icon: <Bell size={20} /> },
  { label: 'Settings', href: '/admin/settings', icon: <Settings size={20} /> },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const { isMobileSidebarOpen, closeMobileSidebar } = useAdminStore();
  const { user } = useAuthStore();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`w-72 bg-white dark:bg-[#121212] border-r border-gray-200 dark:border-gray-800 flex-col h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 fixed lg:relative transition-transform duration-300 ease-in-out ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex`}>
      
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-gray-200 dark:border-gray-800 shrink-0">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-xl shadow-sm">
            <Store size={22} />
          </div>
          <div>
            <h1 className="font-black text-gray-900 dark:text-white leading-tight tracking-tight">PATHDIGONTO</h1>
            <p className="text-[9px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest">Admin Control Matrix</p>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
        <p className="px-4 text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Core Modules</p>
        
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link 
              key={item.href}
              href={item.href}
              onClick={closeMobileSidebar}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md transform scale-[1.02]' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {item.icon} {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Current User Footprint */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-800 shrink-0 bg-gray-50/50 dark:bg-gray-950/50">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold border-2 border-white dark:border-[#121212] shadow-sm uppercase">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight truncate">{user?.name || 'Super Admin'}</p>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 truncate">{user?.email || 'System Online'}</p>
            </div>
         </div>
      </div>

    </aside>
    </>
  );
};
