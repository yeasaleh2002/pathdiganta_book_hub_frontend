"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

export const LanguageSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "bn" ? "en" : "bn";
    startTransition(() => {
      router.replace(
        // @ts-ignore - next-intl navigation typing expects specific paths, but we pass generic pathname
        pathname, 
        { locale: nextLocale }
      );
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className="relative flex items-center w-[72px] h-8 bg-gray-200 dark:bg-gray-800 rounded-full p-1 cursor-pointer transition-colors shadow-inner disabled:opacity-50"
      title="Toggle Language (BN / EN)"
    >
      {/* Background text for the toggle */}
      <div className="absolute flex justify-between w-full px-2.5 text-[10px] font-black tracking-wider text-gray-400 dark:text-gray-500 select-none z-0 left-0">
        <span>BN</span>
        <span>EN</span>
      </div>
      
      {/* The sliding toggle thumb */}
      <div 
        className={`relative z-10 w-7 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md flex items-center justify-center text-[10px] font-black text-blue-600 dark:text-blue-400 transition-transform duration-300 ease-in-out ${
          locale === 'en' ? 'translate-x-[35px]' : 'translate-x-0'
        }`}
      >
        {locale === 'en' ? 'EN' : 'BN'}
      </div>
    </button>
  );
};
