"use client";

import React, { useState } from 'react';
import { ShoppingCart, Search, Eye, X, MapPin, Truck, Link as LinkIcon, CheckCircle2, Package, XCircle, RotateCcw, ChevronRight } from 'lucide-react';

const mockOrders = [
  { id: 'ORD-9912A', customer: 'Sajid Ahmed', phone: '01711223344', date: '2026-07-14', total: 1450, status: 'New Order', tracking: '' },
  { id: 'ORD-8823B', customer: 'Tariq Islam', phone: '01811223344', date: '2026-07-13', total: 850, status: 'Packed', tracking: '' },
  { id: 'ORD-7734C', customer: 'Fatima Rahman', phone: '01911223344', date: '2026-07-12', total: 3200, status: 'Shipped', tracking: 'https://track.steadfast.com/xyz' },
  { id: 'ORD-6645D', customer: 'Nabil Haque', phone: '01511223344', date: '2026-07-10', total: 450, status: 'Delivered', tracking: 'https://track.pathao.com/abc' },
];

const STATUS_SEQUENCE = ['New Order', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];
const TERMINAL_STATUSES = ['Cancelled', 'Returned'];

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [search, setSearch] = useState('');
  const [activeOrder, setActiveOrder] = useState<any | null>(null);
  const [tempTracking, setTempTracking] = useState('');

  const filteredOrders = orders.filter(o => o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()) || o.phone.includes(search));

  const openOrderPanel = (order: any) => {
    setActiveOrder(order);
    setTempTracking(order.tracking || '');
  };

  const executeStatusUpdate = (newStatus: string) => {
    if (!activeOrder) return;
    
    // Simulate API pipeline logic
    const updatedOrder = { ...activeOrder, status: newStatus };
    if (newStatus === 'Shipped') {
      if (!tempTracking) return alert("System Constraint: A tracking URL asset must be attached before an order can be officially flagged as SHIPPED.");
      updatedOrder.tracking = tempTracking;
    }

    setOrders(orders.map(o => o.id === activeOrder.id ? updatedOrder : o));
    setActiveOrder(updatedOrder);
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Query structural matrix by Order ID, Customer Name, or Phone..." 
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:border-blue-500 text-gray-900 dark:text-white transition-colors"
            />
          </div>
        </div>

        {/* Data Grid Table */}
        <div className="overflow-x-auto flex-1">
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
                  <td className="px-8 py-5 font-mono text-gray-900 dark:text-gray-200 font-bold">{order.id}</td>
                  <td className="px-8 py-5 font-semibold text-gray-600 dark:text-gray-400">{order.date}</td>
                  <td className="px-8 py-5">
                    <p className="font-bold text-gray-900 dark:text-gray-200 text-base">{order.customer}</p>
                    <p className="text-xs font-bold text-blue-600 dark:text-blue-500 mt-1">{order.phone}</p>
                  </td>
                  <td className="px-8 py-5 text-right font-black text-emerald-600 dark:text-emerald-400 text-base">৳{order.total}</td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest inline-block border ${
                      order.status === 'New Order' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/50' :
                      order.status === 'Delivered' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50' :
                      TERMINAL_STATUSES.includes(order.status) ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50' :
                      'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500 border-amber-200 dark:border-amber-800/50'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button onClick={() => openOrderPanel(order)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-xl transition-colors text-xs uppercase tracking-widest inline-flex items-center gap-2">
                      <Eye size={14} /> Review Logic
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <p className="text-gray-500 font-black text-xl mb-2">No pipeline data matched.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">{activeOrder.id}</h2>
              </div>
              <button onClick={() => setActiveOrder(null)} className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 rounded-full transition-colors"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              
              {/* Order Meta */}
              <div className="grid grid-cols-2 gap-6 p-6 bg-gray-50 dark:bg-gray-900/40 rounded-3xl border border-gray-100 dark:border-gray-800">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Customer Target</p>
                  <p className="font-black text-gray-900 dark:text-white text-lg">{activeOrder.customer}</p>
                  <p className="font-bold text-gray-600 dark:text-gray-400 text-sm">{activeOrder.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Net Valuation</p>
                  <p className="font-black text-emerald-600 dark:text-emerald-400 text-2xl">৳{activeOrder.total}</p>
                </div>
              </div>

              {/* Status Advancement Engine */}
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">Status Progression Sequence</h3>
                
                <div className="flex flex-wrap gap-3">
                  {STATUS_SEQUENCE.map((status, idx) => {
                    const isCurrent = activeOrder.status === status;
                    const isPast = STATUS_SEQUENCE.indexOf(activeOrder.status) >= idx && !TERMINAL_STATUSES.includes(activeOrder.status);
                    
                    return (
                      <button 
                        key={status}
                        onClick={() => executeStatusUpdate(status)}
                        disabled={isPast && !isCurrent}
                        className={`px-5 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm
                          ${isCurrent ? 'bg-blue-600 text-white shadow-blue-500/30 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-[#121212]' 
                            : isPast ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border border-emerald-200 dark:border-emerald-800/50 cursor-not-allowed'
                            : 'bg-white dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-800 text-gray-500 hover:border-blue-400 hover:text-blue-600'
                          }
                        `}
                      >
                        {isPast ? <CheckCircle2 size={14} /> : <ChevronRight size={14} />} {status}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Tracking Link Injection (Visible if Shipped or attempting to ship) */}
              {(activeOrder.status === 'Packed' || activeOrder.status === 'Shipped' || activeOrder.status === 'Delivered') && (
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
                        className="w-full pl-10 pr-4 py-3.5 bg-white dark:bg-gray-950 border-2 border-blue-200 dark:border-blue-800/50 rounded-xl text-sm font-bold outline-none focus:border-blue-600 text-gray-900 dark:text-white"
                      />
                    </div>
                    {activeOrder.status === 'Packed' && (
                      <button onClick={() => executeStatusUpdate('Shipped')} className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-colors whitespace-nowrap">
                        Confirm Shipping
                      </button>
                    )}
                  </div>
                  {activeOrder.tracking && (
                    <p className="mt-3 text-xs font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-1"><CheckCircle2 size={12} /> Live Tracking Hook Attached</p>
                  )}
                </div>
              )}

              {/* Terminal Override Actions */}
              <div>
                <h3 className="text-sm font-black text-red-600 dark:text-red-500 uppercase tracking-widest mb-4 border-b border-red-100 dark:border-red-900/30 pb-2">Danger Overrides</h3>
                <div className="flex gap-4">
                  <button onClick={() => executeStatusUpdate('Cancelled')} className="flex-1 py-4 border-2 border-red-200 dark:border-red-900/50 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 font-black text-xs uppercase tracking-widest rounded-xl transition-colors flex justify-center items-center gap-2">
                    <XCircle size={16} /> Force Cancel
                  </button>
                  <button onClick={() => executeStatusUpdate('Returned')} className="flex-1 py-4 border-2 border-orange-200 dark:border-orange-900/50 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/10 dark:hover:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-black text-xs uppercase tracking-widest rounded-xl transition-colors flex justify-center items-center gap-2">
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
