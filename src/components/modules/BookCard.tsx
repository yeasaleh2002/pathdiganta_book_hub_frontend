"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';

interface Book {
  id?: string;
  _id?: string;
  title: string;
  author: any;
  price: number;
  originalPrice?: number;
  coverImage?: string;
  images?: string[];
  rating?: number;
}

export const BookCard = ({ book }: { book: Book }) => {
  const discount = book.originalPrice 
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) 
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Add to cart logic here
    console.log(`Added ${book.id} to cart`);
  };

  return (
    <Link href={`/book/${book._id || book.id}`} className="flex-none w-44 md:w-56 flex flex-col gap-3 p-3 md:p-4 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all bg-white dark:bg-gray-900 group cursor-pointer snap-start relative overflow-hidden">
      <div className="relative w-full aspect-[2/3] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        {/* Placeholder for actual book cover image */}
        <div className="w-full h-full flex items-center justify-center text-center p-2 text-gray-400 bg-gray-200 dark:bg-gray-800">
           {book.images?.[0] || book.coverImage ? (
             <img src={book.images?.[0] || book.coverImage} alt={book.title} className="w-full h-full object-cover" />
           ) : (
             <span className="text-xs font-semibold">{book.title}</span>
           )}
        </div>
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
        
        {/* Desktop Overlay Add to Cart (Hidden on mobile) */}
        <div className="hidden lg:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center">
           <button onClick={handleAddToCart} className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-lg hover:scale-105 active:scale-95">
             <ShoppingCart size={20} />
           </button>
        </div>
      </div>
      
      <div className="flex flex-col flex-1">
        <h3 className="font-bold text-sm md:text-base text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {book.title}
        </h3>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
          {typeof book.author === 'object' && book.author !== null ? (book.author as any).name : book.author}
        </span>
        
        <div className="flex items-center gap-1 mt-2">
          <Star size={12} className="text-amber-500 fill-amber-500" />
          <span className="text-xs text-gray-600 dark:text-gray-400 font-bold">{book.rating || 4.5}</span>
        </div>
        
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-black text-blue-600 dark:text-blue-400 text-lg">৳{book.price}</span>
            {book.originalPrice && (
              <span className="text-xs text-gray-400 font-bold line-through">৳{book.originalPrice}</span>
            )}
          </div>
          
          {/* Mobile/Tablet Add to Cart Button (Visible below lg screens) */}
          <button 
            onClick={handleAddToCart} 
            className="lg:hidden p-2 bg-gray-100 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-blue-900/30 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 rounded-lg transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};
