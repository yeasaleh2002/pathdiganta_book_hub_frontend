"use client";

import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { X, Trash2, BookmarkPlus, Minus, Plus, ShoppingCart, BookmarkMinus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const CartDrawer = () => {
  const { isOpen, closeDrawer, items, savedForLater, updateQuantity, removeItem, saveForLater, moveToCart, loadingItems } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("CartDrawer");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (pathname?.startsWith('/admin')) return null;

  const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Overlay Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {/* Sliding Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white dark:bg-gray-950 shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <ShoppingCart size={22} className="text-gray-900 dark:text-white" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("yourCart")}</h2>
            {totalItems > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button 
            onClick={closeDrawer} 
            className="p-2 bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-red-500 rounded-full transition-colors border border-transparent hover:border-red-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto p-5 pb-20">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 space-y-4">
              <div className="w-24 h-24 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-700">
                 <ShoppingCart size={40} className="text-gray-300 dark:text-gray-700" />
              </div>
              <p className="font-medium">{t("emptyCart")}</p>
              <button onClick={closeDrawer} className="text-blue-600 font-semibold hover:underline">{t("continueShopping")}</button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map(item => (
                <div key={item.id} className={`flex gap-4 p-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm transition-opacity relative ${loadingItems[item.id] ? 'opacity-50 pointer-events-none' : ''}`}>
                  
                  {loadingItems[item.id] && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 dark:bg-black/40 rounded-xl">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}

                  {/* Image */}
                  <div className="w-20 h-28 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700">
                    <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm line-clamp-2 leading-tight pr-4">{item.title}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-1 -mt-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.author}</span>
                    
                    <div className="mt-2 font-black text-lg text-blue-600 dark:text-blue-400">
                      ৳{item.price}
                    </div>
                    
                    <div className="mt-auto pt-3 flex items-center justify-between">
                      
                      {/* Qty Selector */}
                      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2.5 py-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 disabled:opacity-50" disabled={item.quantity <= 1}>
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold text-gray-900 dark:text-white w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2.5 py-1 text-gray-600 dark:text-gray-300 hover:text-blue-600">
                          <Plus size={14} />
                        </button>
                      </div>

                      <button onClick={() => saveForLater(item.id)} className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 dark:bg-gray-800/50 dark:hover:bg-blue-900/20 px-2.5 py-1.5 rounded border border-gray-100 dark:border-gray-700">
                        <BookmarkPlus size={14} /> {t("save")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Saved For Later Block */}
          {savedForLater.length > 0 && (
            <div className="mt-10 pt-6 border-t-2 border-dashed border-gray-200 dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BookmarkPlus size={18} className="text-blue-600" /> {t("savedForLater")} ({savedForLater.length})
              </h3>
              
              <div className="flex flex-col gap-4">
                {savedForLater.map(item => (
                  <div key={item.id} className={`flex gap-4 p-3 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl transition-opacity relative ${loadingItems[item.id] ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div className="w-16 h-24 bg-gray-200 dark:bg-gray-800 rounded flex-shrink-0 opacity-80 border border-gray-300 dark:border-gray-700">
                      <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover rounded" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-gray-700 dark:text-gray-300 text-sm line-clamp-2">{item.title}</h4>
                        <span className="text-sm font-bold text-gray-500 mt-1 block">৳{item.price}</span>
                      </div>
                      <button onClick={() => moveToCart(item.id)} className="w-full mt-2 py-1.5 border border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-bold rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors flex justify-center items-center gap-1.5">
                        <BookmarkMinus size={14} /> {t("moveToCart")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Block */}
        {items.length > 0 && (
          <div className="p-6 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-20">
            <div className="flex justify-between items-end mb-4">
              <span className="text-gray-600 dark:text-gray-400 font-semibold">{t("subtotal")}</span>
              <span className="text-3xl font-black text-gray-900 dark:text-white leading-none">৳{totalAmount}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4">{t("shippingNote")}</p>
            <Link 
              href="/checkout"
              onClick={closeDrawer}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex justify-center items-center py-4 rounded-xl font-bold text-lg shadow-lg transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {t("checkout")}
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
