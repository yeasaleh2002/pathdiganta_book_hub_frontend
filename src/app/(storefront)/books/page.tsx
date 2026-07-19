import React, { Suspense } from 'react';
import { SidebarFilter } from '@/components/explorer/SidebarFilter';
import { Pagination } from '@/components/explorer/Pagination';
import { BookCard } from '@/components/modules/BookCard';
import { GridSkeleton } from '@/components/ui/skeletons';
import { Search } from 'lucide-react';

export const metadata = {
  title: 'Explorer | Pathdigonto Book Hub',
};

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";

const fetchBooks = async (params: any) => {
  const query = new URLSearchParams();
  
  if (params.page) query.append('page', params.page);
  if (params.limit) query.append('limit', params.limit);
  if (params.search) query.append('search', params.search);
  if (params.category) query.append('category', params.category);
  if (params.author) query.append('author', params.author);
  if (params.publisher) query.append('publisher', params.publisher);
  if (params.minPrice) query.append('minPrice', params.minPrice);
  if (params.maxPrice) query.append('maxPrice', params.maxPrice);
  if (params.sortBy) query.append('sortBy', params.sortBy);
  if (params.sortOrder) query.append('sortOrder', params.sortOrder);

  try {
    const res = await fetch(`${API_URL}/api/v1/books?${query.toString()}`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    const data = await res.json();
    
    if (data.success) {
      return {
        data: data.books,
        meta: {
          currentPage: data.meta.currentPage,
          totalPages: data.meta.totalPages,
          hasNextPage: data.meta.currentPage < data.meta.totalPages,
          totalItems: data.meta.total
        }
      };
    }
  } catch (error) {
    console.error("Failed to fetch books", error);
  }
  
  // Return empty fallback if failed
  return { data: [], meta: { currentPage: 1, totalPages: 1, hasNextPage: false, totalItems: 0 } };
};

const BookGridResults = async ({ searchParams }: { searchParams: any }) => {
  const result = await fetchBooks(searchParams);
  
  if (result.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
        <Search size={48} className="mb-4 text-gray-300 dark:text-gray-700" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No books found</h3>
        <p>Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {result.data.map((book: any) => (
          <BookCard key={book.id || book._id} book={{...book, id: book.id || book._id}} />
        ))}
      </div>
      <Pagination 
        currentPage={result.meta.currentPage}
        totalPages={result.meta.totalPages}
        hasNextPage={result.meta.hasNextPage}
      />
    </>
  );
};

export default async function BooksExplorerPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const searchQuery = resolvedParams.search as string;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      
      {/* Premium Header */}
      <div className="mb-10 relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-8 md:p-12 shadow-lg">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {searchQuery ? (
              <>Search Results for <span className="text-blue-200">"{searchQuery}"</span></>
            ) : "Explore Our Collection"}
          </h1>
          <p className="text-blue-100/90 text-lg md:text-xl max-w-2xl font-medium">
            Discover thousands of hand-picked books across various categories, trusted authors, and top publishers.
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-400/20 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start relative">
        {/* Sidebar Filter Component */}
        <Suspense fallback={<div className="w-72 md:w-64 h-96 bg-gray-50 dark:bg-gray-900 animate-pulse rounded-xl hidden md:block"></div>}>
          <SidebarFilter />
        </Suspense>
        
        {/* Main Grid Content wrapped in Suspense for loading state shifts */}
        <div className="flex-1 w-full min-w-0">
          <Suspense 
            key={JSON.stringify(resolvedParams)} 
            fallback={<GridSkeleton />}
          >
            <BookGridResults searchParams={resolvedParams} />
          </Suspense>
        </div>
      </div>
      
    </div>
  );
}
