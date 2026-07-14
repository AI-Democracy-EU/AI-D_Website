import { useTranslations } from 'next-intl';
import React from 'react';
// eslint-disable-next-line camelcase
import { unstable_setRequestLocale } from 'next-intl/server';
import BreadcrumbComponent from '@/components/breadcrumb';
import Navbar from '@/components/navbar';
import { Card, CardContent } from '@/components/ui/card';
import DownloadCard from '@/components/material/download-card';
import PageHeroImage from '@/components/page-hero-image';
import data from './data.json';

function getBorderClasses(color: string) {
  return {
    card: 'border-0',
    divider: '',
    link: 'border-0 hover:border-0',
    unit: 'border-0',
  };
}

export default function Curriculum({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);

  const color = 'bg-curriculum1';
  const t = useTranslations('CurriculumPage');
  const translate = (key: string) => t(key as never);
  const borderClasses = getBorderClasses(color);

  return (
    <div>
      <Navbar title={`AI.D - ${translate(data.titleKey)}`} className={color} />
      <div className="mx-auto mt-7 flex flex-col gap-6 px-4 pb-10 md:px-6 xl:max-w-6xl">
        <div className="prose mx-auto w-full max-w-none prose-img:mb-0">
          <PageHeroImage src={data.image} alt={translate(data.titleKey)} />
          <BreadcrumbComponent />

          {data.items.map((item, index) => (
            <div className="mt-4 max-w-full space-y-5" key={index}>
              <Card className={`${color} ${borderClasses.card}`}>
                <CardContent className="space-y-5 px-5 py-4 md:px-6 md:py-5">
                  <div className="flex flex-col gap-2 pb-4">
                    <h2 className="font-garet-bold text-cableBlack md:text-2xl">
                      {translate(item.titleKey)}
                    </h2>
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div className="w-full md:w-[70vw]">{translate(item.descriptionKey)}</div>
                      <div className="w-full items-start md:ms-3 md:w-[30vw] md:max-w-md">
                        <div className="grid gap-3">
                          <DownloadCard
                            title={translate(item.titleKey)}
                            fileBase={item.fileBase}
                            fileExtension={item.fileExtension}
                            locale={locale}
                            ctaLabel={t('download')}
                            viewerFrom={translate(item.titleKey)}
                            borderClassName={borderClasses.link}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
