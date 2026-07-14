'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/navigation';
import transcriptDataEN from '@/../public/w4_transcripts/EN.json';
import transcriptDataDE from '@/../public/w4_transcripts/DE.json';
import transcriptDataNL from '@/../public/w4_transcripts/NL.json';
import { TranscriptData, WebinarResourcesProps } from '../webinar/webinar-types';
import WebinarContent from '../webinar/webinar-content';

const transcriptData: TranscriptData = {
  en: transcriptDataEN,
  de: transcriptDataDE,
  nl: transcriptDataNL,
};

function CourseContent() {
  const t = useTranslations('W4CoursePage');
  const currentPath = usePathname()
    .split('/')
    .filter((path) => path)[0];

  const chapterCards = [
    {
      title: t('sections.areaOfApplication.title'),
      content: t('sections.areaOfApplication.content'),
      button: t('sections.areaOfApplication.button'),
      link: `${currentPath}/introduction`,
      icon: 'orbit',
    },
    {
      title: t('sections.useOfAI.title'),
      content: t('sections.useOfAI.content'),
      button: t('sections.useOfAI.button'),
      link: `${currentPath}/specifics`,
      icon: 'bot',
    },
    {
      title: t('sections.impact.title'),
      content: t('sections.impact.content'),
      button: t('sections.impact.button'),
      link: `${currentPath}/implications`,
      icon: 'goal',
    },
  ];

  const quiz = {
    title: t('sections.quiz.title'),
    link: `${currentPath}/quiz`,
    button: t('sections.quiz.button'),
  };

  const videoOverviewText = t.raw('overview');
  const videoData = {
    src: {
      en: process.env.NEXT_PUBLIC_MANIFEST_EN_VIDEO4 || '',
      nl: process.env.NEXT_PUBLIC_MANIFEST_NL_VIDEO4 || '',
      de: process.env.NEXT_PUBLIC_MANIFEST_DE_VIDEO4 || '',
    },
    poster: process.env.NEXT_PUBLIC_POSTER_URL_VIDEO4 || '',
    subtitles: {
      en: process.env.NEXT_PUBLIC_SUBTITLES_EN_VIDEO4 || '',
      nl: process.env.NEXT_PUBLIC_SUBTITLES_NL_VIDEO4 || '',
      de: process.env.NEXT_PUBLIC_SUBTITLES_DE_VIDEO4 || '',
    },
    download: {
      en: process.env.NEXT_PUBLIC_DOWNLOAD_EN_VIDEO4 || '',
      nl: process.env.NEXT_PUBLIC_DOWNLOAD_NL_VIDEO4 || '',
      de: process.env.NEXT_PUBLIC_DOWNLOAD_DE_VIDEO4 || '',
    },
  };

  const tBib = useTranslations('Bibliography');
  const resourcesData: WebinarResourcesProps = {
    en: {
      items: [
        {
          link: '/bibliography#w4-literature',
          text: tBib('bibliography'),
        },
      ],
    },
  };

  return (
    <WebinarContent
      webinarOverviewProps={videoOverviewText}
      videoProps={videoData}
      transcriptData={transcriptData}
      chapterCardProps={{ cards: chapterCards, quiz }}
      resourcesProps={resourcesData}
    />
  );
}

export default CourseContent;
