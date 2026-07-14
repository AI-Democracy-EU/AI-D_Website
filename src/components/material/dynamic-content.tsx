'use client';

import React, { lazy, Suspense, useRef } from 'react';

interface DynamicContentProps {
  locale: string;
  data: any;
}

export default function DynamicContent({ locale, data }: DynamicContentProps) {
  const elementRef = useRef(null);
  const DynamicComponent = lazy(
    () => import(`@/app/[locale]/md/${locale}/${data.markdownSource}.mdx`),
  );

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
