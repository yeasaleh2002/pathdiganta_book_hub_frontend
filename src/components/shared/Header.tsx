"use client";

import { Search, Heart, ShoppingCart, User, PhoneCall, Truck, LogOut, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenuDrawer } from "./MobileMenuDrawer";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { openDrawer, items } = useCartStore();
  const { isLoggedIn, user, fetchUser, checkLoginStatus } = useAuthStore();
  const { logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    checkLoginStatus();
    fetchUser();
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="w-full flex flex-col z-50 relative">
      {/* Main Sticky Header */}
      <div className={`w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md transition-all duration-300 border-b border-gray-200/50 dark:border-gray-800/50 ${
        isScrolled ? "sticky top-0 shadow-md py-3" : "py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <MobileMenuDrawer />
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Pathdigonto
              </span>
            </Link>
          </div>

          {/* Search Bar - Hidden on small mobile, expands on md+ */}
          <div className="hidden md:flex flex-1 max-w-2xl items-center mx-4 group relative">
            <div className="flex w-full rounded-full border border-gray-300 dark:border-gray-700 focus-within:border-blue-600 dark:focus-within:border-blue-500 overflow-hidden bg-gray-50/50 dark:bg-gray-900/50 transition-all shadow-inner">
              <select className="bg-transparent border-none text-sm px-4 py-2 outline-none text-gray-700 dark:text-gray-300 cursor-pointer hidden lg:block border-r border-gray-200 dark:border-gray-700 font-medium">
                <option value="all">All Categories</option>
                <option value="fiction">Fiction</option>
                <option value="academic">Academic</option>
                <option value="islamic">Islamic</option>
              </select>
              <input 
                type="text" 
                placeholder="Search for books, authors, publishers..." 
                className="flex-1 bg-transparent border-none px-4 py-2 outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 font-medium"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 transition-colors flex items-center justify-center">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Icons & Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            
            <Link href="/dashboard?tab=wishlist" className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <Heart size={22} />
              {mounted && user?.wishlist?.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                  {user.wishlist.length}
                </span>
              )}
            </Link>

            <button onClick={openDrawer} className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer">
              <ShoppingCart size={22} />
              {mounted && items.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-600 rounded-full border-2 border-white dark:border-gray-950">
                  {items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>

            {mounted && isLoggedIn ? (
              <div className="relative group hidden sm:flex items-center">
                <button className="flex items-center gap-2 p-2 pr-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-full transition-colors shadow-sm border border-gray-200 dark:border-gray-700">
                  {user?.name ? (
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold uppercase">
                      {user.name.charAt(0)}
                    </div>
                  ) : (
                    <User size={18} />
                  )}
                  <span className="text-sm max-w-[100px] truncate">{user?.name?.split(' ')[0] || "Account"}</span> <ChevronDown size={14} />
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100 z-50 overflow-hidden">
                  <div className="flex flex-col py-2">
                    <Link href="/dashboard" className="px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2">
                      <User size={16} /> Dashboard
                    </Link>
                    <button onClick={logout} className="px-4 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-left flex items-center gap-2 w-full transition-colors">
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : mounted ? (
              <div className="hidden sm:flex items-center gap-1.5 ml-2">
                <Link href="/login" className="px-5 py-2 text-sm font-black text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Login</Link>
                <Link href="/register" className="px-5 py-2 text-sm font-black bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-transform hover:-translate-y-0.5 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]">Sign Up</Link>
              </div>
            ) : (
              <div className="hidden sm:block w-24 h-10"></div>
            )}
          </div>
        </div>
      </div>

      {/* Lower Navigation Shelf */}
      <div className="hidden lg:block w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors shadow-sm relative z-40">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8 text-sm font-medium text-gray-700 dark:text-gray-300">
            {["Books", "Islamic", "Kids", "Pre-Order", "Subject", "Authors", "Publishers", "Super Sale"].map((item) => (
              <Link 
                key={item} 
                href={`/books?category=${encodeURIComponent(item.toLowerCase())}`}
                className="py-3 px-1 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors whitespace-nowrap inline-block"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
