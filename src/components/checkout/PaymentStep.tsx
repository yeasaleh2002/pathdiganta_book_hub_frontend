"use client";

import React, { useState } from 'react';
import { CreditCard, Truck, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const PaymentStep = ({ onComplete }: { onComplete: (method: string) => void }) => {
  const [method, setMethod] = useState<'COD' | 'ONLINE'>('COD');
  const t = useTranslations("Checkout");

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
        <CreditCard className="text-blue-600" /> {t("paymentMethod")}
      </h2>

      <div className="flex flex-col gap-4 mb-8">
        
        {/* COD Block */}
        <label className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${method === 'COD' ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 shadow-[0_0_0_1px_rgba(37,99,235,1)]' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-gray-600'}`}>
          <div className="pt-0.5">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'COD' ? 'border-blue-600' : 'border-gray-300 dark:border-gray-600'}`}>
               {method === 'COD' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
            </div>
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-lg">
              {t("cod")} <Truck size={18} className="text-gray-500" />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">{t("codDesc")}</p>
            {method === 'COD' && (
              <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 text-xs font-semibold p-3 rounded-lg flex gap-2 border border-amber-200 dark:border-amber-800/50">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{t("codWarning")}</span>
              </div>
            )}
          </div>
        </label>



      </div>

      <div className="flex justify-end border-t border-gray-100 dark:border-gray-800 pt-6">
        <button 
          onClick={() => onComplete(method)} 
          className="w-full md:w-auto px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-xl transition-all shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:-translate-y-0.5"
        >
          {t("confirmOrder")}
        </button>
      </div>
    </div>
  );
};
