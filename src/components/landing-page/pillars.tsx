'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from '@/navigation';

interface PillarProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

interface PillarContentProps {
  pillars: PillarProps[];
  cardColorClass?: string;
  gridCols?: string;
}

function Pillars({
  pillars,
  cardColorClass = 'bg-muted',
  gridCols = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
}: PillarContentProps) {
  return (
    <div className="flex w-full items-center px-4 sm:px-6 lg:px-0">
      <div className={`grid w-full gap-8 ${gridCols}`}>
        {pillars.map((p) => (
          <Card key={p.title} className={cardColorClass}>
            <Link href={p.href}>
              <CardHeader className="text-center">
                <CardTitle className="sm:text-md flex min-h-[3.5rem] items-center justify-center text-base font-light text-cableBlack md:min-h-[5rem] md:text-xl">
                  {p.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    priority
                    src={p.image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto w-full object-cover"
                    alt={p.title}
                  />
                </div>
              </CardContent>
              <CardFooter>{p.description}</CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Pillars;
