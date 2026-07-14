import React from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const BundleRow = ({ mainBook, bundleBooks }: any) => {
  return (
    <div className="w-full bg-blue-50/50 dark:bg-gray-900/50 border border-blue-100 dark:border-gray-800 rounded-2xl p-6 lg:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Bought Together</h2>
      
      <div className="flex flex-col lg:flex-row items-center gap-8">
        
        {/* Book Ribbon */}
        <div className="flex items-center gap-4 md:gap-6 overflow-x-auto w-full lg:w-auto snap-x pb-4 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Main Book */}
          <div className="w-24 md:w-28 h-36 md:h-40 flex-shrink-0 rounded-lg shadow-sm overflow-hidden border-2 border-blue-600 snap-center relative">
            <span className="absolute top-0 left-0 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br">This Item</span>
            <img src={mainBook.imageUrls?.[0] || mainBook.images?.[0] || 'https://placehold.co/400x600'} alt={mainBook.title} className="w-full h-full object-cover" />
          </div>
          
          <Plus className="text-gray-400 dark:text-gray-600 flex-shrink-0" size={24} />

          {/* Bundle Items */}
          {bundleBooks.map((book: any, idx: number) => (
            <React.Fragment key={book._id || book.id}>
              <Link href={`/book/${book._id || book.id}`} className="w-24 md:w-28 h-36 md:h-40 flex-shrink-0 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors snap-center">
                <img src={book.imageUrls?.[0] || book.images?.[0] || book.coverImage || 'https://placehold.co/400x600'} alt={book.title} className="w-full h-full object-cover" />
              </Link>
              {idx < bundleBooks.length - 1 && <Plus className="text-gray-400 dark:text-gray-600 flex-shrink-0" size={24} />}
            </React.Fragment>
          ))}
        </div>

        {/* Pricing & Checkout block */}
        <div className="flex flex-col items-center lg:items-start lg:ml-auto w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 pt-6 lg:pt-0 lg:pl-10">
          <span className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">Total Bundle Price</span>
          <div className="flex items-end gap-3 mb-5">
            <span className="text-3xl font-black text-gray-900 dark:text-white">৳2100</span>
            <span className="text-base text-gray-500 line-through mb-1">৳2500</span>
          </div>
          <button className="w-full lg:w-auto px-8 py-3.5 bg-gray-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm text-sm">
            Add Bundle to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
