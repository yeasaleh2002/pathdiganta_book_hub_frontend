import { Metadata } from 'next';
import React from 'react';
import { Lock, Eye, ShieldCheck, Truck, RefreshCcw, Database } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Pathdigonto Book Hub',
  description: 'Learn how Pathdigonto Book Hub protects your privacy, manages your data, and handles shipping and returns.',
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: <Lock className="w-6 h-6 text-indigo-500" />,
      title: "1. Data Collection & Privacy",
      content: "We collect minimal personal data necessary to process your orders and provide a personalized reading experience. This includes your name, shipping address, email, and browsing preferences. Your data is encrypted in transit and at rest."
    },
    {
      icon: <Database className="w-6 h-6 text-blue-500" />,
      title: "2. How We Use Your Data",
      content: "Your data is used strictly for order fulfillment, customer support, and platform improvements. We do not sell your personal information to third-party data brokers or marketing agencies."
    },
    {
      icon: <Truck className="w-6 h-6 text-emerald-500" />,
      title: "3. Shipping & Delivery Policy",
      content: "We offer nationwide shipping across Bangladesh. Orders are typically processed within 24 hours. Standard delivery takes 2-4 business days within Dhaka and 3-7 business days outside Dhaka. You will receive a tracking link via email once your books are dispatched."
    },
    {
      icon: <RefreshCcw className="w-6 h-6 text-rose-500" />,
      title: "4. Returns & Refunds Policy",
      content: "We want you to be perfectly satisfied with your books. We accept returns within 7 days of delivery for books damaged in transit or incorrect items. Returned items must be in their original condition. Refunds are processed within 5-7 business days to your original payment method."
    },
    {
      icon: <Eye className="w-6 h-6 text-amber-500" />,
      title: "5. Your Rights",
      content: "You have the right to request access to your personal data, request correction of any inaccuracies, and request deletion of your account and associated data by contacting our support team."
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
            <span className="text-xs font-black text-indigo-800 dark:text-indigo-300 uppercase tracking-widest">Privacy & Policies</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-6 leading-tight">
            Privacy & Operations
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Transparency is our priority. Discover how we protect your data, handle your shipments, and manage returns.
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
            Last Updated: July 14, 2026 • Pathdigonto Book Hub
          </p>
        </div>
      </main>
    </div>
  );
}
