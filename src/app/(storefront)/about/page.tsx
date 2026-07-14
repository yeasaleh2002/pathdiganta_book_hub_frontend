import { Metadata } from 'next';
import React from 'react';
import { BookOpen, Users, Globe, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Pathdigonto Book Hub',
  description: 'Learn about Pathdigonto Book Hub, our mission, vision, and dedication to delivering the best literary experiences across Bangladesh.',
  openGraph: {
    title: 'About Pathdigonto Book Hub',
    description: 'Empowering minds through the power of books across Bangladesh.',
  }
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24 animate-in fade-in duration-700">
      <header className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-6">Empowering Minds, <br/><span className="text-blue-600">One Book at a Time.</span></h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">Pathdigonto Book Hub is Bangladesh's premier literary destination, committed to bridging the gap between exceptional authors and passionate readers through cutting-edge technology.</p>
      </header>

      {/* Grid of Values */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/50">
          <BookOpen size={32} className="text-blue-600 mb-6" />
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">Vast Collection</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Curating the finest selection of Islamic literature, technical programming guides, and best-selling fiction from local and international publishers.</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/50">
          <Globe size={32} className="text-emerald-600 mb-6" />
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">Nationwide Reach</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Delivering knowledge to every corner of Bangladesh securely and rapidly, ensuring no reader is left behind due to geography.</p>
        </div>
      </section>

      {/* Story */}
      <article className="prose prose-lg dark:prose-invert prose-blue mx-auto font-medium text-gray-700 dark:text-gray-300">
        <h2>Our Journey</h2>
        <p>Founded in 2026, Pathdigonto Book Hub began as a small initiative to bring high-quality books to students and professionals. Today, it stands as a robust architectural platform handling thousands of secure transactions daily.</p>
        
        <h2>The Architecture of Trust</h2>
        <p>We built our systems utilizing the latest advancements in Next.js React Frameworks, ensuring military-grade security for your data, instantaneous search experiences, and a seamless checkout pipeline that respects your time.</p>
      </article>
    </main>
  );
}
