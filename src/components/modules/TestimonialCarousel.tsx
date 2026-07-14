"use client";

import React, { useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  { id: 1, name: "Rahim Uddin", review: "Incredible collection and super fast delivery. The packaging was top notch!", rating: 5 },
  { id: 2, name: "Sumaiya Akhter", review: "Found some rare Islamic books that I couldn't find anywhere else. Very satisfied.", rating: 5 },
  { id: 3, name: "Tanvir Ahmed", review: "The combo packs saved me a lot of money. Best bookstore in BD right now.", rating: 4 },
  { id: 4, name: "Sadia Rahman", review: "Customer support is very helpful and responsive. Recommended for sure.", rating: 5 },
  { id: 5, name: "Kamrul Islam", review: "Excellent UI and very easy to navigate. Love the dark mode feature!", rating: 5 },
];

export const TestimonialCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full py-16 bg-blue-50/50 dark:bg-gray-900 border-t border-blue-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">What Our Readers Say</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Trusted by thousands of book lovers nationwide.</p>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
        >
          {reviews.map((rev) => (
            <div key={rev.id} className="flex-none w-[300px] md:w-[350px] bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 snap-center relative transition-shadow">
              <Quote className="absolute top-4 right-4 text-blue-50 dark:text-gray-800 w-12 h-12 -z-0" />
              <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < rev.rating ? "text-amber-500 fill-amber-500" : "text-gray-300 dark:text-gray-700"} />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6 italic relative z-10 min-h-[60px]">
                "{rev.review}"
              </p>
              <div className="flex items-center gap-3 relative z-10 border-t border-gray-100 dark:border-gray-800 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{rev.name}</h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Verified Buyer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
