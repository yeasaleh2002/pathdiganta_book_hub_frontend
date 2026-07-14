import React from 'react';
import { User, Shield } from 'lucide-react';

export const ProfileTab = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
        <User className="text-blue-600" /> Profile Settings
      </h2>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-10 shadow-sm">
        
        <form className="max-w-3xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-2">Full Legal Name</label>
              <input type="text" defaultValue="Md. Rahim Uddin" className="w-full p-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-2">Registered Email</label>
              <input type="email" disabled defaultValue="rahim@example.com" className="w-full p-3.5 border-2 border-gray-200 dark:border-gray-800 rounded-xl bg-gray-100 dark:bg-gray-950/50 text-gray-500 font-bold cursor-not-allowed outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-2">Verified Phone Number</label>
            <input type="tel" defaultValue="+880 1711 223344" className="w-full max-w-md p-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" />
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 mt-8">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Shield size={20} className="text-gray-400" /> Security Credentials
            </h3>
            <div className="space-y-5 max-w-md">
              <input type="password" placeholder="Enter Current Password" className="w-full p-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" />
              <input type="password" placeholder="Enter New Password" className="w-full p-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button type="button" className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-xl shadow-lg transition-transform hover:-translate-y-0.5">
              Sync Account Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
