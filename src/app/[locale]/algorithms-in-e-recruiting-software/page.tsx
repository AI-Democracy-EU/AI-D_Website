import Navbar from '@/components/navbar';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import CourseContent from '@/components/algorithms-in-recruting/main';
import React from 'react';

function AiTutorsBetweenEqualityAndInequality({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Navigation.algorithms-in-e-recruiting-software');

  return (
    <div>
      <Navbar title={`AI.D - ${t('title')}`} />
      <CourseContent />
    </div>
  );
}

export default AiTutorsBetweenEqualityAndInequality;
