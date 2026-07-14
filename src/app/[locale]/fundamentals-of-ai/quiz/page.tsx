import React from 'react';
// eslint-disable-next-line camelcase
import { unstable_setRequestLocale } from 'next-intl/server';
import { LocalQuizProvider } from '@/contexts/quiz-context';
import LocalQuiz from '@/components/quiz-component';

export default function Detail({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);

  // Dynamically import quiz data based on locale
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const quizData = require(`@/data/${locale}/w1-quiz-data.json`);

  return (
    <LocalQuizProvider quizData={quizData}>
      <LocalQuiz quizName="Quiz1" />
    </LocalQuizProvider>
  );
}
