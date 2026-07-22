import { Metadata } from 'next';
import React from 'react';
import { Shield, BookOpen, AlertCircle, ShoppingBag, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Pathdigonto Book Hub',
  description: 'Read the terms and conditions for utilizing the Pathdigonto Book Hub platform and its associated services.',
};

export default function TermsPage() {
  const sections = [
    {
      icon: <BookOpen className="w-6 h-6 text-blue-500" />,
      title: "1. Acceptance of Terms",
      content: "By accessing or using the Pathdigonto Book Hub digital platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not access the service."
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
      title: "2. User Accounts & Security",
      content: "Users must provide accurate, current, and complete information during the registration process. You are entirely responsible for maintaining the confidentiality of your account password and OTP mechanisms. Pathdigonto holds zero liability for breached accounts resulting from poor client-side security."
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-500" />,
      title: "3. Intellectual Property Rights",
      content: "All content, designs, texts, graphics, and interfaces on this platform are the property of Pathdigonto Book Hub and are protected by international copyright laws. Unrestrained crawling, algorithmic botting, or data scraping of our inventory matrices is strictly prohibited."
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-amber-500" />,
      title: "4. Purchasing & Pricing",
      content: "All prices are explicitly listed in Bangladeshi Taka (৳). We reserve the right to refuse or cancel any orders resulting from typographical pricing errors in the database, even if the structural checkout sequence was completed. Cash on Delivery is subject to verification."
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-rose-500" />,
      title: "5. Service Modifications",
      content: "We reserve the right to modify or discontinue our service at any time without notice. We shall not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the service."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-16 sm:py-24 relative overflow-hidden px-4">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-600/10 to-transparent dark:from-blue-900/20 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl" />
      
      <main className="max-w-4xl mx-auto relative z-10">
        <header className="mb-16 text-center animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span className="text-xs font-black text-blue-800 dark:text-blue-300 uppercase tracking-widest">Legal Document</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-6 leading-tight">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Please read these terms carefully before using our platform. They outline your rights and responsibilities.
          </p>
        </header>

        <div className="space-y-6">
          {sections.map((section, idx) => (
            <div 
              key={idx} 
              className="group bg-white dark:bg-[#121212] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8"
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
