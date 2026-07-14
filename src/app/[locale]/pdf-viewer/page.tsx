'use client';

import React, { Suspense, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/navbar';

const PdfViewer = dynamic(() => import('@/components/pdf-viewer'), {
  ssr: false,
});

function PdfViewerContent() {
  const tBib = useTranslations('Bibliography');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fileParam = searchParams.get('file') || '';
  const fromParam = searchParams.get('from') || '';

  const fileUrl = useMemo(() => {
    let decoded = fileParam;
    try {
      decoded = decodeURIComponent(fileParam);
    } catch {
      return '';
    }
    if (decoded.startsWith('/')) return decoded;
    try {
      const url = new URL(decoded);
      const isAllowedBlobUrl =
        url.protocol === 'https:' && url.hostname === 'aidstorage.blob.core.windows.net';

      return isAllowedBlobUrl ? url.toString() : '';
    } catch {
      return '';
    }
  }, [fileParam]);

  const localizedFrom = useMemo(() => {
    if (!fileUrl) return '';

    const byFile: Record<string, string> = {
      '/w1/literature_ai_fundamentals.pdf': tBib('heading'),
      '/w2/literature_genai.pdf': tBib('heading'),
      '/w3/literature_algorithms_e-recruiting.pdf': tBib('heading'),
      '/w4/literature_ai_tutors.pdf': tBib('heading'),
      '/w2/AID_Webinar_2_Resource_1_AID_Prompting_Guide_EN.pdf': tBib('w2.heading'),
      '/w3/AID_Webinar_3_Resources_1_and_2_Exercises_Application_Ranking_EN.pdf':
        tBib('w3.heading'),
    };

    return byFile[fileUrl] || '';
  }, [fileUrl, tBib]);

  useEffect(() => {
    if (!localizedFrom) return;

    let decoded = fromParam;
    try {
      decoded = decodeURIComponent(fromParam);
    } catch {
      decoded = fromParam;
    }

    if (decoded === localizedFrom) return;

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set('from', localizedFrom);
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  }, [fromParam, localizedFrom, pathname, router, searchParams]);

  const title = useMemo(() => {
    if (localizedFrom) return localizedFrom;
    if (!fromParam) return 'AI.D';

    let decoded = fromParam;
    try {
      decoded = decodeURIComponent(fromParam);
    } catch {
      return 'AI.D';
    }

    const cleaned = decoded.trim();
    return cleaned || 'AI.D';
  }, [fromParam, localizedFrom]);

  return (
    <div>
      <Navbar title={title} />
      {fileUrl ? (
        <PdfViewer fileUrl={fileUrl} />
      ) : (
        <p className="mx-auto max-w-4xl px-4 py-10 text-sm md:text-base">Error loading File.</p>
      )}
    </div>
  );
}

function PdfViewerPage() {
  return (
    <Suspense
      fallback={<p className="mx-auto max-w-4xl px-4 py-10 text-sm md:text-base">Loading...</p>}
    >
      <PdfViewerContent />
    </Suspense>
  );
}

export default PdfViewerPage;
