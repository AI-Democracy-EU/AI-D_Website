'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Bot, Goal, Orbit, MessageCircleQuestion } from 'lucide-react';

import { Link } from '@/navigation';
import { WebinarChapterCardsProps } from './webinar-types';

function Icon(id: string) {
  if (id === 'orbit') return <Orbit size="36" className="flex-shrink-0" />;
  if (id === 'goal') return <Goal size="36" className="flex-shrink-0" />;
  if (id === 'bot') return <Bot size="36" className="flex-shrink-0" />;
  return null;
}

function WebinarChapterCards({ cards, quiz }: WebinarChapterCardsProps) {
  let quizCard = null;
  if (quiz) {
    quizCard = (
      <div>
        <Link href={quiz.link} className="w-full">
          <Button className="mt-4 flex h-full w-full items-center justify-center py-4 text-xl text-white hover:bg-primary">
            <MessageCircleQuestion size="36" className="me-4 flex-shrink-0" />
            {quiz.button} -&gt;
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {cards
        && cards.length > 0
        && cards.map((card, index) => (
          <Link href={card.link}>
            <Card
              className="mb-4 flex flex-col shadow-md drop-shadow-md"
              key={index}
              style={{ borderWidth: '0px' }}
            >
              <CardHeader className="relative flex items-center justify-center border-b bg-muted">
                <div className="flex items-center space-x-4">
                  {Icon(card.icon)}
                  <CardTitle className="overflow-ellipsis whitespace-nowrap text-center font-light">
                    {card.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative flex h-48 items-center justify-center overflow-hidden rounded-b-md">
                <Image
                  src={`/icons/${card.link}.jpg`}
                  alt={`Icon ${card.link}`}
                  layout="fill"
                  objectFit="cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null; // endloses Looping vermeiden
                    e.currentTarget.src = '/icons/fundamentals-of-ai/introduction.jpg';
                  }}
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      {quizCard}
    </div>
  );
}

export default WebinarChapterCards;
