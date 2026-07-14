import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/navbar';
import CourseContent from '@/components/ai-tutors-page/main';
import React from 'react';

function AiTutorsBetweenEqualityAndInequality({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Navigation.ai-tutors-between-equality-and-inequality');

  return (
    <div>
      <Navbar title={`AI.D - ${t('title')}`} />
      <CourseContent />
    </div>
  );
}

export default AiTutorsBetweenEqualityAndInequality;
