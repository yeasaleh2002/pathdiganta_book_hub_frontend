"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Zap } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface Book {
  id?: string;
  _id?: string;
  title: string;
  author: any;
  publisher?: any;
  category?: any;
  price: number;
  originalPrice?: number;
  coverImage?: string;
  images?: string[];
  imageUrls?: string[];
  stock?: number;
}

export const BookCard = ({ book }: { book: Book }) => {
  const { addItem, openDrawer } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bookIdStr = book._id || book.id || '';
  const isWished = mounted ? isInWishlist(bookIdStr) : false;

  const discount = book.originalPrice 
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) 
    : 0;

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (isWished) {
      removeFromWishlist(bookIdStr);
    } else {
      addToWishlist({
        id: bookIdStr,
        title: book.title,
        price: book.price,
        imageUrls: book.imageUrls || book.images || (book.coverImage ? [book.coverImage] : []),
        author: { id: '', name: typeof book.author === 'object' && book.author !== null ? (book.author as any).name : book.author || 'Unknown' }
      });
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    
    await addItem({
      id: bookIdStr,
      title: book.title,
      price: book.price,
      originalPrice: book.originalPrice,
      coverImage: book.imageUrls?.[0] || book.images?.[0] || book.coverImage || '',
      author: typeof book.author === 'object' && book.author !== null ? (book.author as any).name : book.author || 'Unknown',
      quantity: 1
    });
    openDrawer();
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await handleAddToCart(e);
  };

  const imgUrl = book.imageUrls?.[0] || book.images?.[0] || book.coverImage;
  const authorName = typeof book.author === 'object' && book.author !== null ? book.author.name || book.author.fullName : book.author;
  const publisherName = typeof book.publisher === 'object' && book.publisher !== null ? book.publisher.name || book.publisher.title : book.publisher;
  const categoryName = typeof book.category === 'object' && book.category !== null ? book.category.name || book.category.title : book.category;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full h-full flex flex-col p-3 md:p-4 border-2 border-transparent hover:border-blue-500/20 dark:hover:border-blue-500/30 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all bg-white dark:bg-gray-900 group relative backdrop-blur-sm"
    >
      <Link href={`/book/${bookIdStr}`} className="flex-1 flex flex-col gap-3 relative cursor-pointer outline-none">
        
        <div className="relative w-full aspect-[2/3] bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
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
          
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-2 right-2 p-2 rounded-full shadow-md z-20 transition-all duration-300 ${
              isWished 
                ? 'bg-red-50 dark:bg-red-900/30 text-red-500 hover:bg-red-100' 
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-400 hover:text-red-500 hover:bg-white'
            } backdrop-blur-sm opacity-100 sm:opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer`}
            aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={16} className={isWished ? "fill-red-500" : ""} />
          </button>
        </div>
        
        <div className="flex flex-col flex-1 pt-1 text-left">
          {categoryName && (
             <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1 line-clamp-1">
               {categoryName}
             </span>
          )}
          
          <h3 className="font-extrabold text-sm md:text-base text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
            {book.title}
          </h3>
          
          {authorName && (
             <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-1.5 line-clamp-1">
               <span className="text-gray-500 dark:text-gray-500 font-medium">Author:</span> {authorName}
             </span>
          )}
          
          {publisherName && (
             <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5 line-clamp-1">
               <span className="text-gray-500 dark:text-gray-500 font-medium">Publisher:</span> {publisherName}
             </span>
          )}
          
          <div className="mt-auto pt-3 flex items-end justify-between border-t border-gray-50 dark:border-gray-800/50">
            <div className="flex flex-col">
              {book.originalPrice && (
                <span className="text-[10px] text-gray-400 font-bold line-through">৳{book.originalPrice}</span>
              )}
              <span className="font-black text-blue-600 dark:text-blue-400 text-lg leading-none">৳{book.price}</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-3 flex gap-2 w-full">
        <button 
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 py-2.5 rounded-lg font-bold text-xs transition-colors cursor-pointer"
        >
          <ShoppingCart size={14} /> Add
        </button>
        <button 
          onClick={handleBuyNow}
          className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-rose-400 to-red-500 hover:from-rose-500 hover:to-red-600 text-white py-2.5 rounded-lg font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <Zap size={14} /> Buy Now
        </button>
      </div>

    </motion.div>
  );
};
