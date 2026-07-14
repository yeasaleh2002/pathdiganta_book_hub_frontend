import React from 'react';
import Link from 'next/link';

const authors = [
  { id: 1, name: "Humayun Ahmed", img: "H" },
  { id: 2, name: "Muhammed Zafar Iqbal", img: "M" },
  { id: 3, name: "Arif Azad", img: "A" },
  { id: 4, name: "Tamim Shahriar", img: "T" },
  { id: 5, name: "Sadat Hossain", img: "S" },
  { id: 6, name: "Ayman Sadiq", img: "A" },
];

const publishers = [
  { id: 1, name: "Somoy Prokashon", img: "SP" },
  { id: 2, name: "Prothoma", img: "PR" },
  { id: 3, name: "Adarsha", img: "AD" },
  { id: 4, name: "Guardian Pub.", img: "GP" },
  { id: 5, name: "Batighar", img: "BT" },
  { id: 6, name: "Kakoli", img: "KK" },
];

export const AuthorPublisherBlock = () => {
  return (
    <section className="w-full py-10 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-900 mt-4 mb-4">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Authors */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Top Authors</h2>
            <Link href="/authors" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {authors.map((author) => (
              <Link key={author.id} href={`/books?author=${encodeURIComponent(author.name)}`} className="flex flex-col items-center gap-2 group">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent group-hover:border-blue-600 shadow-sm flex items-center justify-center text-2xl font-bold text-gray-400 dark:text-gray-500 transition-all transform group-hover:scale-105">
                  {author.img}
                </div>
                <span className="text-sm font-medium text-center text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {author.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Publishers */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Top Publishers</h2>
            <Link href="/publishers" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {publishers.map((pub) => (
              <Link key={pub.id} href={`/books?publisher=${encodeURIComponent(pub.name)}`} className="flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-transparent hover:border-blue-500 transition-all group hover:scale-[1.02]">
                <span className="font-bold text-gray-500 dark:text-gray-400 group-hover:text-blue-600 transition-colors text-center line-clamp-2">
                  {pub.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
