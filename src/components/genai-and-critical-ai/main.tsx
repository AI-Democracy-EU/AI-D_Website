'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/navigation';
import transcriptDataEN from '@/../public/w2_transcripts/EN.json';
import transcriptDataDE from '@/../public/w2_transcripts/DE.json';
import transcriptDataNL from '@/../public/w2_transcripts/NL.json';
import { TranscriptData, WebinarResourcesProps } from '../webinar/webinar-types';
import WebinarContent from '../webinar/webinar-content';

const transcriptData: TranscriptData = {
  en: transcriptDataEN,
  de: transcriptDataDE,
  nl: transcriptDataNL,
};

function CourseContent() {
  const t = useTranslations('W2CoursePage');
  const currentPath = usePathname()
    .split('/')
    .filter((path) => path)[0];

  const chapterCards = [
    {
      title: t('sections.areaOfApplication.title'),
      content: t('sections.areaOfApplication.content'),
      button: t('sections.areaOfApplication.button'),
      link: `${currentPath}/area`,
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
      link: `${currentPath}/impact`,
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
      en: process.env.NEXT_PUBLIC_MANIFEST_EN_VIDEO2 || '',
      nl: process.env.NEXT_PUBLIC_MANIFEST_NL_VIDEO2 || '',
      de: process.env.NEXT_PUBLIC_MANIFEST_DE_VIDEO2 || '',
    },
    poster: process.env.NEXT_PUBLIC_POSTER_URL_VIDEO2 || '',
    subtitles: {
      en: process.env.NEXT_PUBLIC_SUBTITLES_EN_VIDEO2 || '',
      nl: process.env.NEXT_PUBLIC_SUBTITLES_NL_VIDEO2 || '',
      de: process.env.NEXT_PUBLIC_SUBTITLES_DE_VIDEO2 || '',
    },
    download: {
      en: process.env.NEXT_PUBLIC_DOWNLOAD_EN_VIDEO2 || '',
      nl: process.env.NEXT_PUBLIC_DOWNLOAD_NL_VIDEO2 || '',
      de: process.env.NEXT_PUBLIC_DOWNLOAD_DE_VIDEO2 || '',
    },
  };

  const tBib = useTranslations('Bibliography');
  const resourcesData: WebinarResourcesProps = {
    en: {
      items: [
        {
          link: `/pdf-viewer?file=${encodeURIComponent('/w2/AID_Webinar_2_Resource_1_AID_Prompting_Guide_EN.pdf')}&from=${encodeURIComponent(tBib('w2.heading'))}`,
          text: 'AI.D Prompting Guide',
        },
        {
          link: '/bibliography#w2-literature',
          text: tBib('bibliography'),
        },
      ],
    },
    de: {
      items: [
        {
          link: `/pdf-viewer?file=${encodeURIComponent('/w2/AID_Webinar_2_Resource_1_AID_Prompting_Guide_DE.pdf')}&from=${encodeURIComponent(tBib('w2.heading'))}`,
          text: 'AI.D Prompting-Leitfaden',
        },
        {
          link: '/bibliography#w2-literature',
          text: tBib('bibliography'),
        },
      ],
    },
    nl: {
      items: [
        {
          link: `/pdf-viewer?file=${encodeURIComponent('/w2/AID_Webinar_2_Resource_1_AID_Prompting_Guide_NL.pdf')}&from=${encodeURIComponent(tBib('w2.heading'))}`,
          text: 'AI.D Prompting-Handleiding',
        },
        {
          link: '/bibliography#w2-literature',
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
