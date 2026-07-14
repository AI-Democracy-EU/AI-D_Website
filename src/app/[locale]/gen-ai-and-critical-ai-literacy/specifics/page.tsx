import React from 'react';
import Detail from '@/components/webinar/webinar-detail';
import pageData from './data.json';

export default function DetailPage({ params }: { params: { locale: string } }) {
  return <Detail params={params} data={pageData} />;
}
