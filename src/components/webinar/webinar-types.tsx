'use client';

export interface VideoSubtitlesProps {
  en: string;
  nl: string;
  de: string;
}

export interface VideoSrcProps {
  en: string;
  nl: string;
  de: string;
}

export interface VideoDownloadProps {
  en: string;
  nl: string;
  de: string;
}

export interface WebinarOverviewProps {
  heading: string;
  goals: string[];
  extended: any;
}

export interface VideoDataProps {
  src: VideoSrcProps;
  poster: string;
  subtitles: VideoSubtitlesProps;
  download: VideoDownloadProps;
}

export interface Word {
  id: number;
  type: string;
  alternatives: { confidence: string; content: string }[];
  start_time?: string;
  end_time?: string;
  content?: string;
}

export interface TranscriptData {
  [locale: string]: {
    results: {
      items: Word[];
    };
  };
}

export interface WebinarTabHeadings {
  [locale: string]: {
    overview: string;
    chapters: string;
    transcript: string;
    resources: string;
  };
}

export interface WebinarChapterCardItem {
  title: string;
  content: string;
  button: string;
  link: string;
  icon: string;
}

export interface WebinarQuizProps {
  title: string;
  link: string;
  button: string;
}

export interface WebinarChapterCardsProps {
  cards: WebinarChapterCardItem[];
  quiz?: WebinarQuizProps;
}

export interface WebinarResourceItem {
  link: string;
  text: string;
}

export interface WebinarResourceItems {
  items: WebinarResourceItem[];
}

export interface WebinarResourcesProps {
  [locale: string]: WebinarResourceItems;
}
