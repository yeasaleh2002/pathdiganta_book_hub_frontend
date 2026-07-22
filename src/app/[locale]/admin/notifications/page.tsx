"use client";

import React, { useState } from 'react';
import { Bell, CheckCircle, AlertTriangle, Info, Trash2 } from 'lucide-react';

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="text-amber-500" size={20} />;
      case 'success': return <CheckCircle className="text-emerald-500" size={20} />;
      default: return <Info className="text-blue-500" size={20} />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Bell className="text-blue-600" /> System Notifications
          </h1>
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-widest">
            Monitor important alerts, system updates, and user activities.
          </p>
        </div>
        
        {notifications.some(n => !n.read) && (
          <button onClick={markAllAsRead} className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-sm">
            Mark All as Read
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-[#121212] border-2 border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">
        {notifications.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <Bell size={48} className="text-gray-300 dark:text-gray-700 mb-4" />
            <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">No notifications found.</p>
          </div>
        ) : (
          <div className="divide-y-2 divide-gray-50 dark:divide-gray-800/50">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-6 flex items-start gap-4 transition-colors group ${notification.read ? 'bg-transparent' : 'bg-blue-50/30 dark:bg-blue-900/10'}`}
              >
                <div className="mt-1 shrink-0 bg-white dark:bg-[#121212] p-2 rounded-full border border-gray-100 dark:border-gray-800 shadow-sm">
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <p className={`text-sm ${notification.read ? 'text-gray-600 dark:text-gray-400 font-medium' : 'text-gray-900 dark:text-white font-black'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">{notification.time}</p>
                </div>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!notification.read && (
                    <button 
                      onClick={() => markAsRead(notification.id)} 
                      className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors cursor-pointer"
                      title="Mark as Read"
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}
                  <button 
                    onClick={() => clearNotification(notification.id)} 
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors cursor-pointer"
                    title="Clear Notification"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
