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

import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export const BookShelf = ({ title, viewAllLink, books }: BookShelfProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("BookShelf");

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
    <section className="w-full py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 dark:border-gray-800 pb-3">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white relative after:content-[''] after:absolute after:-bottom-[3px] after:left-0 after:w-1/2 after:h-[4px] after:bg-blue-600 after:rounded-full">
            {title}
          </h2>
          <div className="flex items-center gap-4">
            <Link href={viewAllLink} className="text-sm font-bold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center group">
              {t("viewAll")} <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll('left')} aria-label="Scroll left" className="p-2 rounded-full border border-gray-200 dark:border-gray-800 hover:border-blue-600 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-gray-900 shadow-sm transition-all active:scale-95">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scroll('right')} aria-label="Scroll right" className="p-2 rounded-full border border-gray-200 dark:border-gray-800 hover:border-blue-600 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-gray-900 shadow-sm transition-all active:scale-95">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          {books.length > 0 ? books.map((book, i) => (
            <motion.div key={book.id || i} variants={itemVariants} className="flex-none w-[85vw] sm:w-[160px] md:w-[220px] lg:w-[calc(25%-0.75rem)] snap-center sm:snap-start">
              <BookCard book={book} />
            </motion.div>
          )) : (
            // Skeleton loader fallback
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-none w-[85vw] sm:w-[160px] md:w-[220px] lg:w-[calc(25%-0.75rem)] h-[340px] bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse border border-gray-200 dark:border-gray-700 snap-center sm:snap-start" />
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};
