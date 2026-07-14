import { Accessibility, Activity, Copyleft, Ratio, Type, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const features = [
  {
    icon: <Ratio size={32} />,
    key: 'responsiveDesign',
  },
  {
    icon: <Accessibility size={32} />,
    key: 'accessibility',
  },
  {
    icon: <User size={32} />,
    key: 'customizable',
  },
  {
    icon: <Type size={32} />,
    key: 'typescriptSupport',
  },
  {
    icon: <Activity size={32} />,
    key: 'performance',
  },
  {
    icon: <Copyleft size={32} />,
    key: 'openSource',
  },
];

export default function Features() {
  const t = useTranslations('Index.features');

  return (
    <>
      {features.map((feature) => (
        <div
          className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-700"
          key={feature.key}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <span className="mr-4 text-gray-500 dark:text-gray-300">{feature.icon}</span>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {t(`${feature.key}.title`)}
              </h3>
            </div>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-300">
              {t(`${feature.key}.description`)}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
