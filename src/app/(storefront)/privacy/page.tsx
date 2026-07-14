import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Pathdigonto Book Hub',
  description: 'Understand how Pathdigonto Book Hub safely collects, stores, and protects your personal data.',
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24 animate-in fade-in duration-700">
      <header className="mb-16 border-b border-gray-200 dark:border-gray-800 pb-10 text-center sm:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-sm font-bold text-blue-600 dark:text-blue-500 uppercase tracking-widest">Last Updated: July 14, 2026</p>
      </header>

      <article className="prose prose-lg dark:prose-invert prose-blue max-w-none font-medium text-gray-700 dark:text-gray-300">
        <h2>1. Information We Collect</h2>
        <p>We collect structural data directly provided by you (Account Names, Emails, Phone Numbers, and Physical Shipping Addresses) specifically necessary to execute the e-commerce fulfillment pipeline.</p>

        <h2>2. Technical Telemetry & Cookies</h2>
        <p>To optimize platform performance, we utilize strict cookies and local browser storage (such as Zustand persisting cart states). This purely captures session metadata to prevent Cart Abandonment and authorize authenticated pathways.</p>

        <h2>3. Data Protection Mechanisms</h2>
        <p>Your personal information is heavily guarded behind modern cryptographic standards. We utilize JWT (JSON Web Tokens) sent over secure HTTPS environments. We explicitly do <strong>NOT</strong> sell your structural telemetry data to external marketing agencies.</p>

        <h2>4. Payment Security Integrations</h2>
        <p>Pathdigonto operates strictly via Cash on Delivery (COD/CCD) and secure localized Mobile Financial Service (MFS) pathways. We do not store any sensitive credit card matrices on our internal servers.</p>

        <h2>5. Contact the Data Controller</h2>
        <p>For inquiries regarding personal data deletion or modification limits, contact our technical security team immediately at <strong>privacy@pathdigonto.com</strong>.</p>
      </article>
    </main>
  );
}
