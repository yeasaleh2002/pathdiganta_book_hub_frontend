"use client";

import React, { useState, useEffect } from 'react';
import { Search, Boxes, Edit2, Trash2, ArrowUpDown, MoreVertical, Plus, Filter } from 'lucide-react';
import Link from 'next/link';
import ConfirmModal from '@/components/admin/ConfirmModal';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";

type Book = {
  id: string;
  title: string;
  price: number;
  stock: number;
  isActive: boolean;
  author: { name: string };
  category: { name: string };
};

export default function InventoryAdminPage() {
  const [inventory, setInventory] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  
  // Advanced Table Sorters
  const [sortCol, setSortCol] = useState('title');
  const [sortDesc, setSortDesc] = useState(false);
  
  // Pagination Controllers
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  // Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const [bookToDeleteTitle, setBookToDeleteTitle] = useState<string>('');

  const fetchInventory = async (page: number) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/books?page=${page}&limit=${itemsPerPage}`);
      const data = await res.json();
      if (data.success) {
        setInventory(data.books);
        setTotalPages(data.meta.totalPages);
        setTotalItems(data.meta.total);
      }
    } catch (error) {
      console.error("Failed to fetch inventory", error);
    }
  };

  useEffect(() => {
    fetchInventory(currentPage);
  }, [currentPage]);

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortDesc(!sortDesc);
    } else {
      setSortCol(col);
      setSortDesc(false);
    }
  };

  const sortedInventory = [...inventory]
    .filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.author?.name?.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase()))
    .sort((a: any, b: any) => {
      let valA = a[sortCol];
      let valB = b[sortCol];
      
      if (sortCol === 'author') { valA = a.author?.name; valB = b.author?.name; }
      if (sortCol === 'category') { valA = a.category?.name; valB = b.category?.name; }

      if (typeof valA === 'string') { valA = valA?.toLowerCase() || ''; valB = valB?.toLowerCase() || ''; }
      if (valA < valB) return sortDesc ? 1 : -1;
      if (valA > valB) return sortDesc ? -1 : 1;
      return 0;
    });

  const handleDelete = (id: string, title: string) => {
    setBookToDelete(id);
    setBookToDeleteTitle(title);
    setDeleteModalOpen(true);
  }

  const confirmDelete = async () => {
    if (!bookToDelete) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/v1/admin/books/${bookToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      // Assuming backend supports DELETE /api/v1/admin/books/:id
      setInventory(inventory.filter(i => i.id !== bookToDelete));
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteModalOpen(false);
      setBookToDelete(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <ConfirmModal 
        isOpen={deleteModalOpen}
        title="Purge Inventory Title?"
        message={`DANGER: Are you sure you want to completely purge "${bookToDeleteTitle || 'this title'}" from the global inventory database? This action is irreversible.`}
        confirmText="Yes, Purge Title"
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setBookToDelete(null);
          setBookToDeleteTitle('');
        }}
      />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Boxes className="text-blue-600" /> Catalog Inventory Master
          </h1>
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-widest">Monitor, edit, and safely control the global product catalog.</p>
        </div>
        <Link href="/admin/inventory/new" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-transform hover:-translate-y-0.5 flex items-center gap-2">
          <Plus size={18} strokeWidth={3} /> Add New Title
        </Link>
      </div>

      <div className="bg-white dark:bg-[#121212] border-2 border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        
        {/* Table Filters & Global Query Controllers */}
        <div className="p-6 md:p-8 border-b-2 border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Query ISBN, Core Title, or Author Matrix..." 
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:border-blue-500 text-gray-900 dark:text-white transition-colors"
            />
          </div>
          <button className="px-6 py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl flex items-center gap-2 text-sm hover:border-blue-500 transition-colors w-full md:w-auto justify-center">
            <Filter size={16} /> Advanced Logic Filters
          </button>
        </div>

        {/* Data Grid Table Render */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-gray-900/80 border-b-2 border-gray-200 dark:border-gray-800">
                <th className="px-6 py-5 text-xs uppercase tracking-widest font-black text-gray-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('id')}>
                  <div className="flex items-center gap-2">Book ID <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-6 py-5 text-xs uppercase tracking-widest font-black text-gray-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('title')}>
                  <div className="flex items-center gap-2">Title Overview <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-6 py-5 text-xs uppercase tracking-widest font-black text-gray-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('category')}>
                  <div className="flex items-center gap-2">Taxonomy Node <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-6 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-right cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('stock')}>
                  <div className="flex items-center justify-end gap-2">Depot Stock <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-6 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-right cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('price')}>
                  <div className="flex items-center justify-end gap-2">Global Price <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-6 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-center">Operational Status</th>
                <th className="px-6 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-50 dark:divide-gray-800/50 text-sm">
              {sortedInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors group">
                  <td className="px-6 py-5 font-mono text-gray-500 dark:text-gray-400 font-bold bg-gray-50/50 dark:bg-gray-900/20">{item.id.slice(0, 8)}...</td>
                  <td className="px-6 py-5">
                    <p className="font-black text-gray-900 dark:text-gray-200 line-clamp-1 text-base">{item.title}</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-500 mt-1.5">{item.author?.name || 'Unknown Author'}</p>
                  </td>
                  <td className="px-6 py-5 font-bold text-gray-700 dark:text-gray-300">{item.category?.name || 'Uncategorized'}</td>
                  <td className="px-6 py-5 text-right font-black text-gray-900 dark:text-gray-200 text-base">{item.stock}</td>
                  <td className="px-6 py-5 text-right font-black text-emerald-600 dark:text-emerald-400 text-base">৳{item.price}</td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest inline-block border ${
                      item.isActive && item.stock > 10 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50' :
                      item.isActive && item.stock > 0 ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500 border-amber-200 dark:border-amber-800/50' :
                      'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50'
                    }`}>
                      {!item.isActive ? 'Inactive' : item.stock === 0 ? 'Out of Stock' : item.stock > 10 ? 'Active' : 'Low Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/inventory/edit/${item.id}`} className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-colors cursor-pointer"><Edit2 size={18} /></Link>
                      <button onClick={() => handleDelete(item.id, item.title)} className="p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors cursor-pointer"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {sortedInventory.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <p className="text-gray-500 font-black text-xl mb-2">No active inventory found.</p>
                    <p className="text-gray-400 font-semibold text-sm">Please modify your global search query or filter matrix.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Deep Pagination Controllers */}
        <div className="p-6 md:p-8 border-t-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            Showing <span className="text-gray-900 dark:text-white mx-1">{(currentPage - 1) * itemsPerPage + (sortedInventory.length > 0 ? 1 : 0)}</span> to <span className="text-gray-900 dark:text-white mx-1">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="text-gray-900 dark:text-white mx-1">{totalItems}</span> blocks
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-5 py-2.5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-black text-xs uppercase tracking-widest text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 transition-colors"
            >
              Previous
            </button>
            <div className="flex gap-1.5 items-center px-3">
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl font-black text-sm transition-transform active:scale-95 ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-5 py-2.5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-black text-xs uppercase tracking-widest text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
