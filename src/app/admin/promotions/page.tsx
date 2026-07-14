"use client";

import React, { useState } from 'react';
import { Megaphone, Search, PackagePlus, Tag, Plus, Check, X } from 'lucide-react';

const mockInventory = [
  { id: 'ISBN-9821', title: 'The Art of Clean Code Architecture', price: 850 },
  { id: 'ISBN-4512', title: 'Domain-Driven Design', price: 1150 },
  { id: 'ISBN-3321', title: 'Data Structures & Algorithms', price: 1250 },
  { id: 'ISBN-1123', title: 'System Design Interview', price: 950 },
  { id: 'ISBN-9923', title: 'Atomic Habits (Bengali)', price: 450 },
];

export default function PromotionsAdminPage() {
  const [search, setSearch] = useState('');
  const [selectedBooks, setSelectedBooks] = useState<any[]>([]);
  
  const [bundleData, setBundleData] = useState({
    title: '', description: '', discountPrice: ''
  });

  const toggleBook = (book: any) => {
    if (selectedBooks.find(b => b.id === book.id)) {
      setSelectedBooks(selectedBooks.filter(b => b.id !== book.id));
    } else {
      setSelectedBooks([...selectedBooks, book]);
    }
  };

  const filteredInventory = mockInventory.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()));
  const standardTotal = selectedBooks.reduce((acc, curr) => acc + curr.price, 0);

  const handleCreateBundle = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBooks.length < 2) return alert("System Error: A bundle configuration strictly requires at least 2 titles.");
    if (Number(bundleData.discountPrice) >= standardTotal) return alert("System Error: The Override Combo Price must strictly be lower than the Standard MSRP Total to constitute a valid promotion.");
    
    // Simulate deployment to global store
    alert(`Promotion Blueprint Compiled! Combo Bundle "${bundleData.title}" successfully deployed to the matrix.`);
    
    // UI Reset Flow
    setSelectedBooks([]);
    setBundleData({ title: '', description: '', discountPrice: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl">
      
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
          <Megaphone className="text-blue-600" /> Promotion Builders
        </h1>
        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-widest">Construct Multi-Pack Combo Deals to accelerate inventory movement velocity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Matrix: Book Selection Tool Panel */}
        <div className="bg-white dark:bg-[#121212] border-2 border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden flex flex-col h-[750px]">
          <div className="p-6 md:p-8 border-b-2 border-gray-100 dark:border-gray-800 flex flex-col gap-4">
            <h3 className="font-black text-xl text-gray-900 dark:text-white tracking-tight">Step 1: Assign Internal Titles</h3>
            <div className="relative w-full">
              <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Query inventory matrix by Title or ISBN block..." 
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:border-blue-500 text-gray-900 dark:text-white transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50/50 dark:bg-gray-900/20 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-700">
            {filteredInventory.map(book => {
              const isSelected = selectedBooks.some(b => b.id === book.id);
              return (
                <div 
                  key={book.id} 
                  onClick={() => toggleBook(book)}
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 shadow-[0_0_0_1px_rgba(37,99,235,1)]' 
                      : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121212] hover:border-blue-300 dark:hover:border-blue-800'
                  }`}
                >
                  <div>
                    <h4 className={`font-black text-sm md:text-base ${isSelected ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'}`}>{book.title}</h4>
                    <p className={`text-xs font-bold uppercase tracking-widest mt-1.5 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>৳{book.price} &middot; {book.id}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center border-2 transition-colors shrink-0 ${
                    isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 dark:border-gray-700 text-transparent'
                  }`}>
                    <Check size={14} strokeWidth={4} />
                  </div>
                </div>
              );
            })}
            {filteredInventory.length === 0 && (
              <div className="p-8 text-center text-gray-500 font-bold text-sm uppercase tracking-widest">No inventory matches found.</div>
            )}
          </div>
        </div>

        {/* Right Matrix: Structural Combo Designer Form */}
        <div className="bg-white dark:bg-[#121212] border-2 border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden flex flex-col sticky top-28">
          <div className="p-6 md:p-8 border-b-2 border-gray-100 dark:border-gray-800">
            <h3 className="font-black text-xl text-gray-900 dark:text-white tracking-tight">Step 2: Combo Configuration Protocol</h3>
          </div>
          
          <form onSubmit={handleCreateBundle} className="p-6 md:p-8 flex-1 flex flex-col">
            
            {/* Array Selection Visualizer */}
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-4 flex justify-between">
                Included Titles 
                <span className={selectedBooks.length < 2 ? 'text-red-500' : 'text-blue-500'}>[{selectedBooks.length}]</span>
              </label>
              
              {selectedBooks.length === 0 ? (
                <div className="w-full py-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-900/50">
                  <PackagePlus size={36} className="mb-3 opacity-50" />
                  <p className="text-xs font-black uppercase tracking-widest">No books selected</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  {selectedBooks.map(b => (
                    <span key={b.id} className="px-3.5 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-bold rounded-xl border border-blue-200 dark:border-blue-800/50 flex items-center gap-2 shadow-sm animate-in zoom-in-95">
                      {b.title} <button type="button" onClick={() => toggleBook(b)} className="hover:text-red-500 transition-colors bg-blue-200 dark:bg-blue-900/50 p-1 rounded-full"><X size={12} strokeWidth={3} /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6 flex-1">
              <div>
                <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Combo Package Title</label>
                <input required value={bundleData.title} onChange={e => setBundleData({...bundleData, title: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" placeholder="e.g. Master Developer Toolkit" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="opacity-70 pointer-events-none">
                  <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Standard MSRP Total</label>
                  <div className="w-full p-4 border-2 border-gray-200 dark:border-gray-800 rounded-xl bg-gray-100 dark:bg-gray-900 text-gray-500 font-black text-lg flex items-center gap-2">
                    <Tag size={18} strokeWidth={3} /> ৳{standardTotal}
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Override Combo Price</label>
                  <input required type="number" min="1" max={standardTotal - 1} value={bundleData.discountPrice} onChange={e => setBundleData({...bundleData, discountPrice: e.target.value})} className="w-full p-4 border-2 border-emerald-500 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-black text-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-colors" placeholder="৳" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Marketing Description</label>
                <textarea required rows={4} value={bundleData.description} onChange={e => setBundleData({...bundleData, description: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors resize-none" placeholder="Explain the high value proposition of this bundle..." />
              </div>
            </div>

            <div className="pt-8 border-t-2 border-gray-100 dark:border-gray-800 mt-8">
              <button type="submit" disabled={selectedBooks.length < 2} className="w-full py-4 bg-gray-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-transform hover:-translate-y-0.5 shadow-lg disabled:opacity-50 flex items-center justify-center gap-2">
                <Plus size={18} strokeWidth={3} /> Compile Promo Package
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
