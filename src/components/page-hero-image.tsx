import Image from 'next/image';
import React from 'react';

type PageHeroImageProps = {
  src: string;
  alt: string;
};

function PageHeroImage({ src, alt }: Readonly<PageHeroImageProps>) {
  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg shadow-sm sm:aspect-[5/2] lg:aspect-[3/1]">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(min-width: 1280px) 1152px, (min-width: 768px) calc(100vw - 3rem), calc(100vw - 2rem)"
        className="rounded-lg object-cover object-center"
      />
    </div>
  );
}

export default PageHeroImage;
