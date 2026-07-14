"use client";

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Search, Layers, RefreshCw } from 'lucide-react';

const initialCategories = [
  { id: '1', name: 'Islamic Books', slug: 'islamic-books', activeCount: 124 },
  { id: '2', name: 'Programming', slug: 'programming', activeCount: 89 },
  { id: '3', name: 'Novels', slug: 'novels', activeCount: 412 },
  { id: '4', name: 'Self Help', slug: 'self-help', activeCount: 65 },
];

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState('');
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');
  const [tempSlug, setTempSlug] = useState('');
  const [cacheStatus, setCacheStatus] = useState<string | null>(null);

  const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const triggerCacheRefresh = () => {
    // Structural simulation of server-side caching purge e.g. revalidateTag('categories')
    setCacheStatus("Synchronizing global header navigation cache...");
    setTimeout(() => {
      setCacheStatus(null);
    }, 2500);
  };

  const handleSaveEdit = (id: string) => {
    setCategories(categories.map(c => c.id === id ? { ...c, name: tempName, slug: tempSlug } : c));
    setEditingId(null);
    triggerCacheRefresh();
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    const newCat = {
      id: Math.random().toString(),
      name: tempName,
      slug: tempSlug || tempName.toLowerCase().replace(/ /g, '-'),
      activeCount: 0
    };
    setCategories([newCat, ...categories]);
    setIsAdding(false);
    triggerCacheRefresh();
  };

  const handleDelete = (id: string) => {
    if(confirm("DANGER: Are you sure you want to delete this category node? This will orphan all attached inventory items.")) {
      setCategories(categories.filter(c => c.id !== id));
      triggerCacheRefresh();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl">
      
      {/* Toast Alert System for Cache purging */}
      {cacheStatus && (
        <div className="fixed top-24 right-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-in slide-in-from-right-10 fade-in duration-300">
          <RefreshCw size={20} className="animate-spin text-blue-400 dark:text-blue-600" />
          <span className="font-bold text-sm tracking-wide">{cacheStatus}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Layers className="text-blue-600" /> Dynamic Categories
          </h1>
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-widest">Manage taxonomy. Updates instantly reflect on global public navigations.</p>
        </div>
        <button 
          onClick={() => { setTempName(''); setTempSlug(''); setIsAdding(true); }}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-transform hover:-translate-y-0.5 flex items-center gap-2"
        >
          <Plus size={18} strokeWidth={3} /> Add Category Node
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddNew} className="bg-white dark:bg-[#121212] border-2 border-blue-500 dark:border-blue-600 p-8 rounded-3xl shadow-lg flex flex-col md:flex-row gap-6 items-end animate-in fade-in slide-in-from-top-4">
          <div className="w-full">
            <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Category Name</label>
            <input required autoFocus value={tempName} onChange={(e) => { setTempName(e.target.value); setTempSlug(e.target.value.toLowerCase().replace(/ /g, '-')); }} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" placeholder="e.g. Science Fiction" />
          </div>
          <div className="w-full">
            <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">URL Slug (Auto-generated)</label>
            <input required value={tempSlug} onChange={(e) => setTempSlug(e.target.value)} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-4 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold rounded-xl transition-colors">Cancel</button>
            <button type="submit" className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-transform hover:-translate-y-0.5 shadow-sm whitespace-nowrap">Save Node</button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-[#121212] border-2 border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b-2 border-gray-100 dark:border-gray-800 flex items-center bg-gray-50/50 dark:bg-gray-900/50">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search taxonomy matrix..." 
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:border-blue-500 text-gray-900 dark:text-white transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-gray-900/80 border-b-2 border-gray-200 dark:border-gray-800">
                <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500">Category Name</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500">URL Slug</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-center">Active Products</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-50 dark:divide-gray-800/50 text-sm">
              {filteredCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors group">
                  <td className="px-8 py-5">
                    {editingId === cat.id ? (
                      <input autoFocus value={tempName} onChange={(e) => setTempName(e.target.value)} className="w-full p-2 border-2 border-blue-500 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none" />
                    ) : (
                      <span className="font-black text-gray-900 dark:text-gray-200 text-base">{cat.name}</span>
                    )}
                  </td>
                  <td className="px-8 py-5">
                    {editingId === cat.id ? (
                      <input value={tempSlug} onChange={(e) => setTempSlug(e.target.value)} className="w-full p-2 border-2 border-blue-500 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none" />
                    ) : (
                      <span className="font-mono font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800">{cat.slug}</span>
                    )}
                  </td>
                  <td className="px-8 py-5 text-center font-black text-lg text-blue-600 dark:text-blue-500">
                    {cat.activeCount}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                      {editingId === cat.id ? (
                        <>
                          <button onClick={() => setEditingId(null)} className="px-4 py-2 text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-1"><X size={14} /> Cancel</button>
                          <button onClick={() => handleSaveEdit(cat.id)} className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors flex items-center gap-1"><Check size={14} /> Commit</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => { setEditingId(cat.id); setTempName(cat.name); setTempSlug(cat.slug); }} className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800"><Edit2 size={18} /></button>
                          <button onClick={() => handleDelete(cat.id)} className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-800"><Trash2 size={18} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center text-gray-500 font-bold text-lg">No category nodes matched your query matrix.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
