"use client";

import React, { useState } from 'react';
import { Settings, Sliders, Shield, Bell, CreditCard, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Settings className="text-blue-600" /> Platform Configuration
          </h1>
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-widest">Manage core system variables, security policies, and integrations.</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer">
          <Save size={18} strokeWidth={3} /> Commit Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <div 
            onClick={() => setActiveTab('general')}
            className={`rounded-2xl p-4 flex items-center gap-3 cursor-pointer shadow-sm transition-colors border-2 ${activeTab === 'general' ? 'bg-white dark:bg-[#121212] border-blue-500 text-blue-600 dark:text-blue-400' : 'bg-transparent border-transparent hover:border-gray-200 dark:hover:border-gray-800 text-gray-600 dark:text-gray-400'}`}
          >
            <Sliders size={20} />
            <span className="font-bold">General Setup</span>
          </div>
          <div 
            onClick={() => setActiveTab('security')}
            className={`rounded-2xl p-4 flex items-center gap-3 cursor-pointer shadow-sm transition-colors border-2 ${activeTab === 'security' ? 'bg-white dark:bg-[#121212] border-blue-500 text-blue-600 dark:text-blue-400' : 'bg-transparent border-transparent hover:border-gray-200 dark:hover:border-gray-800 text-gray-600 dark:text-gray-400'}`}
          >
            <Shield size={20} />
            <span className="font-bold">Security & Auth</span>
          </div>
          <div 
            onClick={() => setActiveTab('payment')}
            className={`rounded-2xl p-4 flex items-center gap-3 cursor-pointer shadow-sm transition-colors border-2 ${activeTab === 'payment' ? 'bg-white dark:bg-[#121212] border-blue-500 text-blue-600 dark:text-blue-400' : 'bg-transparent border-transparent hover:border-gray-200 dark:hover:border-gray-800 text-gray-600 dark:text-gray-400'}`}
          >
            <CreditCard size={20} />
            <span className="font-bold">Payment Gateway</span>
          </div>
          <div 
            onClick={() => setActiveTab('notifications')}
            className={`rounded-2xl p-4 flex items-center gap-3 cursor-pointer shadow-sm transition-colors border-2 ${activeTab === 'notifications' ? 'bg-white dark:bg-[#121212] border-blue-500 text-blue-600 dark:text-blue-400' : 'bg-transparent border-transparent hover:border-gray-200 dark:hover:border-gray-800 text-gray-600 dark:text-gray-400'}`}
          >
            <Bell size={20} />
            <span className="font-bold">Email Notifications</span>
          </div>
        </div>

        {/* Configuration Surface */}
        <div className="lg:col-span-2 bg-white dark:bg-[#121212] border-2 border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
          
          {activeTab === 'general' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 tracking-tight border-b-2 border-gray-100 dark:border-gray-800 pb-4">General Parameters</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Platform Name</label>
                  <input type="text" defaultValue="Pathdigonto Book Hub" placeholder="Enter platform name..." className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Support Email Address</label>
                  <input type="email" defaultValue="support@pathdigonto.com" placeholder="support@example.com" className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400" />
                </div>
                <div className="pt-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded-md focus:ring-blue-500 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 cursor-pointer" />
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Enable Maintenance Mode</span>
                  </label>
                  <p className="text-xs font-bold text-gray-500 mt-2 ml-8">Activating this will block all non-admin traffic and display a maintenance screen.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 tracking-tight border-b-2 border-gray-100 dark:border-gray-800 pb-4">Security & Authentication</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">JWT Secret Key</label>
                  <input type="password" defaultValue="************************" placeholder="Enter JWT secret..." className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400" />
                </div>
                <div className="pt-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded-md focus:ring-blue-500 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 cursor-pointer" />
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Require Two-Factor Auth (2FA) for Admins</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 tracking-tight border-b-2 border-gray-100 dark:border-gray-800 pb-4">Payment Gateway (SSL Commerz)</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Store ID</label>
                  <input type="text" defaultValue="pathdigonto_live" placeholder="Enter Store ID..." className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Store Password</label>
                  <input type="password" defaultValue="********" placeholder="Enter Store Password..." className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400" />
                </div>
                <div className="pt-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded-md focus:ring-blue-500 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 cursor-pointer" />
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Sandbox Mode (Testing)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 tracking-tight border-b-2 border-gray-100 dark:border-gray-800 pb-4">Email Notifications (SMTP)</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">SMTP Host</label>
                  <input type="text" defaultValue="smtp.mailgun.org" placeholder="e.g., smtp.gmail.com" className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">SMTP Port</label>
                    <input type="number" defaultValue={587} placeholder="587" className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400" />
                  </div>
                  <div className="pt-8">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded-md focus:ring-blue-500 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 cursor-pointer" />
                      <span className="text-sm font-bold text-gray-900 dark:text-white">Use TLS</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
