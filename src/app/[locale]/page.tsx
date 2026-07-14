/* eslint-disable no-unused-vars */
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Main from '@/components/landing-page/main';
import Pillars from '@/components/landing-page/pillars';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/navbar';
import { Link } from '@/navigation';
import React from 'react';

export default function Home({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('HomePage');

  const pillars = [
    {
      title: t('pillars.webinars.title'),
      description: t('pillars.webinars.description'),
      image: '/icons/home/webinars.jpg',
      href: '/webinars',
    },
    {
      title: t('pillars.materials.title'),
      description: t('pillars.materials.description'),
      image: '/icons/home/materials.jpg',
      href: '/materials',
    },
    {
      title: t('pillars.curriculum.title'),
      description: t('pillars.curriculum.description'),
      image: '/icons/home/curriculum.jpg',
      href: '/curriculum',
    },
  ];

  return (
    <div>
      <Navbar title={t('title')} />
      <div className="lg:container sm:mt-9">
        <Main />
        <div className="sm:mt-9">
          <Pillars
            pillars={pillars}
            gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            cardColorClass="bg-muted"
          />
        </div>

        <Card className="mx-4 mt-12 lg:mx-0">
          <CardContent className="p-2 text-cableBlack sm:text-xs md:text-base">
            {t('card-content')}
          </CardContent>
        </Card>
        <div className="mx-4 mt-12 flex flex-col items-center justify-center md:flex-row lg:mx-0">
          <Link href="/about" className="w-auto md:w-full">
            <Button className="mx-auto my-4 block flex h-12 items-center justify-center gap-4 px-6 text-base font-medium sm:text-lg">
              {t('button_about_project')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
