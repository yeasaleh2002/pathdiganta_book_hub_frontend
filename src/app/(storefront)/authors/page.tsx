import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";

async function fetchAuthors() {
  try {
    const res = await fetch(`${API_URL}/api/v1/authors`, { next: { revalidate: 60 } });
    const data = await res.json();
    return data.success ? data.authors : [];
  } catch (e) {
    console.error("Failed to fetch authors", e);
    return [];
  }
}

export const metadata = {
  title: 'Top Authors | Pathdigonto Book Hub',
  description: 'Explore books by your favorite authors on Pathdigonto Book Hub.'
};

export default async function AuthorsPage() {
  const authors = await fetchAuthors();

  const getInitials = (name: string) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div>
            <Link href="/" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 mb-4 transition-colors">
              <ArrowLeft size={16} className="mr-1" /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              Top Authors
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              Discover the masterminds behind your favorite stories.
            </p>
          </div>
          <div className="w-full md:w-auto relative max-w-sm">
             <input type="text" placeholder="Search authors..." className="w-full pl-4 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
          {authors.map((author: any, idx: number) => (
            <Link key={author.id || author._id || idx} href={`/books?author=${encodeURIComponent(author?.name || "")}`} className="flex flex-col items-center gap-4 group">
              <div className="w-full aspect-square rounded-full bg-white dark:bg-gray-900 border-4 border-white dark:border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_30px_rgba(37,99,235,0.2)] group-hover:border-blue-500 dark:group-hover:border-blue-500 flex items-center justify-center text-4xl font-black text-gray-400 dark:text-gray-500 transition-all transform group-hover:-translate-y-2 group-hover:scale-105 duration-300">
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-gray-400 to-gray-500 group-hover:from-blue-500 group-hover:to-blue-700 dark:group-hover:from-blue-400 dark:group-hover:to-blue-600">{getInitials(author?.name || "")}</span>
              </div>
              <span className="text-sm md:text-base font-bold text-center text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {author?.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
