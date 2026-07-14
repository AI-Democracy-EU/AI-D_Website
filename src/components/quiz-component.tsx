'use client';

import React from 'react';
import { CircleCheck, CircleX, MoveLeft, MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';
import BreadcrumbComponent from '@/components/breadcrumb';
import { useLocalQuiz } from '@/contexts/quiz-context';
import { Link, usePathname } from '@/navigation';
import LocalQuizSummary from '@/components/quiz-summary';

export default function LocalQuiz({ quizName }: { quizName: string }) {
  const t = useTranslations(quizName);
  const pathname = usePathname();
  const {
    currentQuizIndex,
    selectedAnswers,
    correctAnswers,
    wrongAnswers,
    quizFinished,
    quizData,
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
      <>
        <Navbar title="" />
        <LocalQuizSummary />
      </>
    );
  }

  return (
    <>
      <Navbar title={t('title')} />
      <div className="mx-auto flex max-w-screen-lg flex-col justify-center p-5 text-white">
        <section className="w-full rounded-lg text-center shadow-none">
          <BreadcrumbComponent />
          <div className="mb-5 flex flex-col items-center justify-between sm:flex-row">
            <span className="text-2xl text-cableBlack sm:text-3xl">
              {t('question')} {currentQuizIndex + 1} / {quizData.length}
            </span>
            <div className="mt-4 flex items-center text-cableBlack sm:mt-0">
              <Button className="group w-full justify-center rounded-lg bg-white p-2 text-sm font-normal text-primary shadow hover:bg-white">
                <CircleCheck color="green" />
                <span className="mb-1 ml-1 text-xl sm:text-2xl">{correctAnswers}</span>
                <div className="mx-2 h-6 border-l border-gray-400" />
                <span className="mb-1 mr-1 text-xl sm:text-2xl">{wrongAnswers}</span>
                <CircleX color="red" />
              </Button>
            </div>
          </div>
          <section>
            <h1 className="mb-5 w-full items-center rounded-md bg-primary p-6 text-center text-lg font-bold text-white sm:p-10 sm:text-2xl">
              {currentQuiz.text}
            </h1>
            {/* Answer Buttons */}
            <div className="mt-4 w-auto text-left text-lg">
              {currentQuiz.options.map((option, index) => (
                <Button
                  key={index}
                  className={`group mb-5 w-full justify-start rounded-lg p-1 text-xs font-normal sm:p-10 md:text-sm ${
                    selectedAnswers.includes(option)
                      ? 'bg-primary text-white'
                      : 'bg-white text-cableBlack'
                  } h-14 shadow`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  <span id="letter" className="me-4 rounded-md px-2 py-1">
                    {String.fromCharCode(65 + index)})
                  </span>
                  <span id="answer" className="text-wrap text-left">
                    {option}
                  </span>
                </Button>
              ))}
            </div>
          </section>
          <div className="mt-10 flex flex-col justify-between sm:flex-row">
            <Link href={`/${pathname.split('/')[1]}`}>
              <Button className="flex w-full items-center p-4 text-base font-bold hover:bg-primary/90 active:bg-primary/80 sm:p-6">
                <MoveLeft className="mr-2" />
                {t('backToCourse')}
              </Button>
            </Link>
            <Button
              className="mt-4 flex items-center p-4 text-base font-bold hover:bg-primary/90 active:bg-primary/80 sm:mt-0 sm:p-6"
              onClick={handleNextQuestion}
              disabled={selectedAnswers.length === 0}
            >
              {t('next')}
              <MoveRight className="ml-2" />
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
