"use client";

import React from 'react';
import Link from 'next/link';
import { Search, ArrowRight, BookOpen } from 'lucide-react';

export const HeroSection = () => {
  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-gray-950 pt-10 pb-16 lg:pt-20 lg:pb-24">
      {/* Decorative Gradients */}
      <div className="absolute top-0 -left-1/4 w-[150%] h-[150%] bg-gradient-to-tr from-blue-50 via-blue-100/50 to-purple-50 dark:from-blue-900/10 dark:via-purple-900/5 dark:to-transparent opacity-80 -z-10 rounded-[100%] blur-3xl transform rotate-12 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-300/30 to-purple-300/30 dark:from-blue-600/10 dark:to-purple-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm mb-6 border border-blue-100 dark:border-blue-800/50 backdrop-blur-sm animate-fade-in-up">
          <BookOpen size={16} />
          <span>Discover a Universe of Knowledge</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-200 dark:to-white tracking-tight mb-6 max-w-4xl leading-tight">
          Read More. <br className="hidden sm:block" />
          <span className="text-blue-600 dark:text-blue-500">Dream Bigger.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl font-medium leading-relaxed">
          Your gateway to endless stories, profound insights, and academic brilliance. Find your next favorite book at Pathdigonto Book Hub.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto max-w-lg mx-auto z-10 relative">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search books, authors, ISBN..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-600/10 transition-all text-gray-900 dark:text-white font-medium text-lg shadow-lg placeholder:text-gray-400"
            />
          </div>
          <Link href="/books" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_4px_20px_0_rgba(37,99,235,0.4)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.5)] hover:-translate-y-1">
            Explore <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};
