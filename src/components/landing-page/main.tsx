'use client';

import Player from 'next-video/player';
import { Download } from 'lucide-react';
import { useLocale } from 'next-intl';
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

type SupportedLocale = 'en' | 'nl' | 'de';

function Main() {
  const rawLocale = useLocale();
  const locale = ['en', 'nl', 'de'].includes(rawLocale) ? (rawLocale as SupportedLocale) : 'en';

  const manifestUrlMap: Record<SupportedLocale, string | undefined> = {
    en: process.env.NEXT_PUBLIC_MANIFEST_EN_LANDING,
    nl: process.env.NEXT_PUBLIC_MANIFEST_NL_LANDING,
    de: process.env.NEXT_PUBLIC_MANIFEST_DE_LANDING,
  };

  const subtitleUrlMap: Record<SupportedLocale, string | undefined> = {
    en: process.env.NEXT_PUBLIC_SUBTITLES_EN_LANDING,
    nl: process.env.NEXT_PUBLIC_SUBTITLES_NL_LANDING,
    de: process.env.NEXT_PUBLIC_SUBTITLES_DE_LANDING,
  };
  const downloadUrl = {
    en: process.env.NEXT_PUBLIC_DOWNLOAD_EN_TRAILER || '',
    nl: process.env.NEXT_PUBLIC_DOWNLOAD_NL_TRAILER || '',
    de: process.env.NEXT_PUBLIC_DOWNLOAD_DE_TRAILER || '',
  };

  return (
    <div className="relative flex justify-center sm:my-9">
      <AspectRatio ratio={16 / 9}>
        <div className="h-full w-full overflow-hidden rounded-none md:rounded-xl md:drop-shadow-lg">
          {downloadUrl[locale] && (
            <a
              href={downloadUrl[locale]}
              download
              rel="noopener noreferrer"
              aria-label="Download video"
              title="Download video"
              className="absolute right-3 top-3 z-10 text-black/80 transition hover:text-black"
            >
              <Download size={16} />
            </a>
          )}
          <Player
            className="h-full w-full"
            src={manifestUrlMap[locale]}
            poster={process.env.NEXT_PUBLIC_POSTER_URL_LANDING}
            controls
            style={{
              width: '100%',
              height: '100%',
              '--media-accent-color': '#8d4ef4',
              '--media-object-fit': 'cover',
              '--media-object-position': 'center',
              '--media-poster-image-background-position': 'center',
              '--media-poster-image-background-size': 'cover',
            }}
          >
            {subtitleUrlMap[locale] && (
              <track
                kind="subtitles"
                src={subtitleUrlMap[locale]}
                srcLang={locale}
                label={locale === 'en' ? 'English' : locale === 'nl' ? 'Nederlands' : 'Deutsch'}
              />
            )}
          </Player>
        </div>
      </AspectRatio>
    </div>
  );
}

export default Main;
