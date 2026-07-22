"use client";

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: "How long does shipping and delivery take?",
    answer: "We offer nationwide shipping across Bangladesh. Orders are typically processed within 24 hours. Standard delivery takes 2-4 business days within Dhaka and 3-7 business days outside Dhaka. You will receive a tracking link via email once your books are dispatched."
  },
  {
    question: "What is your return and refund policy?",
    answer: "We want you to be perfectly satisfied with your books. We accept returns within 7 days of delivery for books damaged in transit or incorrect items. Returned items must be in their original condition. Refunds are processed within 5-7 business days to your original payment method."
  },
  {
    question: "Do you offer Cash on Delivery (COD)?",
    answer: "Yes! We fully support Cash on Delivery (COD) for all orders across Bangladesh. You can pay securely when the books arrive at your doorstep."
  },
  {
    question: "Are the books original?",
    answer: "Absolutely. As a dedicated single-vendor bookstore, we source directly from publishers and authorized distributors to guarantee 100% authentic and original books."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is dispatched, you can log into your account dashboard to view the real-time status of your delivery. You will also receive email notifications at every step."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            <span className="text-xs font-black text-sky-800 dark:text-sky-300 uppercase tracking-widest">Support Center</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-6 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Find answers to common questions about our services, shipping, returns, and more.
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
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Still have questions?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
            Can't find the answer you're looking for? Please chat to our friendly team.
          </p>
          <a 
            href="https://wa.me/8801633011001" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm"
          >
            Chat with us
          </a>
        </div>

      </main>
    </div>
  );
}
