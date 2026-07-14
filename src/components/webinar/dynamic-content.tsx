'use client';

import React, {
  useEffect, useState, lazy, Suspense, useRef,
} from 'react';

interface DynamicContentProps {
  locale: string;
  data: any;
}

export default function DynamicContent({ locale, data }: DynamicContentProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const elementRef = useRef(null);
  let DynamicComponent = lazy(
    () => import(`@/app/[locale]/md/${locale}/${data[currentSlide].markdownSource}.mdx`),
  );

  useEffect(() => {
    const handleCarouselChange = (event: CustomEvent) => {
      try {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        DynamicComponent = lazy(
          () => import(`@/app/[locale]/md/${locale}/${data[currentSlide].markdownSource}.mdx`),
        );
      } catch (e) {
        console.log('Fehler DynamicComponent', e);
      }

      setCurrentSlide(event.detail.currentSlide);
    };

    // eslint-disable-next-line no-undef
    window.addEventListener('carouselChange', handleCarouselChange as EventListener);

    return () => {
      // eslint-disable-next-line no-undef
      window.removeEventListener('carouselChange', handleCarouselChange as EventListener);
    };
  }, []);

  function Loading({ height = 128 }) {
    // Standardwert 128, falls keine Höhe übergeben wird
    let h = height;
    if (elementRef.current != null) h = elementRef.current['clientHeight'];
    return <div style={{ height: `${h}px` }} />;
  }

  const renderSlideContent = () => (
    <div ref={elementRef}>
      <Suspense fallback={<Loading />}>
        <DynamicComponent />
      </Suspense>
    </div>
  );
  return <div>{renderSlideContent()}</div>;
}
