'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  QuizCarouselContentItem,
  CarouselQuizSlide,
} from '@/components/webinar/carousel-quiz-slide';

import {
  InstagramCarouselProps,
  CarouselStandardSlide,
} from '@/components/webinar/carousel-content-item';

export function InstagramCarousel({ carouselContent }: InstagramCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [, setCount] = useState(0);

  const searchParams = useSearchParams();
  const initialSlideParam = searchParams.get('slide');
  const initialSlide = initialSlideParam ? parseInt(initialSlideParam, 10) - 1 : 0;

  useEffect(() => {
    if (!api) {
      return;
    }

    // Direkt beim Start auf den initialSlide scrollen
    api.scrollTo(initialSlide);
    setCurrent(initialSlide + 1);

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const slideParam = params.get('slide');
      const newIndex = slideParam ? parseInt(slideParam, 10) - 1 : 0;

      api.scrollTo(newIndex);
      setCurrent(newIndex + 1);
    };

    window.addEventListener('popstate', handlePopState);

    api.on('select', () => {
      const newIndex = api.selectedScrollSnap();
      setCurrent(newIndex + 1);
      window.history.pushState({ slideIndex: newIndex }, '', `?slide=${newIndex + 1}`);
      window.dispatchEvent(
        new CustomEvent('carouselChange', {
          detail: { currentSlide: newIndex },
        }),
      );
    });
  }, [api]);

  const handleDotClick = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  return (
    <div className="h-[40vh] w-full">
      <Carousel className="h-full" setApi={setApi}>
        <CarouselContent>
          {carouselContent.map((item, index) => {
            if ('quizData' in item) {
              return <CarouselQuizSlide key={index} {...(item as QuizCarouselContentItem)} />;
            }
            return <CarouselStandardSlide key={index} {...item} />;
          })}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform" />

        <CarouselNext className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform" />

        {/* <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 sm:-left-10 sm:top-1/2 sm:transform -translate-y-1/2" />
    <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 sm:-right-10 sm:top-1/2 sm:transform -translate-y-1/2" />
    */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center space-x-2">
          {carouselContent.map((_, index) => (
            <button
              key={`carousel-dot-${index}`}
              onClick={() => handleDotClick(index)}
              className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                index + 1 === current ? 'h-2.5 w-2.5 bg-white' : 'bg-gray-400 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
