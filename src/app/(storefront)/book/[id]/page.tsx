import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { Heart, Share2, ShoppingCart, Zap, CheckCircle2 } from 'lucide-react';
import { ImageGallery } from '@/components/book/ImageGallery';
import { BookTabs } from '@/components/book/BookTabs';
import { BundleRow } from '@/components/book/BundleRow';
import { BookShelf } from '@/components/modules/BookShelf';
import { fetchBookById, generateMockBooks } from '@/utils/mockData';
import { Star } from 'lucide-react';

// 1. Next.js SEO Metadata API Implementation
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const book = await fetchBookById(params.id);
  if (!book) return { title: 'Book Not Found' };

  return {
    title: `${book.title} by ${book.author} | Pathdigonto Book Hub`,
    description: book.shortDescription,
    keywords: [book.title, book.author, book.publisher, book.category, ...book.tags],
    openGraph: {
      title: `${book.title} - Pathdigonto Book Hub`,
      description: book.shortDescription,
      url: `https://pathdigontobookhub.com/book/${book.id}`,
      siteName: 'Pathdigonto Book Hub',
      images: [
        {
          url: book.images[0],
          width: 800,
          height: 1200,
          alt: book.title,
        },
      ],
      type: 'book',
    },
  };
}

export default async function BookDetailsPage({ params }: { params: { id: string } }) {
  const book = await fetchBookById(params.id);
  if (!book) notFound();

  // Mock related data blocks
  const bundleBooks = generateMockBooks("Bundle", 2);
  const relatedBooks = generateMockBooks("Related", 6);

  // 2. Strict JSON-LD Schema structures for Book SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: { '@type': 'Person', name: book.author },
    publisher: { '@type': 'Organization', name: book.publisher },
    isbn: book.isbn,
    numberOfPages: book.pages,
    offers: {
      '@type': 'Offer',
      price: book.price,
      priceCurrency: 'BDT',
      availability: book.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    }
  };

  const discount = book.originalPrice 
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) 
    : 0;

  return (
    <div className="w-full bg-white dark:bg-gray-950 pb-16">
      {/* Inject JSON-LD directly into the HTML head equivalent */}
      <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-4 py-3 text-xs text-gray-500 dark:text-gray-400 font-medium">
          Home <span className="mx-2">/</span> Books <span className="mx-2">/</span> {book.category} <span className="mx-2">/</span> <span className="text-blue-600 dark:text-blue-400 font-semibold">{book.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-10">
         {/* Top Layout: Images & Metadata */}
         <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 mb-16">
           
           {/* Left: Image Gallery */}
           <div className="w-full lg:w-[420px] flex-shrink-0">
             <ImageGallery images={book.images} />
           </div>
           
           {/* Right: Metadata & Actions */}
           <div className="flex-1 flex flex-col">
             
             {/* Title & Author Strip */}
             <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-start gap-4">
                  <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                    {book.title}
                  </h1>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="p-2.5 text-gray-400 hover:text-red-500 bg-gray-50 dark:bg-gray-900 rounded-full transition-colors border border-gray-200 dark:border-gray-800 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 shadow-sm">
                      <Heart size={20} />
                    </button>
                    <button className="p-2.5 text-gray-400 hover:text-blue-500 bg-gray-50 dark:bg-gray-900 rounded-full transition-colors border border-gray-200 dark:border-gray-800 hover:border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 shadow-sm">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-3">
                  by <Link href={`/books?author=${encodeURIComponent(book.author)}`} className="font-bold text-blue-600 dark:text-blue-400 hover:underline">{book.author}</Link>
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500 px-2.5 py-1 rounded text-xs font-bold border border-amber-200 dark:border-amber-800/50">
                    <Star size={12} className="fill-amber-500 text-amber-500" /> {book.rating}
                  </div>
                  <span className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer">{book.reviewsCount} Reviews</span>
                </div>
             </div>

             {/* Pricing & Stock Alert */}
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
               
               {book.inStock ? (
                 <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-800/50">
                   <CheckCircle2 size={16} /> In Stock (Ready to ship)
                 </span>
               ) : (
                 <span className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-full border border-red-100 dark:border-red-800/50">
                   Out of Stock
                 </span>
               )}
             </div>

             {/* Action Buttons */}
             <div className="flex flex-col sm:flex-row gap-4 mb-10">
               <button 
                 disabled={!book.inStock}
                 className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
               >
                 <ShoppingCart size={22} /> Add to Cart
               </button>
               <button 
                 disabled={!book.inStock}
                 className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
               >
                 <Zap size={22} className="fill-white" /> Buy Now
               </button>
             </div>

             {/* High-fidelity Metadata Spec Grid */}
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
               <div className="flex flex-col gap-1.5">
                 <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Publisher</span>
                 <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{book.publisher}</span>
               </div>
               <div className="flex flex-col gap-1.5">
                 <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">ISBN</span>
                 <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{book.isbn}</span>
               </div>
               <div className="flex flex-col gap-1.5">
                 <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Edition</span>
                 <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{book.edition}</span>
               </div>
               <div className="flex flex-col gap-1.5">
                 <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Pages/Weight</span>
                 <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{book.pages}p, {book.weight}</span>
               </div>
             </div>

           </div>
         </div>

         {/* 2. Bundle Block */}
         <div className="mb-14">
           <BundleRow mainBook={book} bundleBooks={bundleBooks} />
         </div>

         {/* 3. Deep Dive Tabs */}
         <div className="mb-16">
           <BookTabs description={book.description} authorBio={book.authorBio} />
         </div>

         {/* 4. Related Products */}
         <div className="pt-10 border-t border-gray-200 dark:border-gray-800">
           <BookShelf title="Customers Also Bought" viewAllLink={`/category/${book.category.toLowerCase()}`} books={relatedBooks} />
         </div>

      </div>
    </div>
  );
}
