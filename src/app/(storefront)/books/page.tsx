import React, { Suspense } from 'react';
import { SidebarFilter } from '@/components/explorer/SidebarFilter';
import { Pagination } from '@/components/explorer/Pagination';
import { BookCard } from '@/components/modules/BookCard';
import { GridSkeleton } from '@/components/ui/skeletons';
import { Search } from 'lucide-react';

export const metadata = {
  title: 'Explorer | Pathdigonto Book Hub',
};

// Mock data fetcher reflecting Next.js 14 API interaction
const fetchBooks = async (params: any) => {
  // Simulate network delay to showcase Suspense boundary shift
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const page = Number(params.page) || 1;
  const limit = 12;
  const totalItems = 45; 
  const totalPages = Math.ceil(totalItems / limit);
  
  // Calculate if any books exist based on mock page
  if (page > totalPages) {
      return { data: [], meta: { currentPage: page, totalPages, hasNextPage: false, totalItems } };
  }

  const books = Array.from({ length: page === totalPages ? totalItems % limit || limit : limit }).map((_, i) => ({
    id: `explore-${page}-${i}`,
    title: `${params.category || 'Amazing'} Book Title ${i + 1 + (page - 1) * limit}`,
    author: params.author ? params.author.split(',')[0] : "Famous Author",
    price: 350 + (i * 10),
    originalPrice: 400 + (i * 10),
    coverImage: "",
    rating: 4.5 + (Math.random() * 0.5)
  }));
  
  return {
    data: books,
    meta: {
      currentPage: page,
      totalPages: totalPages,
      hasNextPage: page < totalPages,
      totalItems: totalItems
    }
  };
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
          <BookCard key={book.id} book={book} />
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

export default function BooksExplorerPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const searchQuery = searchParams.search as string;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {searchQuery ? `Search Results for "${searchQuery}"` : "Explore All Books"}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Discover millions of books across various categories, authors, and publishers.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start relative">
        {/* Sidebar Filter Component */}
        <SidebarFilter />
        
        {/* Main Grid Content wrapped in Suspense for loading state shifts */}
        <div className="flex-1 w-full min-w-0">
          <Suspense 
            key={JSON.stringify(searchParams)} 
            fallback={<GridSkeleton />}
          >
            <BookGridResults searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
      
    </div>
  );
}
