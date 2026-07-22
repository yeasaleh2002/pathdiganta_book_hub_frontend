"use client";

import React from 'react';
import Link from 'next/link';
import { Search, ArrowRight, BookOpen } from 'lucide-react';

export const HeroSection = () => {
  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-[#0a0a0a] pt-10 pb-16 lg:pt-20 lg:pb-24">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-sky-600/10 to-transparent dark:from-sky-900/20 pointer-events-none z-0" />
      <div className="absolute top-40 right-0 w-96 h-96 bg-sky-500/10 dark:bg-sky-600/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center relative z-10">
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
