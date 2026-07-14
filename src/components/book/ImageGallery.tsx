"use client";

import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';

export const ImageGallery = ({ images }: { images: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="flex flex-col gap-4 sticky top-28">
      {/* Primary View */}
      <div 
        className={`relative w-full aspect-[2/3] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 cursor-zoom-in group transition-all ${isZoomed ? 'fixed inset-4 z-[100] bg-black/95 aspect-auto flex items-center justify-center border-0' : ''}`}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img 
          src={images[activeIndex]} 
          alt="Book Cover Preview" 
          className={`w-full h-full ${isZoomed ? 'object-contain max-h-[90vh]' : 'object-cover group-hover:scale-[1.02] transition-transform duration-500'}`} 
        />
        {!isZoomed && (
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/70 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-gray-200 dark:border-gray-700">
            <ZoomIn size={20} className="text-gray-700 dark:text-gray-300" />
          </div>
        )}
        {isZoomed && (
          <button 
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-colors font-semibold"
            onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
          >
            Close Zoom
          </button>
        )}
      </div>

      {/* Thumbnails */}
      {!isZoomed && images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto snap-x py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex-none w-20 h-28 rounded-lg overflow-hidden border-2 transition-all ${
                activeIndex === idx 
                  ? 'border-blue-600 shadow-md transform scale-105' 
                  : 'border-transparent opacity-60 hover:opacity-100'
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
