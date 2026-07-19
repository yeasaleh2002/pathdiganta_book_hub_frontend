"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface Book {
  id?: string;
  _id?: string;
  title: string;
  author: any;
  price: number;
  originalPrice?: number;
  coverImage?: string;
  images?: string[];
  imageUrls?: string[];
  rating?: number;
  stock?: number;
}

export const BookCard = ({ book }: { book: Book }) => {
  const { addItem, openDrawer } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const discount = book.originalPrice 
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) 
    : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    
    await addItem({
      id: book._id || book.id || '',
      title: book.title,
      price: book.price,
      originalPrice: book.originalPrice,
      coverImage: book.imageUrls?.[0] || book.images?.[0] || book.coverImage || '',
      author: typeof book.author === 'object' && book.author !== null ? (book.author as any).name : book.author || 'Unknown',
      quantity: 1
    });
    openDrawer();
  };

  const imgUrl = book.imageUrls?.[0] || book.images?.[0] || book.coverImage;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full h-full"
    >
      <Link href={`/book/${book._id || book.id}`} className="flex flex-col gap-3 p-3 md:p-4 border-2 border-transparent hover:border-blue-500/20 dark:hover:border-blue-500/30 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all bg-white dark:bg-gray-900 group cursor-pointer h-full relative overflow-hidden backdrop-blur-sm">
        <div className="relative w-full aspect-[2/3] bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
          {/* Placeholder for actual book cover image */}
          <div className="w-full h-full flex items-center justify-center text-center p-2 text-gray-400">
             {imgUrl ? (
               <motion.img 
                 whileHover={{ scale: 1.05 }}
                 transition={{ duration: 0.3 }}
                 src={imgUrl} 
                 alt={book.title} 
                 className="w-full h-full object-cover" 
               />
             ) : (
               <span className="text-xs font-semibold">{book.title}</span>
             )}
          </div>
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md z-10">
              -{discount}%
            </div>
          )}
          
          {/* Desktop Overlay Add to Cart (Hidden on mobile) */}
          <div className="hidden lg:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center backdrop-blur-[2px] z-20">
             <motion.button 
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
               onClick={handleAddToCart} 
               className="bg-blue-600 text-white p-3.5 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)]"
             >
               <ShoppingCart size={22} className="fill-white/20" />
             </motion.button>
          </div>
        </div>
        
        <div className="flex flex-col flex-1 pt-1">
          <h3 className="font-extrabold text-sm md:text-base text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
            {book.title}
          </h3>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-1">
            {typeof book.author === 'object' && book.author !== null ? (book.author as any).name : book.author}
          </span>
          
          <div className="flex items-center gap-1 mt-2 mb-1">
            <Star size={12} className="text-amber-500 fill-amber-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400 font-bold">{book.rating || 4.5}</span>
          </div>
          
          <div className="mt-auto pt-2 flex items-end justify-between border-t border-gray-50 dark:border-gray-800/50">
            <div className="flex flex-col">
              {book.originalPrice && (
                <span className="text-[10px] text-gray-400 font-bold line-through">৳{book.originalPrice}</span>
              )}
              <span className="font-black text-blue-600 dark:text-blue-400 text-lg leading-none">৳{book.price}</span>
            </div>
            
            {/* Mobile/Tablet Add to Cart Button (Visible below lg screens) */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart} 
              className="lg:hidden p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
