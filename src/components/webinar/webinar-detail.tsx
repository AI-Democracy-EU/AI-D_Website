// eslint-disable-next-line camelcase
import React, { Suspense } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import BreadcrumbComponent from '@/components/breadcrumb';
import Navbar from '@/components/navbar';
import { InstagramCarousel } from '@/components/webinar/instagram-carousel';

const DynamicContent = dynamic(() => import('@/components/webinar/dynamic-content'), {
  ssr: false,
});

export default function Detail({
  params: { locale },
  data,
}: {
  params: { locale: string };
  data: any;
}) {
  unstable_setRequestLocale(locale);

  const t = useTranslations(data.chapter);

  const localizedCarouselData = data.carouselData.map((item: any, index: number) => ({
    ...item,
    alt: t(`slide${index + 1}.alt`),
    listHeadline: t(`slide${index + 1}.listHeadline`),
    listContent: t.raw(`slide${index + 1}.listContent`),
  }));

  return (
    <>
      <Navbar title={`AI.D - ${t('title')} - ${t('chapter')}`} />
      <div className="-mt-8 flex flex-col xl:container sm:mt-9">
        <div className="prose mx-auto w-full max-w-none lg:w-4/5 xl:w-3/4">
          <Suspense fallback={null}>
            <InstagramCarousel carouselContent={localizedCarouselData} />
          </Suspense>
          <BreadcrumbComponent />
          <div className="m-2">
            <DynamicContent locale={locale} data={localizedCarouselData} />
          </div>
        </div>
      </div>
    </>
  );
}
