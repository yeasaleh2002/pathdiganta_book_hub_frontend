"use client";

import React, { useState } from 'react';
import { Heart, Share2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';

export const WishlistShareButtons = ({ bookId }: { bookId: string }) => {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isWishlisted, setIsWishlisted] = useState(false); // In real app, check user data

  const handleWishlist = () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    // Simulate wishlist toggle
    setIsWishlisted(!isWishlisted);
    console.log(`Toggled wishlist for ${bookId}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="flex gap-2 flex-shrink-0">
      <button 
        onClick={handleWishlist}
        className={`p-2.5 rounded-full transition-colors border shadow-sm cursor-pointer ${
          isWishlisted 
            ? 'text-red-500 bg-red-50 border-red-200 dark:bg-red-900/20' 
            : 'text-gray-400 hover:text-red-500 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20'
        }`}
      >
        <Heart size={20} className={isWishlisted ? "fill-red-500" : ""} />
      </button>
      <button 
        onClick={handleShare}
        className="p-2.5 text-gray-400 hover:text-blue-500 bg-gray-50 dark:bg-gray-900 rounded-full transition-colors border border-gray-200 dark:border-gray-800 hover:border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 shadow-sm cursor-pointer"
      >
        <Share2 size={20} />
      </button>
    </div>
  );
};
