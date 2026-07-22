import { Metadata } from 'next';
import React from 'react';
import { Briefcase, Rocket, Sparkles, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers | Pathdigonto Book Hub',
  description: 'Join the Pathdigonto team and help us ignite minds through the power of books.',
};

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-16 sm:py-24 relative overflow-hidden px-4 flex flex-col justify-center">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-purple-600/10 to-transparent dark:from-purple-900/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <main className="max-w-3xl mx-auto relative z-10 text-center w-full">
        
        <div className="animate-in fade-in zoom-in-95 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-black text-purple-800 dark:text-purple-300 uppercase tracking-widest">Join Our Mission</span>
          </div>

          <div className="relative mx-auto w-24 h-24 bg-white dark:bg-[#121212] rounded-3xl shadow-xl flex items-center justify-center mb-8 border border-purple-100 dark:border-purple-900/50 group">
            <div className="absolute inset-0 bg-purple-500/20 dark:bg-purple-500/10 rounded-3xl transform group-hover:scale-110 transition-transform duration-500" />
            <Briefcase className="w-10 h-10 text-purple-600 dark:text-purple-400 relative z-10 group-hover:-translate-y-1 transition-transform duration-500" />
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-6 leading-tight">
            Build the future of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              reading in Bangladesh.
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium mb-12">
            At Pathdigonto Book Hub, we're on a mission to deliver knowledge to every doorstep. We look for passionate, driven individuals who love books and technology as much as we do.
          </p>
        </div>

        <div className="bg-white dark:bg-[#121212] p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Rocket className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            We are not currently hiring.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 font-medium mb-8 max-w-lg mx-auto">
            Our team is currently full, but we're always growing! If you believe you'd be a great fit for our future, feel free to drop your resume so we can reach out when a position opens up.
          </p>

          <a 
            href="mailto:pathdigantabookhub@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 hover:scale-105 transition-all shadow-lg shadow-gray-900/20 dark:shadow-white/10"
          >
            <Send className="w-5 h-5" />
            Send Resume
          </a>
        </div>

      </main>
    </div>
  );
}
