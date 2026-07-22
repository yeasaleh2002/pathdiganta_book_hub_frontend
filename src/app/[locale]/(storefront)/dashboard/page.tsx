"use client";

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { User, MapPin, Package, Heart, Gift, LogOut } from 'lucide-react';
import { ProfileTab } from '@/components/dashboard/ProfileTab';
import { AddressTab } from '@/components/dashboard/AddressTab';
import { OrdersTab } from '@/components/dashboard/OrdersTab';
import { WishlistTab } from '@/components/dashboard/WishlistTab';
import { RewardsTab } from '@/components/dashboard/RewardsTab';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useTranslations } from 'next-intl';

function DashboardContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'orders');
  const router = useRouter();
  const { user } = useAuthStore();
  const t = useTranslations("Dashboard");

  // Basic Session Termination execution
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const tabs = [
    { id: 'profile', label: t('profileSettings'), icon: <User size={18} /> },
    { id: 'address', label: t('addressBook'), icon: <MapPin size={18} /> },
    { id: 'orders', label: t('myOrders'), icon: <Package size={18} /> },
    { id: 'wishlist', label: t('savedWishlist'), icon: <Heart size={18} /> },
    { id: 'rewards', label: t('loyaltyRewards'), icon: <Gift size={18} /> },
  ];

  return (
      <div className="w-full min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-[#0a0a0a] relative flex flex-col md:flex-row items-start">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-sky-600/10 to-transparent dark:from-sky-900/20 pointer-events-none z-0" />
        <div className="absolute top-40 right-0 w-96 h-96 bg-sky-500/10 dark:bg-sky-600/10 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Top Tabs on Mobile, Left Sidebar on Desktop */}
        <div className="w-full md:w-48 lg:w-64 flex-shrink-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 z-20 flex flex-col sticky top-[64px] md:top-[80px] md:h-[calc(100vh-80px)] shadow-sm md:shadow-none">
          
          <div className="hidden md:block p-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-black text-gray-900 dark:text-white text-base lg:text-lg tracking-tight truncate">{user?.name || 'User'}</h2>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 truncate">{user?.email || 'email@example.com'}</p>
          </div>

          <nav className="flex flex-row md:flex-col py-2 md:py-4 px-2 md:px-2 gap-2 flex-1 overflow-x-auto md:overflow-y-auto no-scrollbar items-center md:items-stretch">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-row items-center gap-2 px-3 md:px-4 py-2 md:py-3 text-xs lg:text-sm font-bold rounded-xl transition-all whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex-shrink-0">{tab.icon}</div> 
                <span className="text-left leading-tight break-words">{tab.label}</span>
              </button>
            ))}
            
            {/* Mobile Logout (shows in tab row) */}
            <button 
              onClick={handleLogout}
              className="md:hidden flex flex-row items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl transition-colors whitespace-nowrap flex-shrink-0 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut size={16} /> <span>{t("logout")}</span>
            </button>
          </nav>

          <div className="hidden md:block p-4 border-t border-gray-100 dark:border-gray-800">
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-black text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
            >
              <LogOut size={16} /> <span>{t("logout")}</span>
            </button>
          </div>
        </div>

        {/* Main Dashboard Workspace Node */}
        <div className="flex-1 min-w-0 relative z-10 w-full">
          <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'address' && <AddressTab />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'wishlist' && <WishlistTab />}
            {activeTab === 'rewards' && <RewardsTab />}
          </div>
        </div>
      </div>
  );
}

export default function DashboardPage() {
  const t = useTranslations("Dashboard");
  return (
    <ProtectedRoute>
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">{t("loading")}</div>}>
        <DashboardContent />
      </React.Suspense>
    </ProtectedRoute>
  );
}
