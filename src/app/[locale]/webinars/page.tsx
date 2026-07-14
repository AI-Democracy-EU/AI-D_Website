import { useTranslations } from 'next-intl';
import React from 'react';
// eslint-disable-next-line camelcase
import { unstable_setRequestLocale } from 'next-intl/server';
import Pillars from '@/components/landing-page/pillars';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';

export default function Home({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('LandingPage');

  const pillars = [
    {
      title: t('pillars.fundamentals-of-ai.title'),
      description: t('pillars.fundamentals-of-ai.description'),
      image: '/icons/webinars/fundamentals.jpg',
      href: '/fundamentals-of-ai',
    },
    {
      title: t('pillars.gen-ai-critical-ai-literacy.title'),
      description: t('pillars.gen-ai-critical-ai-literacy.description'),
      image: '/icons/webinars/genai.jpg',
      href: '/gen-ai-and-critical-ai-literacy',
    },
    {
      title: t('pillars.algorithms-in-e-recruiting-software.title'),
      description: t('pillars.algorithms-in-e-recruiting-software.description'),
      image: '/icons/webinars/algorithms.jpg',
      href: '/algorithms-in-e-recruiting-software',
    },
    {
      title: t('pillars.ai-tutors-between-equality-and-inequality.title'),
      description: t('pillars.ai-tutors-between-equality-and-inequality.description'),
      image: '/icons/webinars/ai-tutors.jpg',
      href: '/ai-tutors-between-equality-and-inequality',
    },
  ];

  return (
    <div>
      <Navbar title={`${t('title')}`} />
      <div className="mx-4 mb-4 mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center lg:mx-0">
          <span className="justify-self-end"> {t('button_quiz_pre')}</span>
          <Link href="/memoryquiz" className="w-auto">
            <Button className="flex h-12 items-center justify-center gap-4 px-6 text-base font-medium sm:text-lg">
              {t('button_quiz')}
            </Button>
          </Link>
          <span className="justify-self-start"> {t('button_quiz_post')}</span>
        </div>
      <div className="lg:container sm:mt-9">
        <Pillars pillars={pillars} />
      </div>
    </div>
  );
}
