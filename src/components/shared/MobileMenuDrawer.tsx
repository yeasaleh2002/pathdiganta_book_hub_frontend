"use client";

import React, { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";

const categories = [
  "Fiction", "Non-Fiction", "Academic", "Islamic", "Kids", "Comics", "Sci-Fi", "Romance"
];

export const MobileMenuDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        className={`fixed top-0 left-0 h-full w-3/4 max-w-sm bg-white dark:bg-gray-950 z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
          <span className="text-lg font-bold text-gray-900 dark:text-white">Menu</span>
          <button onClick={toggleDrawer} className="p-2 text-gray-500 hover:text-red-500">
            <X size={20} />
          </button>
        </div>
        
        <div className="overflow-y-auto flex-1 py-2">
          <nav className="flex flex-col">
            <Link href="/" onClick={toggleDrawer} className="px-4 py-3 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-900 flex justify-between items-center">
              <span>Home</span> <ChevronRight size={16} className="text-gray-400"/>
            </Link>
            <Link href="/books" onClick={toggleDrawer} className="px-4 py-3 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-900 flex justify-between items-center">
              <span>All Books</span> <ChevronRight size={16} className="text-gray-400"/>
            </Link>
            <Link href="/authors" onClick={toggleDrawer} className="px-4 py-3 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-900 flex justify-between items-center">
              <span>Authors</span> <ChevronRight size={16} className="text-gray-400"/>
            </Link>
            <Link href="/publishers" onClick={toggleDrawer} className="px-4 py-3 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-900 flex justify-between items-center">
              <span>Publishers</span> <ChevronRight size={16} className="text-gray-400"/>
            </Link>
          </nav>

          <div className="px-4 py-4 mt-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Categories</h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat, i) => (
                <Link key={i} onClick={toggleDrawer} href={`/books?category=${encodeURIComponent(cat.toLowerCase())}`} className="text-gray-600 dark:text-gray-300 py-2 hover:text-blue-600 dark:hover:text-blue-400">
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
