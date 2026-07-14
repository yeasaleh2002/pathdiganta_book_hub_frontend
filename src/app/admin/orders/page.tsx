"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Eye, X, MapPin, Truck, Link as LinkIcon, CheckCircle2, Package, XCircle, RotateCcw, ChevronRight, Loader2 } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";

const STATUS_SEQUENCE = ['NEW', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
const TERMINAL_STATUSES = ['CANCELLED', 'RETURNED'];

const STATUS_MAP: Record<string, string> = {
  'NEW': 'New Order',
  'PROCESSING': 'Packed/Confirmed',
  'SHIPPED': 'Shipped',
  'DELIVERED': 'Delivered',
  'CANCELLED': 'Cancelled',
  'RETURNED': 'Returned'
};

type Order = {
  id: string;
  orderNumber: string;
  user: { name: string, email: string };
  grandTotal: number;
  orderStatus: string;
  trackingLink?: string;
  createdAt: string;
};

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [tempTracking, setTempTracking] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  const fetchOrders = async (page: number) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/v1/admin/orders?page=${page}&limit=${itemsPerPage}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
        setTotalPages(data.meta.totalPages);
        setTotalItems(data.meta.total);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const filteredOrders = orders.filter(o => 
    o.orderNumber.toLowerCase().includes(search.toLowerCase()) || 
    (o.user?.name || '').toLowerCase().includes(search.toLowerCase()) || 
    (o.user?.email || '').toLowerCase().includes(search.toLowerCase())
  );

  const openOrderPanel = (order: Order) => {
    setActiveOrder(order);
    setTempTracking(order.trackingLink || '');
  };

  const executeStatusUpdate = async (newStatus: string) => {
    if (!activeOrder) return;
    
    if (newStatus === 'SHIPPED') {
      if (!tempTracking) return alert("System Constraint: A tracking URL asset must be attached before an order can be officially flagged as SHIPPED.");
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/v1/admin/orders/${activeOrder.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus, trackingLink: newStatus === 'SHIPPED' ? tempTracking : undefined })
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.map(o => o.id === activeOrder.id ? { ...o, orderStatus: newStatus, trackingLink: newStatus === 'SHIPPED' ? tempTracking : o.trackingLink } : o));
        setActiveOrder({ ...activeOrder, orderStatus: newStatus, trackingLink: newStatus === 'SHIPPED' ? tempTracking : activeOrder.trackingLink });
      } else {
        alert(data.message || "Failed to update order status");
      }
    } catch (error) {
      alert("An error occurred while updating order status");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl relative">
      
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
          <ShoppingCart className="text-blue-600" /> Order Processing Pipeline
        </h1>
        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-widest">Command console for state management and fulfillment tracking.</p>
      </div>

      <div className="bg-white dark:bg-[#121212] border-2 border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        
        {/* Table Filters */}
        <div className="p-6 md:p-8 border-b-2 border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="relative w-full max-w-lg">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Query structural matrix by Order ID, Customer Name, or Email..." 
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:border-blue-500 text-gray-900 dark:text-white transition-colors placeholder:text-gray-400 placeholder:font-bold"
            />
          </div>
        </div>

        {/* Data Grid Table */}
        <div className="overflow-x-auto flex-1 relative">
          {isLoading && (
             <div className="absolute inset-0 bg-white/50 dark:bg-black/50 z-10 flex items-center justify-center backdrop-blur-sm">
                <Loader2 size={32} className="animate-spin text-blue-600" />
             </div>
          )}
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-gray-900/80 border-b-2 border-gray-200 dark:border-gray-800">
                <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500">Order ID</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500">Date Timestamp</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500">Customer Identity</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-right">Net Value</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-center">Pipeline State</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-50 dark:divide-gray-800/50 text-sm">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors group">
                  <td className="px-8 py-5 font-mono text-gray-900 dark:text-gray-200 font-bold">{order.orderNumber}</td>
                  <td className="px-8 py-5 font-semibold text-gray-600 dark:text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-8 py-5">
                    <p className="font-bold text-gray-900 dark:text-gray-200 text-base">{order.user?.name || 'Unknown'}</p>
                    <p className="text-xs font-bold text-blue-600 dark:text-blue-500 mt-1">{order.user?.email || 'N/A'}</p>
                  </td>
                  <td className="px-8 py-5 text-right font-black text-emerald-600 dark:text-emerald-400 text-base">৳{order.grandTotal}</td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest inline-block border ${
                      order.orderStatus === 'NEW' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/50' :
                      order.orderStatus === 'DELIVERED' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50' :
                      TERMINAL_STATUSES.includes(order.orderStatus) ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50' :
                      'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500 border-amber-200 dark:border-amber-800/50'
                    }`}>
                      {STATUS_MAP[order.orderStatus] || order.orderStatus}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button onClick={() => openOrderPanel(order)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-xl transition-colors text-xs uppercase tracking-widest inline-flex items-center gap-2 cursor-pointer">
                      <Eye size={14} /> Review Logic
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <p className="text-gray-500 font-black text-xl mb-2">No pipeline data matched.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Advanced Pagination UI */}
        <div className="p-6 md:p-8 border-t-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            Showing <span className="text-gray-900 dark:text-white mx-1">{(currentPage - 1) * itemsPerPage + (filteredOrders.length > 0 ? 1 : 0)}</span> to <span className="text-gray-900 dark:text-white mx-1">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="text-gray-900 dark:text-white mx-1">{totalItems}</span> orders
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1 || isLoading}
              className="px-5 py-2.5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-black text-xs uppercase tracking-widest text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 transition-colors cursor-pointer"
            >
              Previous
            </button>
            <div className="flex gap-1.5 items-center px-3">
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  disabled={isLoading}
                  className={`w-10 h-10 rounded-xl font-black text-sm transition-transform active:scale-95 cursor-pointer ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages || totalPages === 0 || isLoading}
              className="px-5 py-2.5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-black text-xs uppercase tracking-widest text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>

      </div>

      {/* Slide-over Action Panel */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={() => setActiveOrder(null)}></div>
          
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#121212] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-gray-200 dark:border-gray-800">
            
            <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-950/50">
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Pipeline Operation Matrix</p>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">{activeOrder.orderNumber}</h2>
              </div>
              <button onClick={() => setActiveOrder(null)} className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 rounded-full transition-colors cursor-pointer"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              
              {/* Order Meta */}
              <div className="grid grid-cols-2 gap-6 p-6 bg-gray-50 dark:bg-gray-900/40 rounded-3xl border border-gray-100 dark:border-gray-800">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Customer Target</p>
                  <p className="font-black text-gray-900 dark:text-white text-lg">{activeOrder.user?.name || 'Unknown'}</p>
                  <p className="font-bold text-gray-600 dark:text-gray-400 text-sm">{activeOrder.user?.email || 'N/A'}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Net Valuation</p>
                  <p className="font-black text-emerald-600 dark:text-emerald-400 text-2xl">৳{activeOrder.grandTotal}</p>
                </div>
              </div>

              {/* Status Advancement Engine */}
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">Status Progression Sequence</h3>
                
                <div className="flex flex-wrap gap-3">
                  {STATUS_SEQUENCE.map((status, idx) => {
                    const isCurrent = activeOrder.orderStatus === status;
                    const isPast = STATUS_SEQUENCE.indexOf(activeOrder.orderStatus) >= idx && !TERMINAL_STATUSES.includes(activeOrder.orderStatus);
                    
                    return (
                      <button 
                        key={status}
                        onClick={() => executeStatusUpdate(status)}
                        disabled={isPast && !isCurrent}
                        className={`px-5 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm cursor-pointer
                          ${isCurrent ? 'bg-blue-600 text-white shadow-blue-500/30 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-[#121212]' 
                            : isPast ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border border-emerald-200 dark:border-emerald-800/50 cursor-not-allowed'
                            : 'bg-white dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-800 text-gray-500 hover:border-blue-400 hover:text-blue-600'
                          }
                        `}
                      >
                        {isPast ? <CheckCircle2 size={14} /> : <ChevronRight size={14} />} {STATUS_MAP[status]}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Tracking Link Injection (Visible if Shipped or attempting to ship) */}
              {(activeOrder.orderStatus === 'PROCESSING' || activeOrder.orderStatus === 'SHIPPED' || activeOrder.orderStatus === 'DELIVERED') && (
                <div className="bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-200 dark:border-blue-900/50 p-6 rounded-3xl">
                  <label className="flex items-center gap-2 text-xs uppercase tracking-widest font-black text-blue-900 dark:text-blue-400 mb-3">
                    <Truck size={16} /> Fulfillment Tracking Asset
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <LinkIcon size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input 
                        type="url"
                        value={tempTracking}
                        onChange={(e) => setTempTracking(e.target.value)}
                        placeholder="https://track.courier.com/id..." 
                        className="w-full pl-10 pr-4 py-3.5 bg-white dark:bg-gray-950 border-2 border-blue-200 dark:border-blue-800/50 rounded-xl text-sm font-bold outline-none focus:border-blue-600 text-gray-900 dark:text-white placeholder:text-gray-400 placeholder:font-bold"
                      />
                    </div>
                    {activeOrder.orderStatus === 'PROCESSING' && (
                      <button onClick={() => executeStatusUpdate('SHIPPED')} className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-colors whitespace-nowrap cursor-pointer">
                        Confirm Shipping
                      </button>
                    )}
                  </div>
                  {activeOrder.trackingLink && (
                    <p className="mt-3 text-xs font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-1"><CheckCircle2 size={12} /> Live Tracking Hook Attached</p>
                  )}
                </div>
              )}

              {/* Terminal Override Actions */}
              <div>
                <h3 className="text-sm font-black text-red-600 dark:text-red-500 uppercase tracking-widest mb-4 border-b border-red-100 dark:border-red-900/30 pb-2">Danger Overrides</h3>
                <div className="flex gap-4">
                  <button onClick={() => executeStatusUpdate('CANCELLED')} className="flex-1 py-4 border-2 border-red-200 dark:border-red-900/50 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 font-black text-xs uppercase tracking-widest rounded-xl transition-colors flex justify-center items-center gap-2 cursor-pointer">
                    <XCircle size={16} /> Force Cancel
                  </button>
                  <button onClick={() => executeStatusUpdate('RETURNED')} className="flex-1 py-4 border-2 border-orange-200 dark:border-orange-900/50 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/10 dark:hover:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-black text-xs uppercase tracking-widest rounded-xl transition-colors flex justify-center items-center gap-2 cursor-pointer">
                    <RotateCcw size={16} /> Process Return
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
