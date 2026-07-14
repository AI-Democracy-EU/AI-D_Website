/* eslint-disable no-nested-ternary */

'use client';

import React, { useEffect, useState } from 'react';
import Player from 'next-video/player';
import { useLocale } from 'next-intl';
import { Download } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { VideoDataProps } from './webinar-types';

interface WebinarPlayerProps {
  video: any;
  handleTimeUpdate: any;
  data: VideoDataProps;
}
type SupportedLocale = 'en' | 'nl' | 'de';
function WebinarPlayer({ video, handleTimeUpdate, data }: WebinarPlayerProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const rawLocale = useLocale();
  const locale = ['en', 'nl', 'de'].includes(rawLocale) ? (rawLocale as SupportedLocale) : 'en';
  const downloadUrl = data.download[locale];

  useEffect(() => {
    if (data.src) {
      setIsLoaded(true);
    }
  }, [data?.src]);
  return (
    <div className="relative w-full shadow-lg drop-shadow-md">
      <div className="mb-4">
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
          {isLoaded ? (
            <div className="relative h-full w-full overflow-hidden rounded-none md:rounded-xl md:drop-shadow-lg">
              {downloadUrl && (
                <a
                  href={downloadUrl}
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
                src={data.src[locale]}
                poster={data.poster}
                controls
                ref={video}
                onTimeUpdate={handleTimeUpdate}
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
                {locale === 'en' ? (
                  <track
                    kind="subtitles"
                    src={data.subtitles.en}
                    srcLang="en"
                    label="English"
                    default
                  />
                ) : locale === 'nl' ? (
                  <track
                    kind="subtitles"
                    src={data.subtitles.nl}
                    srcLang="nl"
                    label="Nederlands"
                    default
                  />
                ) : locale === 'de' ? (
                  <track
                    kind="subtitles"
                    src={data.subtitles.de}
                    srcLang="de"
                    label="Deutsch"
                    default
                  />
                ) : null}
              </Player>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">Loading...</div>
          )}
        </AspectRatio>
      </div>
      {/* <div className="mb-4 flex flex-col">
        <Card className="flex-1 shadow-md drop-shadow-md">
          <CardContent className="p-4 text-sm sm:text-base lg:text-lg">
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}

export default WebinarPlayer;
