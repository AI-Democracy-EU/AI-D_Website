import React from 'react';
import LocalCarouselQuiz from '@/components/quiz-carousel';
import { CarouselItem } from '@/components/ui/carousel';
import { LocalQuizProvider, Quiz } from '@/contexts/quiz-context';
import { CarouselContentItem } from './carousel-content-item';

export interface QuizCarouselContentItem extends CarouselContentItem {
  quizData: Quiz[];
  quizName: string;
}

export const CarouselQuizSlide: React.FC<QuizCarouselContentItem> = ({
  src,
  alt,
  listHeadline,
  listContent,
  quizData,
  quizName,
  markdownSource,
}) => {
  return (
    <CarouselItem className="mt-4 overflow-hidden">
      <div className="relative">
        <LocalQuizProvider quizData={quizData}>
          <div className="h-full overflow-y-auto p-5 text-white">
            <LocalCarouselQuiz
              quizName={quizName}
              quizData={quizData}
              src={src}
              alt={alt}
              listHeadline={listHeadline}
              listContent={listContent}
              markdownSource={markdownSource}
            />
          </div>
        </LocalQuizProvider>
      </div>
    </CarouselItem>
  );
};
