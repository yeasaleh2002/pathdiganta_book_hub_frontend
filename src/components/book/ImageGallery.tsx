"use client";

import React, { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ImageGallery = ({ images }: { images: string[] }) => {
  const validImages = images?.filter(Boolean) || [];
  const displayImages = validImages.length > 0 ? validImages : ['https://placehold.co/600x900?text=No+Image'];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="flex flex-col gap-4 sticky top-28">
      {/* Primary View */}
      <motion.div 
        layoutId={`book-cover-${displayImages[activeIndex]}`}
        className={`relative w-full aspect-[2/3] bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.06)] cursor-zoom-in group transition-all z-10 ${isZoomed ? 'fixed inset-4 z-[100] bg-black/95 aspect-auto flex items-center justify-center border-0 rounded-none' : ''}`}
        onClick={() => setIsZoomed(true)}
      >
        <img 
          src={displayImages[activeIndex]} 
          alt="Book Cover Preview" 
          className={`w-full h-full ${isZoomed ? 'object-contain max-h-[90vh]' : 'object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out'}`} 
        />
        {!isZoomed && (
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/80 p-2.5 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg border border-gray-200/50 dark:border-gray-700/50 transform group-hover:scale-105">
            <ZoomIn size={20} className="text-gray-700 dark:text-gray-300" />
          </div>
        )}
      </motion.div>

      {/* Zoom Overlay (using AnimatePresence for smooth exit) */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm"
            onClick={() => setIsZoomed(false)}
          >
            <button 
              className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-colors font-semibold z-[110]"
              onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thumbnails */}
      {!isZoomed && displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto snap-x py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex-none w-20 h-28 rounded-xl overflow-hidden border-2 transition-all duration-300 ease-out ${
                activeIndex === idx 
                  ? 'border-blue-600 shadow-[0_4px_12px_rgba(37,99,235,0.2)] transform scale-[1.02]' 
                  : 'border-transparent opacity-60 hover:opacity-100 hover:scale-[1.02]'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
