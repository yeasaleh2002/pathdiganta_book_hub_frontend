"use client";

import React from 'react';
import { ShoppingCart, Zap } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';

export const CartButtons = ({ book }: { book: any }) => {
  const { addItem, openDrawer } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    
    await addItem({
      id: book._id || book.id,
      title: book.title,
      price: book.price,
      originalPrice: book.originalPrice,
      coverImage: book.imageUrls?.[0] || book.images?.[0] || book.coverImage || '',
      author: book.author?.name || 'Unknown',
      quantity: 1
    });
    openDrawer();
  };

  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=/checkout`);
      return;
    }
    await addItem({
      id: book._id || book.id,
      title: book.title,
      price: book.price,
      originalPrice: book.originalPrice,
      coverImage: book.imageUrls?.[0] || book.images?.[0] || book.coverImage || '',
      author: book.author?.name || 'Unknown',
      quantity: 1
    });
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-10">
      <button 
        onClick={handleAddToCart}
        disabled={book.stock <= 0}
        className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 py-4 px-6 rounded-xl font-bold text-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ShoppingCart size={22} /> Add
      </button>
      <button 
        onClick={handleBuyNow}
        disabled={book.stock <= 0}
        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-400 to-red-500 hover:from-rose-500 hover:to-red-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-[0_4px_14px_0_rgba(244,63,94,0.39)] hover:shadow-[0_6px_20px_rgba(244,63,94,0.23)] transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Zap size={22} className="fill-white" /> Buy Now
      </button>
    </div>
  );
};
