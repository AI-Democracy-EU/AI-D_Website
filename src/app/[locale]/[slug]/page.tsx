import { allRessources } from 'content-collections';
import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';
import BreadcrumbComponent from '@/components/breadcrumb';
import Navbar from '@/components/navbar';

export default function Ressource({ params }: { params: { locale: string; slug: string } }) {
  unstable_setRequestLocale(params.locale);
  const ressource = allRessources.find((r) => r._meta.path === `${params.locale}/${params.slug}`);
  if (!ressource) throw new Error(`Post not found for slug: ${params.slug}`);
  return (
    <>
      <Navbar title={ressource.title} />
      <article className="prose mx-auto max-w-4xl py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">{ressource.title}</h1>
          <BreadcrumbComponent />
        </div>
        <div dangerouslySetInnerHTML={{ __html: ressource.body }} />
      </article>
    </>
  );
}

export async function generateStaticParams() {
  return allRessources.map((ressource) => {
    const [locale, slug] = ressource._meta.path.split('/');
    return { locale, slug };
  });
}
