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

function DashboardContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'orders');
  const router = useRouter();
  const { user } = useAuthStore();

  // Basic Session Termination execution
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: <User size={18} /> },
    { id: 'address', label: 'Address Book', icon: <MapPin size={18} /> },
    { id: 'orders', label: 'My Orders & Tracking', icon: <Package size={18} /> },
    { id: 'wishlist', label: 'Saved Wishlist', icon: <Heart size={18} /> },
    { id: 'rewards', label: 'Loyalty Rewards', icon: <Gift size={18} /> },
  ];

  return (
      <div className="max-w-[1400px] mx-auto px-4 py-8 md:py-12 min-h-screen">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          {/* Sidebar Navigation Matrix */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm sticky top-28">
              
              {/* User Identity Display */}
              <div className="p-8 border-b border-gray-100 dark:border-gray-800 text-center bg-gray-50/50 dark:bg-gray-950/50">
                <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-black mx-auto mb-4 shadow-md ring-4 ring-white dark:ring-gray-900 uppercase">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <h2 className="font-black text-gray-900 dark:text-white text-xl tracking-tight line-clamp-1">{user?.name || 'User'}</h2>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-1 truncate">{user?.email || 'email@example.com'}</p>
              </div>

              {/* Functional Routing Tabs */}
              <nav className="flex flex-col py-3 px-3">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3.5 px-5 py-4 text-sm font-bold rounded-xl transition-all mb-1 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md transform scale-[1.02]'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </nav>

              <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-black text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-800/50"
                >
                  <LogOut size={18} /> Secure Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Dashboard Workspace Node */}
          <div className="flex-1 w-full min-w-0">
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
  return (
    <ProtectedRoute>
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <DashboardContent />
      </React.Suspense>
    </ProtectedRoute>
  );
}
