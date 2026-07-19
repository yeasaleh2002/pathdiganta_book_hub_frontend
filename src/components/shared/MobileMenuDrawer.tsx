"use client";

import React, { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";

const categories = [
  "Fiction", "Non-Fiction", "Academic", "Islamic", "Kids", "Comics", "Sci-Fi", "Romance"
];

export const MobileMenuDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user } = useAuthStore();
  const { logout } = useAuth();

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <div className="lg:hidden">
      <button 
        onClick={toggleDrawer}
        className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
        aria-label="Open Menu"
      >
        <Menu size={24} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity" 
          onClick={toggleDrawer}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white dark:bg-gray-950 z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Pathdigonto</span>
          <button onClick={toggleDrawer} className="p-2 text-gray-500 hover:text-red-500 bg-gray-200/50 dark:bg-gray-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        {/* Auth Section for Mobile */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
          {isLoggedIn ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 dark:text-white line-clamp-1">{user?.name}</span>
                  <span className="text-xs text-gray-500">{user?.email}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link onClick={toggleDrawer} href="/dashboard" className="py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl font-bold text-center text-sm">
                  Dashboard
                </Link>
                <button onClick={() => { logout(); toggleDrawer(); }} className="py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-bold text-center text-sm">
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link onClick={toggleDrawer} href="/login" className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold rounded-xl text-center text-sm transition-colors">
                Log In
              </Link>
              <Link onClick={toggleDrawer} href="/register" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-center text-sm shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-transform active:scale-95">
                Create Account
              </Link>
            </div>
          )}
        </div>

        <div className="overflow-y-auto flex-1 py-2">
          <nav className="flex flex-col">
            <Link href="/" onClick={toggleDrawer} className="px-5 py-3.5 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-900 flex justify-between items-center font-medium">
              <span>Home</span> <ChevronRight size={16} className="text-gray-400"/>
            </Link>
            <Link href="/books" onClick={toggleDrawer} className="px-5 py-3.5 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-900 flex justify-between items-center font-medium">
              <span>All Books</span> <ChevronRight size={16} className="text-gray-400"/>
            </Link>
            <Link href="/authors" onClick={toggleDrawer} className="px-5 py-3.5 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-900 flex justify-between items-center font-medium">
              <span>Authors</span> <ChevronRight size={16} className="text-gray-400"/>
            </Link>
            <Link href="/publishers" onClick={toggleDrawer} className="px-5 py-3.5 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-900 flex justify-between items-center font-medium">
              <span>Publishers</span> <ChevronRight size={16} className="text-gray-400"/>
            </Link>
          </nav>

          <div className="px-5 py-5 mt-2 bg-gray-50/50 dark:bg-gray-900/30">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Categories</h3>
            <div className="flex flex-col gap-3">
              {categories.map((cat, i) => (
                <Link key={i} onClick={toggleDrawer} href={`/books?category=${encodeURIComponent(cat.toLowerCase())}`} className="text-gray-600 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-200 dark:bg-blue-900 mr-3"></div>
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
