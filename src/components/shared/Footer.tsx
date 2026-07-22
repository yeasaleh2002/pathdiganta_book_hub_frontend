"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Hash, Link2, Monitor, MapPin, Phone, Mail } from "lucide-react";

export const Footer = () => {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard') || pathname?.startsWith('/user')) return null;

  return (
    <footer className="w-full bg-gray-50 dark:bg-[#0a0a0a] pt-16 pb-8 border-t border-gray-200 dark:border-gray-800 transition-colors mt-auto relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-600/5 to-transparent dark:from-blue-900/10 pointer-events-none" />
      <div className="absolute top-10 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
        
        {/* Column 1: Company Info */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="inline-block">
            <img 
              src="/logo.png" 
              alt="Pathdigonto Book Hub" 
              className="h-12 w-auto object-contain drop-shadow-sm"
            />
          </Link>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 mt-2">
            Igniting minds and expanding horizons through the power of books. Join our community of avid readers today.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full hover:text-blue-600 hover:border-blue-600 transition-colors"><Globe size={18}/></a>
            <a href="#" className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full hover:text-blue-400 hover:border-blue-400 transition-colors"><Hash size={18}/></a>
            <a href="#" className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full hover:text-pink-600 hover:border-pink-600 transition-colors"><Monitor size={18}/></a>
            <a href="#" className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full hover:text-blue-700 hover:border-blue-700 transition-colors"><Link2 size={18}/></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Company</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
            <li><Link href="/career" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Career</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Column 3: Help & Support */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Help & Support</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link href="/faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ & Support</Link></li>
            <li><Link href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Track Order</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contact Us</h3>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 dark:text-gray-400">Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <a href="https://wa.me/8801633011001" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                +880 1633-011001 (WhatsApp)
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <a href="mailto:pathdigantabookhub@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                pathdigantabookhub@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 relative z-10">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          © {new Date().getFullYear()} Pathdigonto Book Hub. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded text-xs font-bold text-gray-700 dark:text-gray-300 shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Cash On Delivery Supported
          </div>
        </div>
      </div>
    </footer>
  );
};
