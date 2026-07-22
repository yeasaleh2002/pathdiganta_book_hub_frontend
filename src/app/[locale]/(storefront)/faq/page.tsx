"use client";

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function FAQPage() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: t("q1"),
      answer: t("a1")
    },
    {
      question: t("q2"),
      answer: t("a2")
    },
    {
      question: t("q3"),
      answer: t("a3")
    },
    {
      question: t("q4"),
      answer: t("a4")
    },
    {
      question: t("q5"),
      answer: t("a5")
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-16 sm:py-24 relative overflow-hidden px-4">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-sky-600/10 to-transparent dark:from-sky-900/20 pointer-events-none" />
      <div className="absolute top-40 right-0 w-96 h-96 bg-sky-500/10 dark:bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <main className="max-w-3xl mx-auto relative z-10">
        
        <header className="mb-16 text-center animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 dark:bg-sky-900/30 rounded-full mb-6">
            <HelpCircle className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span className="text-xs font-black text-sky-800 dark:text-sky-300 uppercase tracking-widest">{t("supportCenter")}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-6 leading-tight">
            {t("frequentlyAskedQuestions")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            {t("description")}
          </p>
        </header>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`bg-white dark:bg-[#121212] rounded-2xl border transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 ${
                  isOpen 
                    ? 'border-sky-300 dark:border-sky-700 shadow-md' 
                    : 'border-gray-200 dark:border-gray-800 shadow-sm hover:border-sky-200 dark:hover:border-sky-900/50 hover:shadow-md'
                }`}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="font-bold text-gray-900 dark:text-white text-lg tracking-tight">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isOpen ? 'bg-sky-100 dark:bg-sky-900/50' : 'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-sky-600 dark:text-sky-400' : 'text-gray-500 dark:text-gray-400'
                      }`} 
                    />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 font-medium leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4 mt-2 mx-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white dark:bg-[#121212] p-8 rounded-3xl border border-gray-200 dark:border-gray-800 text-center animate-in fade-in duration-1000 delay-500 shadow-sm">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">{t("stillHaveQuestions")}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
            {t("cantFindAnswer")}
          </p>
          <a 
            href="https://wa.me/8801633011001" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm"
          >
            {t("chatWithUs")}
          </a>
        </div>

      </main>
    </div>
  );
}
