'use client';

import React from 'react';
import { CircleCheck, CircleX, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalQuiz } from '@/contexts/quiz-context';
import { useTranslations } from 'next-intl';
import LocalEmbeddedQuizSummary from './embedded-quiz-summary';
import { ScrollArea } from './ui/scroll-area';
import { QuizCarouselContentItem } from './webinar/carousel-quiz-slide';

const LocalCarouselQuiz: React.FC<QuizCarouselContentItem> = ({
  src,
  alt,
  listHeadline,
  listContent,
  quizName,
  quizData,
}) => {
  // export default function LocalCarouselQuiz() {
  const t = useTranslations(quizName);
  const quizDataI18N = t.raw('questions');
  const {
    currentQuizIndex,
    selectedAnswers,
    correctAnswers,
    wrongAnswers,
    quizFinished,
    // quizData,
    dispatch,
  } = useLocalQuiz();

  const currentQuiz = quizData[currentQuizIndex];

  const handleAnswerSelect = (answer: string) => {
    dispatch({ type: 'TOGGLE_SELECTED_ANSWER', payload: answer });
  };

  const handleNextQuestion = () => {
    if (selectedAnswers.length > 0) {
      dispatch({
        type: 'VALIDATE_ANSWER',
        payload: {
          question: currentQuiz.text,
          correctAnswer: currentQuiz.correctAnswer,
          userAnswers: selectedAnswers,
        },
      });

      if (currentQuizIndex < quizData.length - 1) {
        dispatch({ type: 'NEXT_QUESTION' });
      } else {
        dispatch({ type: 'FINISH_QUIZ' });
      }
    }
  };

  if (quizFinished) {
    return (
      <ScrollArea className="h-[95vh] w-full max-w-4xl overflow-hidden">
        <LocalEmbeddedQuizSummary />
      </ScrollArea>
    );
  }

  return (
    <div className="flex flex-col justify-center text-cableBlack">
      <section className="w-full rounded-lg text-center shadow-none">
        <div className="mb-3 flex flex-col items-center justify-between sm:flex-row">
          <span className="text-xl sm:text-2xl">
            {t('questionNumber', {
              current: currentQuizIndex + 1,
              total: quizDataI18N.length,
            })}
          </span>
          <div className="mt-2 flex items-center sm:mt-0">
            <Button className="group w-full justify-center rounded-lg bg-white p-1 text-sm font-normal text-primary shadow hover:bg-white">
              <CircleCheck color="green" size={16} />
              <span className="ml-1 text-lg">{correctAnswers}</span>
              <div className="mx-1 h-4 border-l border-gray-400" />
              <span className="mr-1 text-lg">{wrongAnswers}</span>
              <CircleX color="red" size={16} />
            </Button>
          </div>
        </div>
        <section>
          <h1 className="mb-3 w-full items-center rounded-md bg-primary p-3 text-center text-base font-bold text-white sm:p-4 sm:text-lg">
            {quizDataI18N[currentQuizIndex].text}
          </h1>
          <div className="mt-2 w-auto text-left">
            { quizDataI18N.options }

          </div>
        </section>
        <div className="mt-4 flex justify-end">
          <Button
            className="flex items-center p-2 text-sm font-bold hover:bg-primary/90 active:bg-primary/80"
            onClick={handleNextQuestion}
            disabled={selectedAnswers.length === 0}
          >
            {t('nextButton')}
            <MoveRight className="ml-1" size={16} />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LocalCarouselQuiz;
