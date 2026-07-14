"use client";

import React, { useState, useEffect } from 'react';
import { Megaphone, Search, PackagePlus, Tag, Plus, Check, X, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import ConfirmModal from '@/components/admin/ConfirmModal';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";

export default function PromotionsAdminPage() {
  const [view, setView] = useState<'list' | 'add'>('list');
  const [combos, setCombos] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedBooks, setSelectedBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [bundleData, setBundleData] = useState({
    title: '', description: '', discountPrice: ''
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [comboToDelete, setComboToDelete] = useState<any>(null);

  const fetchCombos = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/combos`);
      const data = await res.json();
      if (data.success) {
        setCombos(data.combos);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInventory = async () => {
    try {
      // Just fetch a large chunk of active books for the combo builder
      const res = await fetch(`${API_URL}/api/v1/books?limit=100`);
      const data = await res.json();
      if (data.success) {
        setInventory(data.books);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCombos();
    fetchInventory();
  }, []);

  const toggleBook = (book: any) => {
    if (selectedBooks.find(b => b.id === book.id)) {
      setSelectedBooks(selectedBooks.filter(b => b.id !== book.id));
    } else {
      setSelectedBooks([...selectedBooks, book]);
    }
  };

  const filteredInventory = inventory.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()));
  const standardTotal = selectedBooks.reduce((acc, curr) => acc + curr.price, 0);

  const handleCreateBundle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBooks.length < 2) return alert("System Error: A bundle configuration strictly requires at least 2 titles.");
    if (Number(bundleData.discountPrice) >= standardTotal) return alert("System Error: The Override Combo Price must strictly be lower than the Standard MSRP Total to constitute a valid promotion.");
    
    try {
      const token = localStorage.getItem('token');
      const payload = {
        title: bundleData.title,
        price: Number(bundleData.discountPrice),
        isActive: true,
        bookIds: selectedBooks.map(b => b.id)
      };

      const res = await fetch(`${API_URL}/api/v1/admin/combos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        alert(`Promotion Blueprint Compiled! Combo Bundle "${bundleData.title}" successfully deployed to the matrix.`);
        setSelectedBooks([]);
        setBundleData({ title: '', description: '', discountPrice: '' });
        setView('list');
        fetchCombos();
      } else {
        alert(data.message || "Failed to create combo");
      }
    } catch (err: any) {
      alert("Error creating combo: " + err.message);
    }
  };

  const confirmDelete = async () => {
    if (!comboToDelete) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/v1/admin/combos/${comboToDelete.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setDeleteModalOpen(false);
        setComboToDelete(null);
        fetchCombos();
      } else {
        alert(data.message || "Failed to delete combo");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to delete combo");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Megaphone className="text-blue-600" /> Promotion Builders
          </h1>
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-widest">
            {view === 'list' ? 'Manage active Multi-Pack Combo Deals.' : 'Construct Multi-Pack Combo Deals to accelerate inventory movement velocity.'}
          </p>
        </div>
        {view === 'list' ? (
          <button onClick={() => setView('add')} className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-black uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 cursor-pointer">
            <Plus size={18} strokeWidth={3} /> Add Combo
          </button>
        ) : (
          <button onClick={() => setView('list')} className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 cursor-pointer">
            <ArrowLeft size={18} strokeWidth={3} /> Back to List
          </button>
        )}
      </div>

      <ConfirmModal 
        isOpen={deleteModalOpen}
        title="Purge Combo Package?"
        message={`DANGER: Are you sure you want to completely purge the combo "${comboToDelete?.title}"? This action is irreversible.`}
        confirmText="Yes, Purge Combo"
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setComboToDelete(null);
        }}
      />

      {view === 'list' && (
        <div className="bg-white dark:bg-[#121212] border-2 border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50/80 dark:bg-gray-900/80 border-b-2 border-gray-200 dark:border-gray-800">
                  <th className="px-6 py-5 text-xs uppercase tracking-widest font-black text-gray-500">Combo Title</th>
                  <th className="px-6 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-center">Items Included</th>
                  <th className="px-6 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-right">Combo Price</th>
                  <th className="px-6 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-center">Status</th>
                  <th className="px-6 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-50 dark:divide-gray-800/50 text-sm">
                {isLoading ? (
                  <tr><td colSpan={5} className="p-8 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" /></td></tr>
                ) : combos.length > 0 ? combos.map(combo => (
                  <tr key={combo.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors group">
                    <td className="px-6 py-5 font-black text-gray-900 dark:text-gray-100">{combo.title}</td>
                    <td className="px-6 py-5 text-center font-bold text-gray-500">{combo.comboItems ? combo.comboItems.length : 0} Books</td>
                    <td className="px-6 py-5 text-right font-black text-emerald-600 dark:text-emerald-400">৳{combo.price}</td>
                    <td className="px-6 py-5 text-center">
                      <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest inline-block border ${combo.isActive ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700'}`}>
                        {combo.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-end opacity-40 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => {
                          setComboToDelete(combo);
                          setDeleteModalOpen(true);
                        }} className="p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors cursor-pointer"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="p-8 text-center text-gray-500 font-bold text-sm uppercase tracking-widest">No combinations deployed.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === 'add' && (
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
                      <p className={`text-xs font-bold uppercase tracking-widest mt-1.5 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>৳{book.price} &middot; {book.id.slice(0, 8)}...</p>
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
                        {b.title} <button type="button" onClick={() => toggleBook(b)} className="hover:text-red-500 transition-colors bg-blue-200 dark:bg-blue-900/50 p-1 rounded-full cursor-pointer"><X size={12} strokeWidth={3} /></button>
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
              </div>

              <div className="pt-8 border-t-2 border-gray-100 dark:border-gray-800 mt-8">
                <button type="submit" disabled={selectedBooks.length < 2} className="w-full py-4 bg-gray-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-transform hover:-translate-y-0.5 shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer">
                  <Plus size={18} strokeWidth={3} /> Compile Promo Package
                </button>
              </div>
            </form>

          </div>

        </div>
      )}
    </div>
  );
}
