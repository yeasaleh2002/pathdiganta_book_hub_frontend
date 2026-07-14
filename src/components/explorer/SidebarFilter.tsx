"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'top_rated', label: 'Top Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest Arrivals' },
];

const CATEGORIES = ["Fiction", "Academic", "Islamic", "Kids", "Sci-Fi", "Romance", "History"];
const AUTHORS = ["Humayun Ahmed", "Muhammed Zafar Iqbal", "Arif Azad", "Tamim Shahriar", "Sadat Hossain"];
const PUBLISHERS = ["Somoy Prokashon", "Prothoma", "Adarsha", "Batighar"];

export const SidebarFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState(searchParams.get('sort') || 'top_rated');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.get('category')?.split(',').filter(Boolean) || []);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(searchParams.get('author')?.split(',').filter(Boolean) || []);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>(searchParams.get('publisher')?.split(',').filter(Boolean) || []);

  const updateFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (sort) params.set('sort', sort);
    else params.delete('sort');
    
    if (selectedCategories.length) params.set('category', selectedCategories.join(','));
    else params.delete('category');
    
    if (selectedAuthors.length) params.set('author', selectedAuthors.join(','));
    else params.delete('author');

    if (selectedPublishers.length) params.set('publisher', selectedPublishers.join(','));
    else params.delete('publisher');
    
    params.set('page', '1'); 
    
    router.push(`/books?${params.toString()}`);
  };

  const handleCheckboxChange = (
    value: string, 
    state: string[], 
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (state.includes(value)) {
      setState(state.filter(item => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const onApply = () => {
    updateFilters();
    setIsOpen(false);
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedAuthors([]);
    setSelectedPublishers([]);
    setSort('top_rated');
    router.push('/books');
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center justify-center gap-2 w-full py-3 mb-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-semibold shadow-sm"
      >
        <Filter size={18} /> Filters & Sorting
      </button>

      {/* Filter Sidebar overlay for mobile */}
      <div className={`fixed inset-0 z-50 bg-black/50 md:hidden transition-opacity ${isOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`} onClick={() => setIsOpen(false)} />

      <aside className={`fixed md:sticky top-0 md:top-24 left-0 h-full md:h-auto max-h-screen md:max-h-[calc(100vh-8rem)] w-72 md:w-64 bg-white dark:bg-gray-900 shadow-2xl md:shadow-none border-r md:border-r-0 md:border md:rounded-xl border-gray-200 dark:border-gray-800 z-50 md:z-0 overflow-y-auto transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <h2 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2"><Filter size={18} /> Filters</h2>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500 hover:text-red-500"><X size={20} /></button>
        </div>

        <div className="p-5 space-y-6">
          {/* Sorting */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">Sort By</h3>
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full p-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>

          <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">Categories</h3>
            <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
              {CATEGORIES.map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCheckboxChange(cat, selectedCategories, setSelectedCategories)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>

          {/* Authors */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">Authors</h3>
            <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
              {AUTHORS.map(author => (
                <label key={author} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedAuthors.includes(author)}
                    onChange={() => handleCheckboxChange(author, selectedAuthors, setSelectedAuthors)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{author}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>

          {/* Publishers */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">Publishers</h3>
            <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
              {PUBLISHERS.map(pub => (
                <label key={pub} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedPublishers.includes(pub)}
                    onChange={() => handleCheckboxChange(pub, selectedPublishers, setSelectedPublishers)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{pub}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 sticky bottom-0 flex flex-col gap-3 z-10">
          <button onClick={onApply} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors text-sm shadow-sm">
            Apply Filters
          </button>
          <button onClick={clearAll} className="w-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-semibold py-2.5 rounded-lg transition-colors text-sm">
            Clear All
          </button>
        </div>
      </aside>
    </>
  );
};
