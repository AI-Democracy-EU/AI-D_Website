import React from 'react';
// eslint-disable-next-line camelcase
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/navbar';

function Imprint({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);

  const t = useTranslations('Navigation');
  return (
    <div>
      <Navbar title={`AI.D - ${t('legal-notice.title')}`} />
      <div className="mx-auto mt-7 flex flex-col items-start px-4 md:px-6 xl:max-w-6xl">
        <div className="grid gap-4">
          <b>{`${t('legal-notice.coordinator')}:`}</b>
          Leibniz Universität Hannover
          <br />
          Institut für Didaktik der Demokratie
          <br />
          Dr. Wolfgang Beutel
          <b>{`${t('legal-notice.operator')}:`}</b>
          Höhere Technische Lehranstalt Wien West
          <br />
          Thaliastraße 125
          <br />
          1160 Vienna
          <br />
          Austria
          <br />
          +43 (01) 49 111-113
          <br />
          E-Mail: direktion@htlwienwest.at
          <br />
          {t('legal-notice.school-project')}
          <b>GitHub:</b>
          <div>
            {t('legal-notice.github-sources')}:{' '}
            <a
              className="hover:text-futurePink hover:underline"
              href="https://github.com/AI-Democracy-EU"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/AI-Democracy-EU
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Imprint;
