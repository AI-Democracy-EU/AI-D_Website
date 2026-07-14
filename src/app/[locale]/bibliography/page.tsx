import React from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/navbar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Literature from '@/components/literature';

import w1literature from '@/data/w1-literature.json';
import w2literature from '@/data/w2-literature.json';
import w3literature from '@/data/w3-literature.json';
import w4literature from '@/data/w4-literature.json';

import styles from './bibliography.module.css';

function Bibliography({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Bibliography');
  const heading = t('heading');
  const bibliographyHeading = t('bibliography');
  const toViewerHref = (file: string, from?: string) => {
    const base = `/${locale}/pdf-viewer?file=${encodeURIComponent(file)}`;
    if (!from) return base;
    return `${base}&from=${encodeURIComponent(from)}`;
  };

  return (
    <section className="w-full">
      <Navbar title={`AI.D - ${heading}`} />
      <div className="mx-auto mt-7 flex flex-col items-start px-4 md:px-6 xl:max-w-6xl">
        <div className="grid w-full grid-cols-4 gap-8">
          <div className="col-span-3 mb-4 text-2xl md:text-3xl lg:text-4xl">
            {bibliographyHeading}
          </div>
        </div>
        <div className="col-span-4 w-full">
          <Accordion
            type="multiple"
            defaultValue={['w1-literature', 'w2-literature', 'w3-literature', 'w4-literature']}
            className="w-full min-w-full space-y-8"
          >
            {w1literature && w1literature.length > 0 && (
              <AccordionItem
                value="w1-literature"
                className={`${styles.scrollmargin} w-full`}
                id="w1-literature"
              >
                <AccordionTrigger className="flex w-full text-xl md:text-2xl">
                  <div className="flex w-full items-center justify-between pr-6">
                    {t('w1.heading')}
                    <a
                      href={toViewerHref('/w1/literature_ai_fundamentals.pdf', t('heading'))}
                      className="ml-4"
                    >
                      <Image
                        src="/pdf-icon.png"
                        alt="Bibliography download"
                        width={36}
                        height={36}
                      />
                    </a>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="h-[calc(100%-8rem)]">
                  <Literature sections={w1literature} />
                </AccordionContent>
              </AccordionItem>
            )}
            {w2literature && w2literature.length > 0 && (
              <AccordionItem
                value="w2-literature"
                className={`${styles.scrollmargin} w-full`}
                id="w2-literature"
              >
                <AccordionTrigger className="w-full text-xl md:text-2xl">
                  <div className="flex w-full items-center justify-between pr-6">
                    {t('w2.heading')}
                    <a
                      href={toViewerHref('/w2/literature_genai.pdf', t('heading'))}
                      className="ml-4"
                    >
                      <Image
                        src="/pdf-icon.png"
                        alt="Bibliography download"
                        width={36}
                        height={36}
                      />
                    </a>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="h-[calc(100%-8rem)]">
                  <Literature sections={w2literature} />
                </AccordionContent>
              </AccordionItem>
            )}
            {w3literature && w3literature.length > 0 && (
              <AccordionItem
                value="w3-literature"
                className={`${styles.scrollmargin} w-full`}
                id="w3-literature"
              >
                <AccordionTrigger className="w-full text-xl md:text-2xl">
                  <div className="flex w-full items-center justify-between pr-6">
                    <div className="flex w-full">{t('w3.heading')}</div>
                    <a
                      href={toViewerHref(
                        '/w3/literature_algorithms_e-recruiting.pdf',
                        t('heading'),
                      )}
                      className="ml-4"
                    >
                      <Image
                        src="/pdf-icon.png"
                        alt="Bibliography download"
                        width={36}
                        height={36}
                      />
                    </a>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="h-[calc(100%-8rem)]">
                  <Literature sections={w3literature} />
                </AccordionContent>
              </AccordionItem>
            )}
            {w4literature && w4literature.length > 0 && (
              <AccordionItem
                value="w4-literature"
                className={`${styles.scrollmargin} w-full`}
                id="w4-literature"
              >
                <AccordionTrigger className="w-full text-xl md:text-2xl">
                  <div className="flex w-full items-center justify-between pr-6">
                    <div className="flex w-full">{t('w4.heading')}</div>
                    <a
                      href={toViewerHref('/w4/literature_ai_tutors.pdf', t('heading'))}
                      className="ml-4"
                    >
                      <Image
                        src="/pdf-icon.png"
                        alt="Bibliography download"
                        width={36}
                        height={36}
                      />
                    </a>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="h-[calc(100%-8rem)]">
                  <Literature sections={w4literature} />
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default Bibliography;
