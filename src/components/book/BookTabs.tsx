"use client";

import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface BookTabsProps {
  description: string;
  authorBio: string;
}

export const BookTabs = ({ description, authorBio }: BookTabsProps) => {
  const [activeTab, setActiveTab] = useState<'desc' | 'author'>('desc');

  const tabs = [
    { id: 'desc', label: 'Description' },
    { id: 'author', label: 'Author Bio' },
  ] as const;

  return (
    <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
      {/* Tab Headers */}
      <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-5 font-bold text-sm whitespace-nowrap transition-colors relative ${
              activeTab === tab.id 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 shadow-[0_-2px_10px_rgba(37,99,235,0.4)]" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Panes */}
      <div className="p-6 md:p-8 min-h-[300px]">
        {activeTab === 'desc' && (
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 text-sm leading-relaxed" 
            dangerouslySetInnerHTML={{ __html: description }} 
          />
        )}
        
        {activeTab === 'author' && (
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 rounded-full bg-blue-50 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center text-blue-600 dark:text-blue-400 text-3xl font-extrabold shadow-sm">
              {authorBio ? 'R' : '?'}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">About the Author</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">{authorBio}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
