import { useTranslations } from 'next-intl';
import React from 'react';
// eslint-disable-next-line camelcase
import { unstable_setRequestLocale } from 'next-intl/server';
import MemoryGame from '@/components/memory-game';
import Navbar from '@/components/navbar';

export default function MemoryQuiz({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('LandingPage');

  return (
    <div>
      <Navbar title={`${t('title')}`} />
      <div className="lg:container sm:mt-9 py-8">
        <MemoryGame />
      </div>
    </div>
  );
}
