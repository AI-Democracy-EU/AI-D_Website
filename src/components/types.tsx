'use client';

interface LiteratureLink {
  text?: string;
  url: string;
}

export interface LiteratureItem {
  id: string;
  author?: string;
  date?: string;
  title: string;
  editors?: string[];
  journal?: string;
  volume?: string;
  issue?: string;
  number?: string;
  edition?: string;
  pages?: string;
  publisher?: string;
  source?: string;
  retrieved?: string;
  link?: LiteratureLink;
}

export interface LiteratureSection {
  heading: string;
  items: LiteratureItem[];
}

export interface LiteratureProps {
  sections: LiteratureSection[];
}
