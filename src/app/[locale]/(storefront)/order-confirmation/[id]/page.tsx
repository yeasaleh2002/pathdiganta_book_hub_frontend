"use client";

import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { CheckCircle2, CalendarDays, Truck, Printer } from 'lucide-react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useTranslations } from 'next-intl';

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const { clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const orderId = params.id;
  const t = useTranslations("OrderConfirmation");

  useEffect(() => {
    setMounted(true);
    // Automatically trigger cart cleanup upon landing on the success matrix
    clearCart();
  }, [clearCart]);

  if (!mounted) return null;

  const date = new Date();
  const deliveryDate = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen print:py-4 print:bg-white print:text-black">
        
        {/* Success Splash Overview (Hidden when printing the invoice) */}
        <div className="text-center mb-14 print:hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200 dark:border-emerald-800 shadow-sm">
            <CheckCircle2 size={48} className="text-emerald-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">{t("orderConfirmed")}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            {t("successMessage")}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl max-w-xl mx-auto shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <CalendarDays className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">{t("expectedDelivery")}</p>
                <p className="text-sm font-black text-gray-900 dark:text-white">{deliveryDate}</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200 dark:bg-gray-800"></div>
            <Link href="/dashboard" className="w-full sm:w-auto px-8 py-3.5 bg-gray-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md hover:-translate-y-0.5">
              <Truck size={18} /> {t("trackOrderLive")}
            </Link>
          </div>
        </div>

        {/* Text-Format Invoice Card (Typewriter layout engineered for Print media) */}
        <div className="bg-white dark:bg-[#121212] border-[3px] border-gray-900 dark:border-gray-700 p-8 md:p-12 shadow-[12px_12px_0_0_rgba(0,0,0,1)] dark:shadow-[12px_12px_0_0_rgba(255,255,255,0.05)] mx-auto font-mono text-sm max-w-3xl print:border-0 print:shadow-none print:max-w-full">
          
          <div className="flex flex-col md:flex-row justify-between items-start mb-10 pb-6 border-b-[3px] border-dashed border-gray-300 dark:border-gray-700">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-black uppercase tracking-widest text-gray-900 dark:text-white mb-2">{t("invoice")}</h2>
              <p className="text-gray-600 dark:text-gray-400 font-medium">{t("companyName")}</p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">{t("companyAddress")}</p>
            </div>
            <div className="text-left md:text-right">
              <button onClick={() => window.print()} className="print:hidden mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold uppercase tracking-wider text-xs rounded transition-colors inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600">
                <Printer size={16} /> {t("printReceipt")}
              </button>
              <div>
                <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mb-1">{t("receiptNo")}</p>
                <p className="text-gray-900 dark:text-white font-black text-lg bg-gray-100 dark:bg-gray-800 px-3 py-1 inline-block">{orderId}</p>
                <p className="text-gray-500 mt-3 font-medium uppercase text-xs">{date.toLocaleDateString('en-GB')}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 text-gray-800 dark:text-gray-300">
            <div>
              <p className="font-bold text-gray-500 uppercase text-xs tracking-widest mb-3 pb-1 border-b border-gray-200 dark:border-gray-800 inline-block">{t("billedTo")}</p>
              <p className="font-black text-gray-900 dark:text-white">Md. Rahim Uddin</p>
              <p className="mt-1">rahim.uddin@example.com</p>
              <p className="mt-1">+880 1711 223344</p>
            </div>
            <div className="sm:text-right">
              <p className="font-bold text-gray-500 uppercase text-xs tracking-widest mb-3 pb-1 border-b border-gray-200 dark:border-gray-800 inline-block">{t("shippedTo")}</p>
              <p className="font-black text-gray-900 dark:text-white">House 12, Road 5</p>
              <p className="mt-1">Dhanmondi, Dhaka, 1205</p>
              <p className="mt-1 font-bold">{t("paymentCOD")}</p>
            </div>
          </div>

          {/* Typewriter Invoice Data Matrix */}
          <div className="w-full">
            <div className="grid grid-cols-12 gap-4 border-b-[3px] border-gray-900 dark:border-gray-700 pb-3 font-black text-xs uppercase tracking-widest text-gray-900 dark:text-white mb-4">
              <div className="col-span-1 hidden sm:block">{t("no")}</div>
              <div className="col-span-8 sm:col-span-6">{t("description")}</div>
              <div className="col-span-1 sm:col-span-2 text-right">{t("qty")}</div>
              <div className="col-span-3 text-right">{t("amount")}</div>
            </div>

            {/* Mock Line Items for Demo Rendering */}
            <div className="grid grid-cols-12 gap-4 border-b border-dashed border-gray-300 dark:border-gray-800 py-4 text-gray-900 dark:text-gray-200 font-semibold text-sm">
              <div className="col-span-1 hidden sm:block text-gray-500">01</div>
              <div className="col-span-8 sm:col-span-6 truncate pr-4">The Art of Clean Code Architecture</div>
              <div className="col-span-1 sm:col-span-2 text-right">1</div>
              <div className="col-span-3 text-right">৳850.00</div>
            </div>
            <div className="grid grid-cols-12 gap-4 border-b border-dashed border-gray-300 dark:border-gray-800 py-4 text-gray-900 dark:text-gray-200 font-semibold text-sm">
              <div className="col-span-1 hidden sm:block text-gray-500">02</div>
              <div className="col-span-8 sm:col-span-6 truncate pr-4">Introduction to Algorithms (Bundle)</div>
              <div className="col-span-1 sm:col-span-2 text-right">1</div>
              <div className="col-span-3 text-right">৳1250.00</div>
            </div>

            {/* Accounting Block */}
            <div className="flex flex-col items-end mt-10 space-y-3 text-gray-900 dark:text-gray-200">
              <div className="w-64 flex justify-between font-medium">
                <span className="text-gray-500 uppercase text-xs tracking-wider">{t("subtotal")}:</span>
                <span>৳2100.00</span>
              </div>
              <div className="w-64 flex justify-between font-medium">
                <span className="text-gray-500 uppercase text-xs tracking-wider">{t("shipping")}:</span>
                <span>৳60.00</span>
              </div>
              <div className="w-64 flex justify-between font-medium text-emerald-600 dark:text-emerald-400">
                <span className="uppercase text-xs tracking-wider">{t("discount")}:</span>
                <span>-৳210.00</span>
              </div>
              <div className="w-64 flex justify-between border-t-[3px] border-gray-900 dark:border-gray-700 pt-4 mt-4">
                <span className="font-black uppercase tracking-widest text-lg">{t("total")}:</span>
                <span className="font-black text-xl">৳1950.00</span>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center text-xs font-semibold text-gray-500 uppercase tracking-widest border-t-[3px] border-dashed border-gray-300 dark:border-gray-800 pt-8">
            <p className="mb-2">{t("thankYou")}</p>
            <p>{t("computerGenerated")}</p>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
