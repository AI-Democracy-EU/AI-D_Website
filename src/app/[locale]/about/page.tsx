import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
// eslint-disable-next-line camelcase
import { unstable_setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/navbar';

export default function About({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('AboutPage');

  const issues = [
    {
      title: t('newsletter.issue3.title'),
      file: t('newsletter.issue3.file'),
      href: t('newsletter.issue3.url'),
    },
    {
      title: t('newsletter.issue2.title'),
      file: t('newsletter.issue2.file'),
      href: t('newsletter.issue2.url'),
    },
    {
      title: t('newsletter.issue1.title'),
      file: t('newsletter.issue1.file'),
      href: t('newsletter.issue1.url'),
    },
  ];

  const flyer = {
    title: t('flyer.title'),
    file: t('flyer.file'),
    href: t('flyer.url'),
  };

  const meetings = [
    {
      title: t('meetings.meeting2.title'),
      image1: {
        url: '/about/genk1.jpg',
        width: 570,
        height: 428,
        alt: t('meetings.meeting2.alt1'),
      },
      image2: {
        url: '/about/genk2.jpg',
        width: 570,
        height: 430,
        alt: t('meetings.meeting2.alt2'),
      },
      paras: [
        t('meetings.meeting2.text1'),
        t('meetings.meeting2.text2'),
        t('meetings.meeting2.text3'),
        t('meetings.meeting2.text4'),
      ],
    },
    {
      title: t('meetings.meeting1.title'),
      image1: {
        url: '/about/hannover1.jpg',
        width: 570,
        height: 762,
        alt: t('meetings.meeting1.alt1'),
      },
      image2: {
        url: '/about/hannover2.jpg',
        width: 570,
        height: 760,
        alt: t('meetings.meeting1.alt2'),
      },
      paras: [
        t('meetings.meeting1.text1'),
        t('meetings.meeting1.text2'),
        t('meetings.meeting1.text3'),
      ],
    },
  ];

  return (
    <section className="w-full">
      <Navbar title={`${t('title')}`} />
      <div className="mx-auto mt-7 flex flex-col items-start px-4 md:px-6 xl:max-w-6xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-4">
          <div className="col-span-1 justify-items-center">
            <Image src="/aid_logo.png" alt="AI.D logo" width={1509} height={1556} />
          </div>
          <div className="sm:col-span-2 md:col-span-3">
            <p>{t('description.para1')}</p>
            <p className="mt-6">{t('description.para2')}</p>
          </div>
          <div className="col-span-full my-8 bg-primary py-2 text-center text-2xl text-primary-foreground md:text-3xl lg:text-4xl">
            {t('newsletter.title')}
          </div>
          <div className="col-span-1 justify-items-center">
            <Image src="/about/newsletter.png" alt="Newsletter" width={289} height={311} />
          </div>
          <div className="sm:col-span-2 md:col-span-3">
            {issues.map((issue) => (
              <p className="mb-4" key={issue.title}>
                <b>{issue.title}:&nbsp;</b>
                <a
                  rel="noreferrer noopener"
                  target="_blank"
                  className="hover:text-primary hover:underline"
                  href={issue.href}
                >
                  {issue.file}
                </a>
              </p>
            ))}
          </div>
          <div className="col-span-full my-8 bg-primary py-2 text-center text-2xl text-primary-foreground md:text-3xl lg:text-4xl">
            {flyer.title}
          </div>
          <div className="col-span-1 justify-items-center">
            <Image src="/about/flyer.png" alt="Flyer" width={462} height={320} />
          </div>
          <div className="sm:col-span-2 md:col-span-3">
            <p className="mb-4">
              <b>{flyer.title}:&nbsp;</b>
              <a
                rel="noreferrer noopener"
                target="_blank"
                className="hover:text-primary hover:underline"
                href={flyer.href}
              >
                {flyer.file}
              </a>
            </p>
          </div>
          <div className="col-span-full mt-8 bg-primary py-2 text-center text-2xl text-primary-foreground md:text-3xl lg:text-4xl">
            News & Events
          </div>
          {meetings.map((meeting) => (
            <div className="col-span-full py-2" key={meeting.title}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6">
                <div className="col-span-full mb-8 text-center text-xl md:text-2xl">
                  {meeting.title}
                </div>
                <div className="col-span-1 mb-2 justify-items-center sm:me-1 md:col-span-2 md:col-start-2 md:me-2">
                  <Image
                    src={`${meeting.image1.url}`}
                    alt={meeting.image1.alt}
                    width={meeting.image1.width}
                    height={meeting.image1.height}
                  />
                </div>
                <div className="col-span-1 justify-items-center sm:ms-1 md:col-span-2 md:ms-2">
                  <Image
                    src={`${meeting.image2.url}`}
                    alt={meeting.image2.alt}
                    width={meeting.image2.width}
                    height={meeting.image2.height}
                  />
                </div>
                {meeting.paras.map((para, index) => (
                  <div className="col-span-full mt-4 md:col-span-4 md:col-start-2" key={index}>
                    {para}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
