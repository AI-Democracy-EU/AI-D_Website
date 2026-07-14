import React from 'react';
// eslint-disable-next-line camelcase
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import BreadcrumbComponent from '@/components/breadcrumb';
import Navbar from '@/components/navbar';
import { Card, CardContent } from '@/components/ui/card';
import DownloadCard from '@/components/material/download-card';
import PageHeroImage from '@/components/page-hero-image';

type DownloadAsset = {
  titleKey: string;
  fileBase: string;
  fileExtension?: string | string[];
};

type TeachingUnit = {
  code: string;
  labelKey: string;
  titleKey: string;
  assets: DownloadAsset[];
  extraAssets?: DownloadAsset[];
};

type AssetGroup = {
  titleKey?: string;
  assets: DownloadAsset[];
};

type MaterialDetailData = {
  code: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  instruction?: DownloadAsset;
  teachingUnits?: TeachingUnit[];
  assetGroups?: AssetGroup[];
};

function getBorderClasses(color: string) {
  return {
    card: 'border-0',
    divider: '',
    link: 'border-0 hover:border-0',
    unit: 'border-0',
  };
}

export default function Detail({
  params: { locale, color = 'bg-muted' },
  data,
}: {
  params: { locale: string; color: string };
  data: MaterialDetailData;
}) {
  unstable_setRequestLocale(locale);

  const t = useTranslations('ModulesPage');
  const translate = (key: string) => t(key as never);
  const borderClasses = getBorderClasses(color);

  return (
    <>
      <Navbar title={`AI.D - ${translate(data.titleKey)}`} className={color} />
      <div className="mx-auto mt-7 flex flex-col gap-6 px-4 pb-10 md:px-6 xl:max-w-6xl">
        <div className="prose mx-auto w-full max-w-none prose-img:mb-0">
          <PageHeroImage src={data.image} alt={translate(data.titleKey)} />
          <BreadcrumbComponent />
          <div className="mt-4 max-w-full space-y-5">
            <Card className={`${color} ${borderClasses.card}`}>
              <CardContent className="space-y-5 px-5 py-4 md:px-6 md:py-5">
                <div className="flex flex-col gap-2 pb-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h2 className="font-garet-bold text-cableBlack md:text-2xl">
                        {translate(data.titleKey)}
                      </h2>
                      {translate(data.descriptionKey)}
                    </div>
                    {data.instruction && (
                      <div className="w-full md:max-w-md">
                        <div className="grid gap-3">
                          <DownloadCard
                            title={translate(data.instruction.titleKey)}
                            fileBase={data.instruction.fileBase}
                            fileExtension={data.instruction.fileExtension}
                            locale={locale}
                            ctaLabel={t('download')}
                            viewerFrom={translate(data.titleKey)}
                            borderClassName={borderClasses.link}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-5">
                  {data.teachingUnits?.map((unit) => (
                    <Card
                      key={`${data.code}-${unit.code}`}
                      className={`bg-black/[0.03] shadow-sm ${borderClasses.unit}`}
                    >
                      <CardContent className="p-3">
                        <div className="mb-3">
                          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cableBlack/60">
                            {translate(unit.labelKey)}
                          </p>
                          <h3 className="mt-1 font-garet-bold text-xl text-cableBlack md:text-2xl">
                            {translate(unit.titleKey)}
                          </h3>
                        </div>

                        <div className="grid gap-2 md:grid-cols-2">
                          {unit.assets.map((asset) => (
                            <DownloadCard
                              key={asset.fileBase}
                              title={translate(asset.titleKey)}
                              fileBase={asset.fileBase}
                              fileExtension={asset.fileExtension}
                              locale={locale}
                              ctaLabel={t('download')}
                              viewerFrom={translate(data.titleKey)}
                              borderClassName={borderClasses.link}
                            />
                          ))}
                        </div>

                        {unit.extraAssets && unit.extraAssets.length > 0 && (
                          <div className="mt-4">
                            <p className="mb-2 text-sm font-semibold text-cableBlack/80">
                              {t('additionalMaterials')}
                            </p>
                            <div className="grid gap-2 md:grid-cols-2">
                              {unit.extraAssets.map((asset) => (
                                <DownloadCard
                                  key={asset.fileBase}
                                  title={translate(asset.titleKey)}
                                  fileBase={asset.fileBase}
                                  fileExtension={asset.fileExtension}
                                  locale={locale}
                                  ctaLabel={t('download')}
                                  viewerFrom={translate(data.titleKey)}
                                  borderClassName={borderClasses.link}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {data.assetGroups?.map((group, index) => (
                    <Card
                      key={`${data.code}-group-${index + 1}`}
                      className={`bg-black/[0.03] shadow-sm ${borderClasses.unit}`}
                    >
                      <CardContent className="p-3">
                        {group.titleKey && (
                          <div className="mb-3">
                            <h3 className="font-garet-bold text-xl text-cableBlack md:text-2xl">
                              {translate(group.titleKey)}
                            </h3>
                          </div>
                        )}

                        <div className="grid gap-2 md:grid-cols-2">
                          {group.assets.map((asset) => (
                            <DownloadCard
                              key={asset.fileBase}
                              title={translate(asset.titleKey)}
                              fileBase={asset.fileBase}
                              fileExtension={asset.fileExtension}
                              locale={locale}
                              ctaLabel={t('download')}
                              viewerFrom={translate(data.titleKey)}
                              borderClassName={borderClasses.link}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
