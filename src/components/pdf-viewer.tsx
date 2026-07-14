'use client';

import React from 'react';

type PdfViewerProps = {
  fileUrl: string;
};

function PdfViewer({ fileUrl }: PdfViewerProps) {
  return (
    <iframe title="AI.D" src={fileUrl} className="h-[80vh] w-full" />
  );
}

export default PdfViewer;
