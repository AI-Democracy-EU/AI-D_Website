'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import BreadcrumbComponent from '@/components/breadcrumb';
import { useLocale } from 'next-intl';
import { useMediaQuery } from 'react-responsive';
import WebinarPlayer from '@/components/webinar/webinar-player';
import WebinarChapterCards from '@/components/webinar/webinar-chapter-cards-image';
import WebinarResources from '@/components/webinar/webinar-resources';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '@/app/react-tabs-custom.css';
import {
  Word,
  TranscriptData,
  VideoDataProps,
  WebinarOverviewProps,
  WebinarChapterCardsProps,
  WebinarResourcesProps,
  WebinarTabHeadings,
} from './webinar-types';

interface WebinarContentProps {
  webinarOverviewProps: WebinarOverviewProps;
  videoProps: VideoDataProps;
  transcriptData: TranscriptData;
  chapterCardProps: WebinarChapterCardsProps;
  resourcesProps: WebinarResourcesProps;
}

function WebinarContent({
  videoProps: videoData,
  webinarOverviewProps: webinarOverviewData,
  transcriptData,
  chapterCardProps,
  resourcesProps,
}: WebinarContentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [transcript, setTranscript] = useState<Word[]>([]);
  const [, setIsLoaded] = useState(false);
  const locale = useLocale();
  const tabKeys = ['overview', 'transcript', 'resources'];
  const tabHeadings: WebinarTabHeadings = {
    de: {
      overview: 'Überblick',
      chapters: 'Kapitel',
      transcript: 'Transkript',
      resources: 'Ressourcen',
    },
    en: {
      overview: 'Overview',
      chapters: 'Chapters',
      transcript: 'Transcript',
      resources: 'Resources',
    },
    nl: {
      overview: 'Overzicht',
      chapters: 'Hoofdstukken',
      transcript: 'Transcript',
      resources: 'Bronnen',
    },
  };

  const headings = tabHeadings[locale] || tabHeadings.en; // fallback to English
  const resourceItems = resourcesProps[locale] || resourcesProps.en; // fallback to English

  useEffect(() => {
    const currentTranscript = transcriptData[locale] || transcriptData.en; // Fallback to English
    const hash = window.location.hash.replace('#', '');
    const index = tabKeys.indexOf(hash);
    if (index !== -1) setTabIndex(index);
    setTranscript(currentTranscript.results.items);
    setIsLoaded(true);
  }, [locale, transcriptData]);

  const handleTabSelect = (index: number) => {
    setTabIndex(index);
    window.history.replaceState(null, '', `#${tabKeys[index]}`);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const { currentTime } = videoRef.current;

    transcript.forEach((word, index) => {
      const wordElement = document.getElementById(`word-${index}`);
      if (!wordElement) return;

      const endTime = word.end_time ? parseFloat(word.end_time) : Infinity;

      if (currentTime >= endTime) {
        wordElement.classList.add('pr-1');
        wordElement.classList.add('bg-sky-200');
        // lastActiveWord = wordElement;
      } else {
        wordElement.classList.remove('bg-sky-200');
      }
    });

    // Scroll the last active word into view if it exists
    // if (lastActiveWord) {
    //   (lastActiveWord as HTMLElement).scrollIntoView({
    //     behavior: "smooth",
    //     block: "center",
    //   });
    // }
  };

  const handleMediaQueryChange = (matches: boolean) => {
    // if we switch to a small screen
    if (matches) {
      // and the overview was selected, switch to the chapters;
      // otherwise stay on the same tab (i.e., adjust the index)
      if (tabIndex === 0) setTabIndex(1);
      else setTabIndex(tabIndex + 1);
    } else {
      // if we switch to a large screen and the chapters are selected,
      // select the overview; otherwise stay on the same
      // tab (i.e., adjust the index)
      if (tabIndex <= 1) setTabIndex(0);
      else setTabIndex(tabIndex - 1);
    }
  };

  const isMobile = useMediaQuery(
    {
      query: '(max-width: 1023px)',
    },
    undefined,
    handleMediaQueryChange,
  );

  const [tabIndex, setTabIndex] = useState(isMobile ? 1 : 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex flex-col lg:flex-row">
        <div className="flex-1 space-y-6 px-2 lg:w-2/3">
          <WebinarPlayer video={videoRef} handleTimeUpdate={handleTimeUpdate} data={videoData} />
          <div>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
              <TabList>
                <Tab>{headings.overview}</Tab>
                {isMobile && <Tab>{headings.chapters}</Tab>}
                <Tab>{headings.transcript}</Tab>
                <Tab>{headings.resources}</Tab>
              </TabList>
              <TabPanel>
                <div className="p-4 text-sm shadow-md drop-shadow-md sm:text-base lg:text-lg">
                  <div className="font-bold">{webinarOverviewData.heading}</div>
                  <ul className="mt-2 list-disc pl-4 md:mt-4">
                    {webinarOverviewData.goals.map((goal, index) => (
                      <li
                        key={index}
                        className="md:mt-2"
                        dangerouslySetInnerHTML={{ __html: goal }}
                      />
                    ))}
                  </ul>
                  <div dangerouslySetInnerHTML={{ __html: webinarOverviewData.extended }} />
                </div>
              </TabPanel>
              {isMobile && (
                <TabPanel>
                  <div className="space-y-8 p-4 text-sm sm:text-base lg:text-lg">
                    <WebinarChapterCards
                      cards={chapterCardProps.cards}
                      quiz={chapterCardProps.quiz}
                    />
                  </div>
                </TabPanel>
              )}
              <TabPanel>
                <ScrollArea className="h-48 px-4 text-sm shadow-md drop-shadow-md sm:text-base lg:h-64 lg:text-lg">
                  {transcript.map((word, index) => (
                    <div
                      key={index}
                      id={`word-${index}`}
                      className="inline-block pr-1 transition-colors duration-200"
                    >
                      {word.content || (word.alternatives && word.alternatives[0]?.content) || ''}
                    </div>
                  ))}
                </ScrollArea>
              </TabPanel>
              <TabPanel id="resources">
                <div className="space-y-8 p-4 text-sm shadow-md drop-shadow-md sm:text-base lg:text-lg">
                  <WebinarResources items={resourceItems.items} />
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
        {!isMobile && (
          <div className="space-y-8 px-2 lg:w-1/3">
            <WebinarChapterCards cards={chapterCardProps.cards} quiz={chapterCardProps.quiz} />
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="space-y-8 px-2">
          <BreadcrumbComponent />
        </div>
      </div>
    </div>
  );
}

export default WebinarContent;
