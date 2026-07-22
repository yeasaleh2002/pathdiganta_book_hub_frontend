"use client";

import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { BookCard } from '@/components/modules/BookCard';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const WishlistTab = () => {
  const { items } = useWishlistStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const tDash = useTranslations("Dashboard");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2 mb-8">
        <Heart className="text-red-500 fill-red-500" /> {tDash("savedWishlist")}
      </h2>

      {items.length === 0 ? (
        <div className="p-12 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 text-center shadow-sm animate-in fade-in">
          <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={40} className="text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white">{tDash("yourWishlistEmpty")}</h3>
          <p className="text-gray-500 font-medium mt-3 max-w-sm mx-auto">{tDash("exploreCatalog")}</p>
          <button onClick={() => router.push('/books')} className="mt-6 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-sm hover:bg-blue-700 transition-colors">{tDash("browseBooks")}</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((book) => (
            <div key={book.id || book._id} className="h-full">
              <BookCard book={book as any} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
