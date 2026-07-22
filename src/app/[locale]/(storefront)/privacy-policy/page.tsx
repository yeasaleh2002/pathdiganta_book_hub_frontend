import { Metadata } from 'next';
import React from 'react';
import { Lock, Eye, ShieldCheck, Truck, RefreshCcw, Database } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Pathdigonto Book Hub',
  description: 'Learn how Pathdigonto Book Hub protects your privacy, manages your data, and handles shipping and returns.',
};

import { useTranslations } from 'next-intl';

export default function PrivacyPolicyPage() {
  const t = useTranslations("PrivacyPolicy");

  const sections = [
    {
      icon: <Lock className="w-6 h-6 text-indigo-500" />,
      title: t("s1Title"),
      content: t("s1Desc")
    },
    {
      icon: <Database className="w-6 h-6 text-blue-500" />,
      title: t("s2Title"),
      content: t("s2Desc")
    },
    {
      icon: <Truck className="w-6 h-6 text-emerald-500" />,
      title: t("s3Title"),
      content: t("s3Desc")
    },
    {
      icon: <RefreshCcw className="w-6 h-6 text-rose-500" />,
      title: t("s4Title"),
      content: t("s4Desc")
    },
    {
      icon: <Eye className="w-6 h-6 text-amber-500" />,
      title: t("s5Title"),
      content: t("s5Desc")
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-16 sm:py-24 relative overflow-hidden px-4">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-600/10 to-transparent dark:from-indigo-900/20 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl" />
      
      <main className="max-w-4xl mx-auto relative z-10">
        <header className="mb-16 text-center animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-black text-indigo-800 dark:text-indigo-300 uppercase tracking-widest">{t("privacyOps")}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-6 leading-tight">
            {t("privacyOps")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            {t("privacyDesc")}
          </p>
        </header>

        <div className="space-y-6">
          {sections.map((section, idx) => (
            <div 
              key={idx} 
              className="group bg-white dark:bg-[#121212] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-start gap-5">
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-gray-100 dark:border-gray-800">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-in fade-in duration-1000 delay-1000">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-500">
            {t("lastUpdated")}
          </p>
        </div>
      </main>
    </div>
  );
}
