"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'title_asc', label: 'Title: A to Z' },
];

export const SidebarFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";
  
  const [isOpen, setIsOpen] = useState(false);
  
  const [sort, setSort] = useState(searchParams.get('sortBy') || 'newest');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.get('categoryId')?.split(',').filter(Boolean) || []);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(searchParams.get('authorId')?.split(',').filter(Boolean) || []);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>(searchParams.get('publisherId')?.split(',').filter(Boolean) || []);

  const [categories, setCategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [publishers, setPublishers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categories: true,
    authors: false,
    publishers: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catRes, authRes, pubRes] = await Promise.all([
          fetch(`${API_URL}/api/v1/categories`),
          fetch(`${API_URL}/api/v1/authors`),
          fetch(`${API_URL}/api/v1/publishers`)
        ]);
        const catData = await catRes.json();
        const authData = await authRes.json();
        const pubData = await pubRes.json();

        if (catData.success) setCategories(catData.categories || catData.data || []);
        if (authData.success) setAuthors(authData.authors || authData.data || []);
        if (pubData.success) setPublishers(pubData.publishers || pubData.data || []);
      } catch (error) {
        console.error("Failed to fetch filters", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilters();
  }, []);

  const updateFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (sort) params.set('sortBy', sort);
    else params.delete('sortBy');
    
    if (selectedCategories.length) params.set('categoryId', selectedCategories.join(','));
    else params.delete('categoryId');
    
    if (selectedAuthors.length) params.set('authorId', selectedAuthors.join(','));
    else params.delete('authorId');

    if (selectedPublishers.length) params.set('publisherId', selectedPublishers.join(','));
    else params.delete('publisherId');
    
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
    setSort('newest');
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
      <div className={`fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity ${isOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`} onClick={() => setIsOpen(false)} />

      <aside className={`fixed md:sticky top-0 md:top-[80px] left-0 h-full md:h-[calc(100vh-80px)] w-72 md:w-64 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-2xl md:shadow-none border-r md:border-r border-gray-200 dark:border-gray-800 z-50 md:z-20 flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <h2 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2"><Filter size={18} /> Filters</h2>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500 hover:text-red-500"><X size={20} /></button>
        </div>

        <div className="p-4 space-y-4 flex-1 overflow-y-auto custom-scrollbar">
          {/* Sorting */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2 uppercase tracking-wider text-[11px]">Sort By</h3>
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full p-2.5 text-sm font-semibold border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 cursor-pointer transition-colors"
            >
              {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>

          <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>

          {isLoading ? (
            <div className="flex justify-center p-8"><Loader2 className="animate-spin text-blue-600" /></div>
          ) : (
            <>
              {/* Categories Accordion */}
              <div>
                <button 
                  onClick={() => toggleSection('categories')}
                  className="flex items-center justify-between w-full py-2 font-semibold text-sm text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1"
                >
                  Categories
                  {openSections.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSections.categories && (
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2 mt-2 custom-scrollbar">
                    {categories.map((cat: any) => (
                      <label key={cat._id || cat.id} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedCategories.includes(cat._id || cat.id)}
                          onChange={() => handleCheckboxChange(cat._id || cat.id, selectedCategories, setSelectedCategories)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cat.name || cat.title}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>

              {/* Authors Accordion */}
              <div>
                <button 
                  onClick={() => toggleSection('authors')}
                  className="flex items-center justify-between w-full py-2 font-semibold text-sm text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1"
                >
                  Authors
                  {openSections.authors ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSections.authors && (
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2 mt-2 custom-scrollbar">
                    {authors.map((author: any) => (
                      <label key={author._id || author.id} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedAuthors.includes(author._id || author.id)}
                          onChange={() => handleCheckboxChange(author._id || author.id, selectedAuthors, setSelectedAuthors)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{author.name || author.fullName}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>

              {/* Publishers Accordion */}
              <div>
                <button 
                  onClick={() => toggleSection('publishers')}
                  className="flex items-center justify-between w-full py-2 font-semibold text-sm text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1"
                >
                  Publishers
                  {openSections.publishers ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSections.publishers && (
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2 mt-2 custom-scrollbar">
                    {publishers.map((pub: any) => (
                      <label key={pub._id || pub.id} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedPublishers.includes(pub._id || pub.id)}
                          onChange={() => handleCheckboxChange(pub._id || pub.id, selectedPublishers, setSelectedPublishers)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{pub.name || pub.title}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shrink-0 flex flex-col gap-3">
          <button onClick={onApply} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl transition-colors text-sm shadow-md cursor-pointer">
            Apply Filters
          </button>
          <button onClick={clearAll} className="w-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 font-bold py-2.5 rounded-xl transition-colors text-sm cursor-pointer">
            Clear All
          </button>
        </div>
      </aside>
    </>
  );
};
