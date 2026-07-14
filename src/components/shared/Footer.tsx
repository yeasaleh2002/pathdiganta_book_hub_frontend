"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Hash, Link2, Monitor, MapPin, Phone, Mail } from "lucide-react";

export const Footer = () => {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300 pt-16 pb-8 border-t border-gray-200 dark:border-gray-800 transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Company Info */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Pathdigonto
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Pathdigonto Book Hub is your ultimate single-vendor online bookstore. We deliver the best books to your doorstep with love and care.
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
            <li><Link href="/faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Shipping & Delivery</Link></li>
            <li><Link href="/returns" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Returns & Refunds</Link></li>
            <li><Link href="/track-order" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Track Order</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contact Us</h3>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 dark:text-gray-400">123 Book Street, Knowledge City, DB 1000, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-400">+880 16297</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-400">support@pathdigonto.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Pathdigonto Book Hub. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          {/* Payment Partners Placeholder */}
          <div className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-pink-600">bKash</div>
          <div className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-orange-500">Nagad</div>
          <div className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-indigo-700">Visa</div>
          <div className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-red-600">MasterCard</div>
        </div>
      </div>
    </footer>
  );
};
