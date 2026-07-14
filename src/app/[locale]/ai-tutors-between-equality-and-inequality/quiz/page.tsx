import { unstable_setRequestLocale } from 'next-intl/server';
import { LocalQuizProvider } from '@/contexts/quiz-context';
import LocalQuiz from '@/components/quiz-component';
import React from 'react';

export default function Detail({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);

  // Dynamically import quiz data based on locale
  const quizData = require(`@/data/${locale}/w4-quiz-data.json`);

  return (
    <LocalQuizProvider quizData={quizData}>
      <LocalQuiz quizName="Quiz4" />
    </LocalQuizProvider>
  );
}
