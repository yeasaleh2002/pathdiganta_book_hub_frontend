import React from 'react';
import { Gift, Zap, ShieldCheck } from 'lucide-react';

export const RewardsTab = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2 mb-8">
        <Gift className="text-amber-500" /> Loyalty & Rewards
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
          <Gift size={160} className="absolute -bottom-8 -right-8 opacity-20 transform -rotate-12" />
          <p className="font-bold text-amber-100 mb-2 uppercase tracking-widest text-xs">Available Balance</p>
          <div className="text-6xl font-black mb-4 tracking-tight">450 <span className="text-3xl font-bold opacity-80">pts</span></div>
          <p className="text-sm font-semibold mb-8 opacity-90 max-w-[200px] leading-relaxed">Equivalent to ৳45.00 discount on your next checkout.</p>
          <button className="px-8 py-3.5 bg-white text-orange-600 font-black rounded-xl shadow-sm hover:scale-105 transition-transform">
            Redeem Points Now
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm flex flex-col justify-center space-y-6">
          
          <div className="flex items-start gap-5">
            <div className="p-3.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="font-black text-gray-900 dark:text-white text-lg">How to earn points?</h3>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                Earn exactly 10 points for every ৳100 you spend on Pathdigonto books. Points are instantly credited upon delivery confirmation.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>

          <div className="flex items-start gap-5">
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-black text-gray-900 dark:text-white text-lg">Review Multipliers</h3>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                Leaving a verified, written review on a book you've purchased grants a flat 20 bonus points directly to your wallet!
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
