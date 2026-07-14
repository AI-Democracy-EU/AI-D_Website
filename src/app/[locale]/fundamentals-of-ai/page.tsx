import React from 'react';
// eslint-disable-next-line camelcase
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/navbar';
import CourseContent from '@/components/fundamentals-of-ai-page/main';

function FundamentalsOfAI({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Navigation.fundamentals-of-ai');
  return (
    <div>
      <Navbar title={`AI.D - ${t('title')}`} />
      <CourseContent />
    </div>
  );
}

export default FundamentalsOfAI;
