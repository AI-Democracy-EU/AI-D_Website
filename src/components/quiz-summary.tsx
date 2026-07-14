import React from 'react';
import { useLocalQuiz } from '@/contexts/quiz-context';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowLeft } from 'lucide-react';
import { FaGraduationCap } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';

const LocalQuizSummary = () => {
  const { correctAnswers, wrongAnswers, userAnswers, quizData } = useLocalQuiz();
  const t = useTranslations('QuizSummary');
  function arraysEqual(arr1: string[], arr2: string[] | string) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
  }

  const totalQuestions = quizData.length;
  const correctPercentage = (correctAnswers / totalQuestions) * 100;

  let descriptionText = '';
  if (correctPercentage >= 70) {
    descriptionText = t('feedback.excellent');
  } else if (correctPercentage > 50) {
    descriptionText = t('feedback.good');
  } else {
    descriptionText = t('feedback.tryAgain');
  }

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center px-6 py-4 sm:w-10/12">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="mb-8 text-center text-3xl font-bold">{t('title')}</h1>

        <div className="mb-6 flex flex-col items-center">
          <div className="mb-4 flex items-center justify-center">
            <FaGraduationCap size={49} className="mr-4" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t('yourScore')}</p>
              <p className="text-4xl font-bold">
                {correctAnswers} <span className="text-muted-foreground">/ {totalQuestions}</span>
              </p>
            </div>
          </div>
          <div className="h-2 w-full max-w-md overflow-hidden rounded-full bg-primary/20">
            <div
              className="h-full bg-primary"
              style={{ width: `${(correctAnswers / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <p className="text-center text-lg">{descriptionText}</p>
      </div>

      <Table className="mt-14 overflow-x-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-1/12 text-lg sm:table-cell">
              {t('table.number')}
            </TableHead>
            <TableHead className="w-1/2 text-lg">{t('table.questionAndAnswer')}</TableHead>
            <TableHead className="w-1/2 text-lg">{t('table.yourAnswer')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userAnswers.map((answer, i) => {
            const question = quizData[i];
            return (
              <TableRow key={i}>
                <TableCell className="hidden text-xl font-medium sm:table-cell">{i + 1}</TableCell>
                <TableCell>
                  <h2 className="text-lg">{question.text}</h2>
                  <p className="text-lg opacity-60">{question.correctAnswer}</p>
                </TableCell>
                <TableCell className="text-lg">
                  <h2
                    className={
                      arraysEqual(answer.userAnswers, question.correctAnswer)
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  >
                    {answer.userAnswers}
                  </h2>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Link href=".">
        <Button className="mt-6 hover:bg-secondary hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToHome')}
        </Button>
      </Link>
    </div>
  );
};

export default LocalQuizSummary;
