import Navbar from '@/components/navbar';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import CourseContent from '@/components/genai-and-critical-ai/main';
import React from 'react';

function GenAiAndCriticalAiLiteracy({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Navigation.gen-ai-and-critical-ai-literacy');

  return (
    <div>
      <Navbar title={`AI.D - ${t('title')}`} />
      <CourseContent />
    </div>
  );
}

export default GenAiAndCriticalAiLiteracy;
