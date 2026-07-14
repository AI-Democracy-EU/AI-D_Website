import React from 'react';
import Detail from '@/components/material/material-detail';
import pageData from './data.json';

export default function DetailPage({ params }: { params: { locale: string } }) {
  const fixedParams = {
    ...params,
    color: 'bg-materials1',
  };

  return <Detail params={fixedParams} data={pageData} />;
}
