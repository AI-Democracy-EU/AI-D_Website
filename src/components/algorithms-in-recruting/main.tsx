'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/navigation';
import transcriptDataEN from '@/../public/w3_transcripts/EN.json';
import transcriptDataDE from '@/../public/w3_transcripts/DE.json';
import transcriptDataNL from '@/../public/w3_transcripts/NL.json';
import { TranscriptData, WebinarResourcesProps } from '../webinar/webinar-types';
import WebinarContent from '../webinar/webinar-content';

const transcriptData: TranscriptData = {
  en: transcriptDataEN,
  de: transcriptDataDE,
  nl: transcriptDataNL,
};

function CourseContent() {
  const t = useTranslations('W3CoursePage');
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

  const videoOverviewText = t.raw('overview');
  const videoData = {
    src: {
      en: process.env.NEXT_PUBLIC_MANIFEST_EN_VIDEO3 || '',
      nl: process.env.NEXT_PUBLIC_MANIFEST_NL_VIDEO3 || '',
      de: process.env.NEXT_PUBLIC_MANIFEST_DE_VIDEO3 || '',
    },
    poster: process.env.NEXT_PUBLIC_POSTER_URL_VIDEO3 || '',
    subtitles: {
      en: process.env.NEXT_PUBLIC_SUBTITLES_EN_VIDEO3 || '',
      nl: process.env.NEXT_PUBLIC_SUBTITLES_NL_VIDEO3 || '',
      de: process.env.NEXT_PUBLIC_SUBTITLES_DE_VIDEO3 || '',
    },
    download: {
      en: process.env.NEXT_PUBLIC_DOWNLOAD_EN_VIDEO3 || '',
      nl: process.env.NEXT_PUBLIC_DOWNLOAD_NL_VIDEO3 || '',
      de: process.env.NEXT_PUBLIC_DOWNLOAD_DE_VIDEO3 || '',
    },
  };

  const tBib = useTranslations('Bibliography');
  const resourcesData: WebinarResourcesProps = {
    en: {
      items: [
        {
          link: `/pdf-viewer?file=${encodeURIComponent('/w3/AID_Webinar_3_Resources_1_and_2_Exercises_Application_Ranking_EN.pdf')}&from=${encodeURIComponent(tBib('w3.heading'))}`,
          text: 'Exercise with applicant ranking',
        },
        {
          link: 'https://iug.htw-berlin.de/workshop/HR2/index.html',
          text: 'AI simulator: applicant ranking (german/english)',
        },

        {
          link: '/bibliography#w3-literature',
          text: tBib('bibliography'),
        },
      ],
    },
    de: {
      items: [
        {
          link: `/pdf-viewer?file=${encodeURIComponent('/w3/AID_Webinar_3_Resources_1_and_2_Exercises_Application_Ranking_DE.pdf')}&from=${encodeURIComponent(tBib('w3.heading'))}`,
          text: 'Übung mit Ranking der Bewerber*innen',
        },
        {
          link: 'https://iug.htw-berlin.de/workshop/HR2/index.html',
          text: 'AI simulator: applicant ranking (german/english)',
        },

        {
          link: '/bibliography#w3-literature',
          text: tBib('bibliography'),
        },
      ],
    },
    nl: {
      items: [
        {
          link: `/pdf-viewer?file=${encodeURIComponent('/w3/AID_Webinar_3_Resources_1_and_2_Exercises_Application_Ranking_NL.pdf')}&from=${encodeURIComponent(tBib('w3.heading'))}`,
          text: 'Oefening met rangschikking van sollicitanten',
        },
        {
          link: 'https://iug.htw-berlin.de/workshop/HR2/index.html',
          text: 'AI simulator: applicant ranking (german/english)',
        },

        {
          link: '/bibliography#w3-literature',
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
      chapterCardProps={{ cards: chapterCards }}
      resourcesProps={resourcesData}
    />
  );
}

export default CourseContent;
