import React, { Suspense } from 'react';
import { BookShelf } from '@/components/modules/BookShelf';
import { AuthorPublisherBlock } from '@/components/modules/AuthorPublisherBlock';
import { UspFeatureGrid } from '@/components/modules/UspFeatureGrid';
import { TestimonialCarousel } from '@/components/modules/TestimonialCarousel';
import { GridSkeleton } from '@/components/ui/skeletons';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";

async function fetchNewArrivals() {
  try {
    const res = await fetch(`${API_URL}/api/v1/books/new-arrivals`, { next: { revalidate: 60 } });
    const data = await res.json();
    return data.success ? data.books : [];
  } catch (e) {
    console.error("Failed to fetch new arrivals", e);
    return [];
  }
}

async function fetchBestSellers() {
  try {
    const res = await fetch(`${API_URL}/api/v1/books/best-sellers`, { next: { revalidate: 60 } });
    const data = await res.json();
    return data.success ? data.books : [];
  } catch (e) {
    console.error("Failed to fetch best sellers", e);
    return [];
  }
}

async function fetchCategoryBooks(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/v1/categories/${slug}/books`, { next: { revalidate: 60 } });
    const data = await res.json();
    return data.success ? data.books : [];
  } catch (e) {
    console.error(`Failed to fetch category books for ${slug}`, e);
    return [];
  }
}

async function fetchCombos() {
  try {
    const res = await fetch(`${API_URL}/api/v1/combos`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (data.success) {
      // Map combo to bookshelf format
      return data.combos.map((combo: any) => ({
        id: combo.id,
        _id: combo._id,
        title: combo.title,
        price: combo.discountPrice,
        originalPrice: combo.standardTotal,
        coverImage: combo.comboItems?.[0]?.book?.images?.[0] || "",
        author: { name: "Bundle" },
        rating: 5,
        isCombo: true
      }));
    }
  } catch (e) {
    console.error("Failed to fetch combos", e);
  }
  return [];
}

export default async function HomePage() {
  const [newArrivals, bestSellers, islamicBooks, combos] = await Promise.all([
    fetchNewArrivals(),
    fetchBestSellers(),
    fetchCategoryBooks("islamic"),
    fetchCombos()
  ]);

  return (
    <div className="w-full flex flex-col pb-0 pt-6">
      
      {/* 1. New Arrivals */}
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4"><GridSkeleton /></div>}>
        <BookShelf 
          title="New Arrivals" 
          viewAllLink="/books?sortBy=createdAt" 
          books={newArrivals} 
        />
      </Suspense>

      {/* 2. Best Sellers */}
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4"><GridSkeleton /></div>}>
        <BookShelf 
          title="Best Sellers" 
          viewAllLink="/books" 
          books={bestSellers} 
        />
      </Suspense>

      {/* 3. Author & Publisher Block */}
      <AuthorPublisherBlock />

      {/* 4. Category Highlights (Islamic Books) */}
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4"><GridSkeleton /></div>}>
        <BookShelf 
          title="Islamic Books" 
          viewAllLink="/books?category=Islamic" 
          books={islamicBooks} 
        />
      </Suspense>
      
      {/* 5. Combo Packs */}
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4"><GridSkeleton /></div>}>
        <BookShelf 
          title="Combo Packs Showcase" 
          viewAllLink="/books" 
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
