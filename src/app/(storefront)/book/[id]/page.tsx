import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { Heart, Share2, ShoppingCart, Zap, CheckCircle2 } from 'lucide-react';
import { ImageGallery } from '@/components/book/ImageGallery';
import { BookTabs } from '@/components/book/BookTabs';
import { BundleRow } from '@/components/book/BundleRow';
import { CartButtons } from '@/components/book/CartButtons';
import { WishlistShareButtons } from '@/components/book/WishlistShareButtons';
import { BookShelf } from '@/components/modules/BookShelf';
import { Star } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";

async function fetchBookById(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/v1/books/${id}`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (data.success) return data.book;
  } catch (error) {
    console.error("Error fetching book details", error);
  }
  return null;
}

async function fetchRelatedBooks(categoryId: string, excludeId: string) {
  try {
    const res = await fetch(`${API_URL}/api/v1/books?limit=6`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (data.success) return data.books.filter((b: any) => b.id !== excludeId || b._id !== excludeId).slice(0, 6);
  } catch (error) {
    console.error("Error fetching related books", error);
  }
  return [];
}

async function fetchCombos() {
  try {
    const res = await fetch(`${API_URL}/api/v1/combos`, { next: { revalidate: 60 } });
    const data = await res.json();
    // Return first combo or mock something if combos don't have exactly books array 
    if (data.success && data.combos.length > 0) return data.combos[0].comboItems?.map((item: any) => item.book) || [];
  } catch (error) {
    console.error("Error fetching combos", error);
  }
  return [];
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const book = await fetchBookById(id);
  if (!book) return { title: 'Book Not Found' };

  return {
    title: `${book.title} | Pathdigonto Book Hub`,
    description: book.description?.slice(0, 160) || "Explore books at Pathdigonto Book Hub.",
    keywords: [book.title, book.author?.name || "Author", book.publisher?.name || "Publisher"],
    openGraph: {
      title: `${book.title} - Pathdigonto Book Hub`,
      description: book.description?.slice(0, 160) || "",
      url: `https://pathdigontobookhub.com/book/${book._id || book.id}`,
      siteName: 'Pathdigonto Book Hub',
      images: [
        {
          url: book.imageUrls?.[0] || book.images?.[0] || 'https://placehold.co/600x900',
          width: 800,
          height: 1200,
          alt: book.title,
        },
      ],
      type: 'book',
    },
  };
}

export default async function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await fetchBookById(id);
  if (!book) notFound();

  const bundleBooks = await fetchCombos();
  const relatedBooks = await fetchRelatedBooks(book.category?._id || book.categoryId, book._id || book.id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: { '@type': 'Person', name: book.author?.name || "Unknown" },
    publisher: { '@type': 'Organization', name: book.publisher?.name || "Unknown" },
    isbn: book.isbn,
    numberOfPages: book.pages || 0,
    offers: {
      '@type': 'Offer',
      price: book.price,
      priceCurrency: 'BDT',
      availability: book.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    }
  };

  const discount = book.originalPrice 
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) 
    : 0;

  return (
    <div className="w-full bg-white dark:bg-gray-950 pb-16">
      <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="border-b border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-4 py-3 text-xs text-gray-500 dark:text-gray-400 font-medium">
          Home <span className="mx-2">/</span> Books <span className="mx-2">/</span> {book.category?.name || "Category"} <span className="mx-2">/</span> <span className="text-blue-600 dark:text-blue-400 font-semibold">{book.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-10">
         <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 mb-16">
           
           <div className="w-full lg:w-[420px] flex-shrink-0">
             <ImageGallery images={book.imageUrls || book.images || ['https://placehold.co/600x900']} />
           </div>
           
           <div className="flex-1 flex flex-col">
             
             <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-start gap-4">
                  <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                    {book.title}
                  </h1>
                  <WishlistShareButtons bookId={book._id || book.id} />
                </div>
                
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-3">
                  by <Link href={`/books?author=${encodeURIComponent(book.author?.name || "")}`} className="font-bold text-blue-600 dark:text-blue-400 hover:underline">{book.author?.name}</Link>
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500 px-2.5 py-1 rounded text-xs font-bold border border-amber-200 dark:border-amber-800/50">
                    <Star size={12} className="fill-amber-500 text-amber-500" /> {book.rating || 0}
                  </div>
                  <span className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer">{book.reviewsCount || 0} Reviews</span>
                </div>
             </div>

             <div className="mb-8 p-6 bg-blue-50/30 dark:bg-gray-900/30 rounded-2xl border border-blue-50 dark:border-gray-800">
               <div className="flex items-end gap-3 mb-3">
                 <span className="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400">৳{book.price}</span>
                 {book.originalPrice && (
                   <span className="text-xl text-gray-400 line-through mb-1 font-semibold">৳{book.originalPrice}</span>
                 )}
                 {discount > 0 && (
                   <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-md text-sm font-bold mb-1.5 ml-2 border border-red-200 dark:border-red-800">
                     Save {discount}%
                   </span>
                 )}
               </div>
               
               {book.stock > 0 ? (
                 <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-800/50">
                   <CheckCircle2 size={16} /> In Stock (Ready to ship)
                 </span>
               ) : (
                 <span className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-full border border-red-100 dark:border-red-800/50">
                   Out of Stock
                 </span>
               )}
             </div>

              <CartButtons book={book} />

             <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
               <div className="flex flex-col gap-1.5">
                 <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Publisher</span>
                 <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{book.publisher?.name || 'N/A'}</span>
               </div>
               <div className="flex flex-col gap-1.5">
                 <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">ISBN</span>
                 <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{book.isbn || 'N/A'}</span>
               </div>
               <div className="flex flex-col gap-1.5">
                 <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Edition</span>
                 <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{book.edition || '1st'}</span>
               </div>
               <div className="flex flex-col gap-1.5">
                 <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Pages</span>
                 <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{book.pages || 0}p</span>
               </div>
             </div>

           </div>
         </div>

         <div className="mb-16">
           <BookTabs description={book.description} authorBio={book.author?.bio || 'No author biography available.'} />
         </div>

         {relatedBooks.length > 0 && (
           <div className="pt-10 border-t border-gray-200 dark:border-gray-800">
             <BookShelf title="Top Rated Books" viewAllLink={`/books?category=${book.category?.name}`} books={relatedBooks} />
           </div>
         )}

      </div>
    </div>
  );
}
