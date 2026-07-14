import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import BreadcrumbComponent from '@/components/breadcrumb';
import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';

function Partner({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
  // Translation hook
  unstable_setRequestLocale(locale);
  const t = useTranslations('PartnersPage');

  return (
    <section className="w-full">
      <Navbar title="Partners" />
      <div className="mx-auto mt-7 flex flex-col items-start px-4 md:px-6 xl:max-w-6xl">
        <BreadcrumbComponent />
        <div className="grid gap-8">
          {/* Partner Gottfried Wilhelm Leibniz Universität Hannover */}
          <div className="my-1 flex flex-col items-start">
            <div className="flex flex-col items-start lg:flex-row lg:items-center">
              <a href="https://www.uni-hannover.de/de/" className="mt-3">
                <Image
                  src="/partners/luh_logo_rgb_0_80_155.jpg"
                  alt="Logo of the Leibniz University Hannover"
                  width={290}
                  height={32}
                  className="mr-0 md:mr-5"
                />
              </a>
              <a href="https://www.idd.uni-hannover.de/de/" className="mt-3 w-[290px] md:w-auto">
                <Image
                  src="/partners/IDD_Logo_RGB_transparent.png"
                  alt="Logo of the 'Institut für Didaktik der Demokratie' at the Leibniz University Hannover"
                  width={585}
                  height={32}
                />
              </a>
            </div>
            <div className="mt-7 space-y-1 text-left">
              <a
                href="https://www.uni-hannover.de/de/"
                className="hover:text-futurePink hover:underline"
              >
                <h3 className="text-2xl font-semibold">
                  Gottfried Wilhelm Leibniz Universität Hannover
                </h3>
              </a>
              <p className="text-md text-balance">{t('LUH.content')}</p>
            </div>
          </div>

          {/* Partner Bundesarbeitskreis Arbeit und Leben (DGB/VHS) */}
          <div className="my-8 flex flex-col items-start">
            <a href="https://arbeitundleben.de/">
              <Image
                src="/partners/AL_LOGO_RGB.png"
                alt="Logo of 'Bundesarbeitskreis Arbeit und Leben'"
                width={350}
                height={32}
              />
            </a>
            <div className="mt-7 space-y-1 text-left">
              <a
                href="https://arbeitundleben.de/"
                className="hover:text-futurePink hover:underline"
              >
                <h3 className="text-2xl font-semibold">
                  Bundesarbeitskreis Arbeit und Leben (DGB/VHS)
                </h3>
              </a>
              <p className="text-md text-balance">{t('DGB.content')}</p>
            </div>
          </div>

          {/* Partner Höhere Technische Bundeslehranstalt Wien 16 */}
          <div className="my-8 flex flex-col items-start">
            <a href="https://www.htlwienwest.at/">
              <Image
                src="/partners/Logo_HTL_Wien_West_small_transparent.png"
                alt="Logo of HTL Wien West (Höhere Technische Bundeslehranstalt Wien 16)"
                width={215}
                height={32}
              />
            </a>
            <div className="mt-7 space-y-1 text-left">
              <a
                href="https://www.htlwienwest.at/"
                className="hover:text-futurePink hover:underline"
              >
                <h3 className="text-2xl font-semibold">
                  Höhere Technische Bundeslehranstalt Wien 16
                </h3>
              </a>
              <p className="text-md text-balance">{t('HTL.content')}</p>
            </div>
          </div>

          {/* Partner Demokratiezentrum Wien GmbH */}
          <div className="my-8 flex flex-col items-start">
            <a href="https://www.demokratiezentrum.org">
              <Image
                src="/partners/dz_logo_final_vektor_orange_kreis_400px_transparent.png"
                alt="Logo of the 'Demokratiezentrum Wien GmbH'"
                width={175}
                height={32}
              />
            </a>
            <div className="mt-7 space-y-1 text-left">
              <a
                href="https://www.demokratiezentrum.org"
                className="hover:text-futurePink hover:underline"
              >
                <h3 className="text-2xl font-semibold">Demokratiezentrum Wien GmbH</h3>
              </a>
              <p className="text-md text-balance">{t('DemoWien.content')}</p>
            </div>
          </div>

          {/* Partner Österreichische Akademie der Wissenschaften */}
          <div className="my-8 flex flex-col items-start">
            <div>
              <a href="https://www.oeaw.ac.at" className="inline-block">
                <Image
                  src="/partners/OEAW_Logo_2024.png"
                  alt="Logo of the 'Österreichische Akademie der Wissenschaften'"
                  width={250}
                  height={32}
                />
              </a>
              <a href="https://www.oeaw.ac.at/ita" className="inline-block">
                <Image
                  src="/partners/OEAW_ITA_Logo_2024.png"
                  alt="Logo of the 'Institute of Technology Assessment at Österreichische Akademie der Wissenschaften'"
                  width={350}
                  height={32}
                />
              </a>
            </div>
            <div className="mt-7 space-y-1 text-left">
              <h3 className="text-2xl font-semibold">
                <a href="https://www.oeaw.ac.at" className="hover:text-futurePink hover:underline">
                  Österreichische Akademie der Wissenschaften
                </a>
                &nbsp;/&nbsp;
                <a
                  href="https://www.oeaw.ac.at/ita"
                  className="hover:text-futurePink hover:underline"
                >
                  Institute of Technology Assessment
                </a>
              </h3>
              <p className="text-md text-balance">{t('OEAW.content')}</p>
            </div>
          </div>

          {/* Partner LUCA School of Arts */}
          <div className="my-8 flex flex-col items-start">
            <a href="https://www.luca-arts.be">
              <Image
                src="/partners/luca_transparent.png"
                alt="Logo of the LUCA School of Arts"
                width={165}
                height={32}
              />
            </a>
            <div className="mt-7 space-y-1 text-left">
              <a href="https://www.luca-arts.be" className="hover:text-futurePink hover:underline">
                <h3 className="text-2xl font-semibold">LUCA School of Arts</h3>
              </a>
              <p className="text-md text-balance">{t('LUCA.content')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Partner;
