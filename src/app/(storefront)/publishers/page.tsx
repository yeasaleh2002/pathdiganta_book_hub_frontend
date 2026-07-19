import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";

async function fetchPublishers() {
  try {
    const res = await fetch(`${API_URL}/api/v1/publishers`, { next: { revalidate: 60 } });
    const data = await res.json();
    return data.success ? data.publishers : [];
  } catch (e) {
    console.error("Failed to fetch publishers", e);
    return [];
  }
}

export const metadata = {
  title: 'Top Publishers | Pathdigonto Book Hub',
  description: 'Explore books by your favorite publishers on Pathdigonto Book Hub.'
};

export default async function PublishersPage() {
  const publishers = await fetchPublishers();

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div>
            <Link href="/" className="inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-800 dark:text-purple-400 mb-4 transition-colors">
              <ArrowLeft size={16} className="mr-1" /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              Top Publishers
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              Explore the biggest houses of literature.
            </p>
          </div>
          <div className="w-full md:w-auto relative max-w-sm">
             <input type="text" placeholder="Search publishers..." className="w-full pl-4 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:border-purple-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20 transition-all" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8">
          {publishers.map((pub: any, idx: number) => (
            <Link key={pub.id || pub._id || idx} href={`/books?publisher=${encodeURIComponent(pub?.name || "")}`} className="flex items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] transition-all group h-32 md:h-40 relative overflow-hidden transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-purple-500/10 transition-colors" />
              <span className="font-extrabold text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-center text-lg md:text-xl z-10">
                {pub?.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
