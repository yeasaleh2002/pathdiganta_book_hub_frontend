import { Metadata } from 'next';
import React from 'react';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Privacy Policy | Pathdigonto Book Hub',
  description: 'Understand how Pathdigonto Book Hub safely collects, stores, and protects your personal data.',
};

export default function PrivacyPage() {
  const t = useTranslations("Privacy");

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24 animate-in fade-in duration-700">
      <header className="mb-16 border-b border-gray-200 dark:border-gray-800 pb-10 text-center sm:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">{t("privacyPolicy")}</h1>
        <p className="text-sm font-bold text-blue-600 dark:text-blue-500 uppercase tracking-widest">{t("lastUpdated")}</p>
      </header>

      <article className="prose prose-lg dark:prose-invert prose-blue max-w-none font-medium text-gray-700 dark:text-gray-300">
        <h2>{t("infoWeCollect")}</h2>
        <p>{t("infoWeCollectContent")}</p>

        <h2>{t("technicalTelemetry")}</h2>
        <p>{t("technicalTelemetryContent")}</p>

        <h2>{t("dataProtection")}</h2>
        <p>{t("dataProtectionContent")}</p>

        <h2>{t("paymentSecurity")}</h2>
        <p>{t("paymentSecurityContent")}</p>

        <h2>{t("contactDataController")}</h2>
        <p>{t("contactDataControllerContent")}</p>
      </article>
    </main>
  );
}
