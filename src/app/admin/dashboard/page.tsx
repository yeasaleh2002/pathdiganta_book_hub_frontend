"use client";

import React from 'react';
import { TrendingUp, DollarSign, Users, ShoppingCart, ArrowUpRight, ArrowDownRight, Target, Activity, Package } from 'lucide-react';

const StatCard = ({ title, value, trend, trendValue, icon, alert = false }: any) => (
  <div className="bg-white dark:bg-[#121212] border-2 border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 transform group-hover:scale-110 transition-transform duration-500 ${alert ? 'bg-red-500' : 'bg-blue-500'}`}></div>
    <div className="flex justify-between items-start mb-6">
      <div className={`p-4 rounded-2xl ${alert ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-500' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'}`}>
        {icon}
      </div>
      {trend === 'up' ? (
        <span className="flex items-center gap-1 text-xs font-black tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-xl border border-emerald-100 dark:border-emerald-800">
          <ArrowUpRight size={16} strokeWidth={3} /> {trendValue}
        </span>
      ) : (
        <span className="flex items-center gap-1 text-xs font-black tracking-wider text-red-600 bg-red-50 dark:bg-red-900/30 px-3 py-1.5 rounded-xl border border-red-100 dark:border-red-800">
          <ArrowDownRight size={16} strokeWidth={3} /> {trendValue}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs mb-1.5">{title}</h3>
      <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{value}</p>
    </div>
  </div>
);

export default function AdminDashboardPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Metrics Analytics</h1>
        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-widest">Real-time performance overview of the Pathdigonto engine.</p>
      </div>

      {/* KPI Overview Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today's Sales" value="৳ 45,230" trend="up" trendValue="+14.2%" icon={<DollarSign size={24} />} />
        <StatCard title="Monthly Sales" value="৳ 1.2M" trend="up" trendValue="+8.1%" icon={<TrendingUp size={24} />} />
        <StatCard title="Total Revenue" value="৳ 14.5M" trend="up" trendValue="+22.4%" icon={<Target size={24} />} />
        <StatCard title="Profit Margins" value="28.4%" trend="down" trendValue="-1.2%" icon={<Activity size={24} />} />
        
        <StatCard title="Unique Visitors" value="12,405" trend="up" trendValue="+5.4%" icon={<Users size={24} />} />
        <StatCard title="Conversion Rate" value="3.8%" trend="up" trendValue="+0.6%" icon={<ShoppingCart size={24} />} />
        <StatCard title="Cart Abandonment" value="64.2%" trend="down" trendValue="-4.1%" icon={<ShoppingCart size={24} />} alert={true} />
        <StatCard title="Active Orders" value="342" trend="up" trendValue="+12" icon={<Package size={24} />} />
      </div>

      {/* Tables Row Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Top Selling Books Table */}
        <div className="bg-white dark:bg-[#121212] border-2 border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 md:p-8 border-b-2 border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h3 className="font-black text-xl text-gray-900 dark:text-white tracking-tight">Top Selling Books</h3>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-gray-50/80 dark:bg-gray-900/80 border-b-2 border-gray-100 dark:border-gray-800">
                  <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500">Book Title</th>
                  <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-right">Units Sold</th>
                  <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-50 dark:divide-gray-800/50 text-sm">
                {[
                  { title: 'The Art of Clean Code', sold: 412, rev: '34,500' },
                  { title: 'Data Structures & Algorithms', sold: 389, rev: '42,000' },
                  { title: 'Paradoxical Sajid', sold: 345, rev: '12,500' },
                  { title: 'Atomic Habits (Bengali)', sold: 298, rev: '11,200' },
                  { title: 'System Design Interview', sold: 215, rev: '54,000' },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors group">
                    <td className="px-8 py-5 font-bold text-gray-900 dark:text-gray-200 group-hover:text-blue-600 transition-colors cursor-pointer">{item.title}</td>
                    <td className="px-8 py-5 text-right font-bold text-gray-600 dark:text-gray-400">{item.sold}</td>
                    <td className="px-8 py-5 text-right font-black text-emerald-600 dark:text-emerald-500">৳ {item.rev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Frequent Search Keywords Table */}
        <div className="bg-white dark:bg-[#121212] border-2 border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 md:p-8 border-b-2 border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h3 className="font-black text-xl text-gray-900 dark:text-white tracking-tight">Frequent Search Keywords</h3>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest">Export CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-gray-50/80 dark:bg-gray-900/80 border-b-2 border-gray-100 dark:border-gray-800">
                  <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500">Keyword Query</th>
                  <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-right">Search Volume</th>
                  <th className="px-8 py-5 text-xs uppercase tracking-widest font-black text-gray-500 text-right">Found Results</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-50 dark:divide-gray-800/50 text-sm">
                {[
                  { term: 'Islamic Books', vol: '12.4k', res: '840' },
                  { term: 'Programming', vol: '9.2k', res: '320' },
                  { term: 'Arif Azad', vol: '7.8k', res: '12', warn: true },
                  { term: 'Next.js 14', vol: '4.5k', res: '8', warn: true },
                  { term: 'Novel', vol: '4.1k', res: '1205' },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors">
                    <td className="px-8 py-5 font-bold text-gray-900 dark:text-gray-200">"{item.term}"</td>
                    <td className="px-8 py-5 text-right font-black text-gray-600 dark:text-gray-400">{item.vol}</td>
                    <td className="px-8 py-5 text-right font-black">
                      {item.warn ? (
                        <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500 px-3 py-1 rounded-full text-xs">{item.res}</span>
                      ) : (
                        <span className="text-gray-500">{item.res}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
