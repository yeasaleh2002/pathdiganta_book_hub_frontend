"use client";

import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface BookTabsProps {
  description: string;
  authorBio: string;
}

export const BookTabs = ({ description, authorBio }: BookTabsProps) => {
  const [activeTab, setActiveTab] = useState<'desc' | 'preview' | 'author' | 'reviews'>('desc');

  const tabs = [
    { id: 'desc', label: 'Description' },
    { id: 'preview', label: 'Inside Preview' },
    { id: 'author', label: 'Author Bio' },
    { id: 'reviews', label: 'Ratings & Reviews' },
  ] as const;

  return (
    <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
      {/* Tab Headers */}
      <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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
        
        {activeTab === 'preview' && (
          <div className="flex flex-col items-center justify-center py-16 bg-gray-50 dark:bg-gray-950/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 h-full">
            <p className="text-gray-500 dark:text-gray-400 font-medium mb-4">Preview pages are restricted to logged-in readers.</p>
            <button className="px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow font-semibold text-blue-600 dark:text-blue-400 text-sm">
              Log in to Read Sample
            </button>
          </div>
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

        {activeTab === 'reviews' && (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Aggregate */}
            <div className="flex flex-col items-center justify-center p-8 bg-blue-50/50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700 rounded-2xl lg:w-1/3">
              <span className="text-6xl font-black text-gray-900 dark:text-white">4.8</span>
              <div className="flex gap-1 my-3">
                {[1,2,3,4,5].map(i => <Star key={i} size={20} className="text-amber-500 fill-amber-500" />)}
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Based on 342 reviews</span>
              
              <button className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors text-sm">
                Write a Review
              </button>
            </div>
            
            {/* Mock Reviews List */}
            <div className="flex-1 space-y-6">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">Outstanding read!</h4>
                      <div className="flex gap-1 mt-1">
                        {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-amber-500 fill-amber-500" />)}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Oct 14, 2026</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-3 leading-relaxed">
                    This book completely changed my perspective on software development architecture. The clear examples and practical guidance are invaluable. Highly recommended for any serious developer!
                  </p>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-3 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Verified Buyer</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
