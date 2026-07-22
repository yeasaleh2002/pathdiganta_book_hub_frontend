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
  if (params.q) query.append('q', params.q);
  if (params.categoryId) query.append('categoryId', params.categoryId);
  if (params.authorId) query.append('authorId', params.authorId);
  if (params.publisherId) query.append('publisherId', params.publisherId);
  if (params.sortBy) query.append('sortBy', params.sortBy);

  try {
    const res = await fetch(`${API_URL}/api/v1/books/search?${query.toString()}`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    const data = await res.json();
    
    if (data.success) {
      return {
        data: data.books,
        meta: {
          currentPage: data.meta.page,
          totalPages: data.meta.totalPages,
          hasNextPage: data.meta.page < data.meta.totalPages,
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
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
  const searchQuery = resolvedParams.q as string;

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-[#0a0a0a] relative flex flex-col md:flex-row items-start">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-sky-600/10 to-transparent dark:from-sky-900/20 pointer-events-none z-0" />
        <div className="absolute top-40 right-0 w-96 h-96 bg-sky-500/10 dark:bg-sky-600/10 rounded-full blur-3xl pointer-events-none z-0" />
      
        {/* Sidebar Filter Component */}
        <Suspense fallback={<div className="w-72 md:w-64 h-96 bg-gray-50 dark:bg-gray-900 animate-pulse rounded-xl hidden md:block z-10"></div>}>
          <SidebarFilter />
        </Suspense>
        
        {/* Main Grid Content wrapped in Suspense for loading state shifts */}
        <div className="flex-1 w-full min-w-0 relative z-10">
          <div className="w-full max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            <form action="/books" method="GET" className="mb-8 flex w-full rounded-2xl border-2 border-gray-200 dark:border-gray-800 focus-within:border-blue-600 dark:focus-within:border-blue-500 overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm transition-all relative z-20">
              <div className="flex items-center pl-4 sm:pl-5 text-gray-400">
                <Search size={18} className="sm:w-5 sm:h-5" />
              </div>
              <input 
                type="text" 
                name="q" 
                defaultValue={searchQuery || ''} 
                placeholder="Search for books..." 
                className="flex-1 bg-transparent px-3 sm:px-4 py-3 sm:py-3.5 outline-none text-sm sm:text-base font-semibold text-gray-900 dark:text-white placeholder-gray-400 min-w-0" 
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-8 py-3 sm:py-3.5 transition-colors flex items-center justify-center cursor-pointer font-black text-xs sm:text-sm uppercase tracking-wider shrink-0">
                Search
              </button>
            </form>

            {searchQuery && (
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Search Results for <span className="text-blue-600">"{searchQuery}"</span>
              </h1>
            )}
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
