import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headset } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const UspFeatureGrid = () => {
  const t = useTranslations("USP");
  
  const features = [
    {
      icon: <Truck size={32} className="text-blue-600 dark:text-blue-400" />,
      title: t("deliveryTitle"),
      desc: t("deliveryDesc")
    },
    {
      icon: <ShieldCheck size={32} className="text-blue-600 dark:text-blue-400" />,
      title: t("originalTitle"),
      desc: t("originalDesc")
    },
    {
      icon: <RefreshCw size={32} className="text-blue-600 dark:text-blue-400" />,
      title: t("returnTitle"),
      desc: t("returnDesc")
    },
    {
      icon: <Headset size={32} className="text-blue-600 dark:text-blue-400" />,
      title: t("supportTitle"),
      desc: t("supportDesc")
    }
  ];

  return (
    <section className="w-full py-12 bg-white dark:bg-gray-950 border-t border-b border-gray-100 dark:border-gray-900 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4 transition-transform hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-[250px]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
