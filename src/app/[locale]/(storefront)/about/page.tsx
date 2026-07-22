import { Metadata } from 'next';
import React from 'react';
import { BookOpen, Users, Globe, Target } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'About Us | Pathdigonto Book Hub',
  description: 'Learn about Pathdigonto Book Hub, our mission, vision, and dedication to delivering the best literary experiences across Bangladesh.',
  openGraph: {
    title: 'About Pathdigonto Book Hub',
    description: 'Empowering minds through the power of books across Bangladesh.',
  }
};

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24 animate-in fade-in duration-700">
      <header className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-6">{t("empoweringMinds")} <br/><span className="text-blue-600">{t("oneBookAtATime")}</span></h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">{t("description")}</p>
      </header>

      {/* Grid of Values */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/50">
          <BookOpen size={32} className="text-blue-600 mb-6" />
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">{t("vastCollection")}</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{t("vastCollectionDesc")}</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/50">
          <Globe size={32} className="text-emerald-600 mb-6" />
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">{t("nationwideReach")}</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{t("nationwideReachDesc")}</p>
        </div>
      </section>

      {/* Story */}
      <article className="prose prose-lg dark:prose-invert prose-blue mx-auto font-medium text-gray-700 dark:text-gray-300">
        <h2>{t("ourJourney")}</h2>
        <p>{t("ourJourneyDesc")}</p>
        
        <h2>{t("architectureOfTrust")}</h2>
        <p>{t("architectureOfTrustDesc")}</p>
      </article>
    </main>
  );
}
