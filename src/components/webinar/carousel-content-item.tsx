import Image from 'next/image';
import React from 'react';
import {
  CarouselItem,
} from '@/components/ui/carousel';

export interface CarouselContentItem {
  src: string;
  alt: string;
  listHeadline: string;
  listContent: string[] | null;
  // eslint-disable-next-line react/no-unused-prop-types
  markdownSource: string;
}
export interface InstagramCarouselProps {
  carouselContent: CarouselContentItem[];
}

// eslint-disable-next-line react/function-component-definition
export const CarouselStandardSlide: React.FC<CarouselContentItem> = ({
  src,
  alt,
  listHeadline,
  listContent,
}) => {
  const textColors = ['text-black']; // , "text-[#C2EDF2]", "text-white"];
  const backgroundColors = ['bg-[#C2EDF2]']; // , "bg-[#8552F2]", "bg-black"];

  return (
    <CarouselItem>
      <div className="relative h-[40vh]">
        <Image
          className="pt-50 pb-20"
          src={src}
          alt={alt}
          fill
          style={{ objectFit: src.includes('ai-generic') ? 'cover' : 'contain' }}
        />
        {
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-full px-4 text-center">
              <ul className="list-disc" style={{ padding: '0 30px' }}>
                <li className="mb-4 block">
                  {/* inline-block für den Text, damit der Hintergrund nur um den Text ist */}
                  <span
                    className={`inline-block rounded-md p-2 text-sm lg:text-2xl ${backgroundColors[0]} ${textColors[0]}`}
                  >
                    <b>{listHeadline}</b>
                  </span>
                </li>
                {/* TODO Richard remove slice(0, 1) */}
                {listContent
                  && listContent.length > 0
                  && listContent.slice(0, 1).map((content) => (
                    <li className="mb-4 block">
                      <span
                        className={`inline-block rounded-md p-2 text-sm lg:text-2xl ${backgroundColors[0]} ${textColors[0]}`}
                      >
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        }
      </div>
    </CarouselItem>
  );
};
