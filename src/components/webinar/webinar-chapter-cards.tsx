'use client';

import React from 'react';
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
      <Card className="flex flex-col shadow-md drop-shadow-md">
        <CardHeader className="relative flex items-center justify-center border-b">
          <div className="flex items-center space-x-4">
            <MessageCircleQuestion size="36" className="flex-shrink-0" />
            <CardTitle className="overflow-ellipsis whitespace-nowrap text-center font-semibold">
              {quiz.title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardFooter>
          <Link href={quiz.link} className="w-full">
            <Button
              variant="secondary"
              className="flex h-full w-full items-center justify-center bg-[#251E33] text-xl text-white hover:bg-primary"
            >
              {quiz.button} -&gt;
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div>
      {cards
        && cards.length > 0
        && cards.map((card, index) => (
          <Card className="mb-4 flex flex-col shadow-md drop-shadow-md" key={index}>
            <CardHeader className="relative flex items-center justify-center border-b">
              <div className="flex items-center space-x-4">
                {Icon(card.icon)}
                <CardTitle className="overflow-ellipsis whitespace-nowrap text-center font-semibold">
                  {card.title}
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="flex-grow p-4">
              <p className="text-balance text-sm sm:text-base">{card.content}</p>
            </CardContent>
            <CardFooter>
              <Link href={card.link} className="w-full">
                <Button className="w-full">{card.button} -&gt;</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      {quizCard}
    </div>
  );
}

export default WebinarChapterCards;
