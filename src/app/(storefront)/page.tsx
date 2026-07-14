import React, { Suspense } from 'react';
import { BookShelf } from '@/components/modules/BookShelf';
import { AuthorPublisherBlock } from '@/components/modules/AuthorPublisherBlock';
import { UspFeatureGrid } from '@/components/modules/UspFeatureGrid';
import { TestimonialCarousel } from '@/components/modules/TestimonialCarousel';
import { GridSkeleton } from '@/components/ui/skeletons';

// Mock data generator for initial UI testing (Will be replaced by actual fetch API)
const generateMockBooks = (prefix: string, count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${prefix.toLowerCase()}-${i}`,
    title: `${prefix} Book Title ${i + 1}`,
    author: "Famous Author",
    price: 350 + (i * 20),
    originalPrice: i % 2 === 0 ? 500 + (i * 20) : undefined,
    coverImage: "",
    rating: 4.8
  }));
};

export default async function HomePage() {
  // In a real scenario, we'd use optimized fetch here mapping to central API configs:
  // const newArrivals = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/books/new`, { next: { revalidate: 3600 } }).then(res => res.json());
  
  const newArrivals = generateMockBooks("Arrival", 10);
  const bestSellers = generateMockBooks("Bestseller", 10);
  const islamicBooks = generateMockBooks("Islamic", 10);
  const combos = generateMockBooks("Combo", 10);

  return (
    <div className="w-full flex flex-col pb-0 pt-6">
      
      {/* 1. New Arrivals */}
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4"><GridSkeleton /></div>}>
        <BookShelf 
          title="New Arrivals" 
          viewAllLink="/category/new-arrivals" 
          books={newArrivals} 
        />
      </Suspense>

      {/* 2. Best Sellers */}
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4"><GridSkeleton /></div>}>
        <BookShelf 
          title="Best Sellers" 
          viewAllLink="/category/best-sellers" 
          books={bestSellers} 
        />
      </Suspense>

      {/* 3. Author & Publisher Block */}
      <AuthorPublisherBlock />

      {/* 4. Category Highlights (Islamic Books) */}
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4"><GridSkeleton /></div>}>
        <BookShelf 
          title="Islamic Books" 
          viewAllLink="/category/islamic" 
          books={islamicBooks} 
        />
      </Suspense>
      
      {/* 5. Combo Packs */}
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4"><GridSkeleton /></div>}>
        <BookShelf 
          title="Combo Packs Showcase" 
          viewAllLink="/category/combo-packs" 
          books={combos} 
        />
      </Suspense>

      {/* 6. USP Feature Grid */}
      <UspFeatureGrid />

      {/* 7. Testimonials */}
      <TestimonialCarousel />
      
    </div>
  );
}
