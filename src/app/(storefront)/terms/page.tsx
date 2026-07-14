import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Terms of Service | Pathdigonto Book Hub',
  description: 'Read the terms and conditions for utilizing the Pathdigonto Book Hub platform and its associated services.',
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24 animate-in fade-in duration-700">
      <header className="mb-16 border-b border-gray-200 dark:border-gray-800 pb-10 text-center sm:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">Terms of Service</h1>
        <p className="text-sm font-bold text-blue-600 dark:text-blue-500 uppercase tracking-widest">Last Updated: July 14, 2026</p>
      </header>

      <article className="prose prose-lg dark:prose-invert prose-blue max-w-none font-medium text-gray-700 dark:text-gray-300">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using the Pathdigonto Book Hub digital platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

        <h2>2. User Accounts & Security</h2>
        <p>Users must provide accurate, current, and complete information during the registration process. You are entirely responsible for maintaining the confidentiality of your account password and OTP mechanisms. Pathdigonto holds zero liability for breached accounts resulting from poor client-side security.</p>

        <h2>3. Intellectual Property Rights</h2>
        <p>All content, designs, texts, graphics, and interfaces on this platform are the property of Pathdigonto Book Hub and are protected by international copyright laws. Unrestrained crawling, algorithmic botting, or data scraping of our inventory matrices is strictly prohibited.</p>

        <h2>4. Purchasing & Pricing Logistics</h2>
        <p>All prices are explicitly listed in Bangladeshi Taka (৳). We reserve the right to refuse or cancel any orders resulting from typographical pricing errors in the database, even if the structural checkout sequence was completed.</p>

        <h2>5. Returns & Refunds</h2>
        <p>We offer a strict 7-day return policy for physically damaged transit goods. Digital products or opened sealed bundles are non-refundable.</p>
      </article>
    </main>
  );
}
