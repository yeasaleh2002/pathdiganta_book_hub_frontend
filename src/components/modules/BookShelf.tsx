"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { BookCard } from './BookCard';

interface BookShelfProps {
  title: string;
  viewAllLink: string;
  books: any[]; 
}

export const BookShelf = ({ title, viewAllLink, books }: BookShelfProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * 0.8;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white relative after:content-[''] after:absolute after:-bottom-[3px] after:left-0 after:w-1/2 after:h-[3px] after:bg-blue-600">
            {title}
          </h2>
          <div className="flex items-center gap-4">
            <Link href={viewAllLink} className="text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center">
              View All <ChevronRight size={16} />
            </Link>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll('left')} aria-label="Scroll left" className="p-1.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scroll('right')} aria-label="Scroll right" className="p-1.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          {books.length > 0 ? books.map((book, i) => (
            <BookCard key={book.id || i} book={book} />
          )) : (
            // Skeleton loader fallback
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-none w-44 md:w-56 h-80 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse snap-start" />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
