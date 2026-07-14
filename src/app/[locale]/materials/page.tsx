import { useTranslations } from 'next-intl';
import React from 'react';
// eslint-disable-next-line camelcase
import { unstable_setRequestLocale } from 'next-intl/server';
import Pillars from '@/components/landing-page/pillars';
import Navbar from '@/components/navbar';
import { Card, CardContent } from '@/components/ui/card';

export default function Home({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('MaterialsPage');

  const pillars = [
    {
      title: t('pillars.material1.title'),
      description: t('pillars.material1.description'),
      image: '/icons/materials/material1.jpg',
      href: '/material1',
    },
    {
      title: t('pillars.material2.title'),
      description: t('pillars.material2.description'),
      image: '/icons/materials/material2.jpg',
      href: '/material2',
    },
    {
      title: t('pillars.material3.title'),
      description: t('pillars.material3.description'),
      image: '/icons/materials/material3.jpg',
      href: '/material3',
    },
    {
      title: t('pillars.material4.title'),
      description: t('pillars.material4.description'),
      image: '/icons/materials/material1-v1.jpg',
      href: '/material4',
    },
  ];

  return (
    <div>
      <Navbar title={`${t('title')}`} className="bg-materials1" />
      <div className="lg:container sm:mt-9">
        <Card className="bg-materials1 mx-4 my-8 lg:mx-0">
          <CardContent className="p-4 text-cableBlack sm:text-xs md:text-base">
            {t('description')}
          </CardContent>
        </Card>
        <Pillars pillars={pillars} cardColorClass="bg-materials1" />
      </div>
    </div>
  );
}
