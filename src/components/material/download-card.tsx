import React from 'react';
// eslint-disable-next-line camelcase
import Image from 'next/image';
import moduleAssets from '@/data/module-assets.json';

const localeSuffixByLocale: Record<string, string> = {
  de: 'DE',
  en: 'EN',
  nl: 'NL',
};

const fallbackLocales = ['en', 'de', 'nl'];
const moduleAssetSet = new Set<string>(moduleAssets);

function normalizeFileExtensions(fileExtension?: string | string[]) {
  if (Array.isArray(fileExtension)) {
    return fileExtension.length > 0 ? fileExtension : ['pdf'];
  }

  return [fileExtension ?? 'pdf'];
}

function buildAssetPath(fileBase: string, locale: string, fileExtension = 'pdf') {
  const suffix = localeSuffixByLocale[locale] ?? locale.toUpperCase();
  return `https://aidstorage.blob.core.windows.net/aid/modules/${fileBase}_${suffix}.${fileExtension}`;
}

function getAssetFileName(fileBase: string, locale: string, fileExtension = 'pdf') {
  const suffix = localeSuffixByLocale[locale] ?? locale.toUpperCase();
  return `${fileBase}_${suffix}.${fileExtension}`;
}

function assetExists(fileBase: string, locale: string, fileExtension = 'pdf') {
  const fileName = getAssetFileName(fileBase, locale, fileExtension);
  return moduleAssetSet.has(fileName);
}

function resolveAssetLocale(fileBase: string, locale: string, fileExtension = 'pdf') {
  const locales = [locale, ...fallbackLocales].filter(
    (value, index, values) => values.indexOf(value) === index,
  );

  return (
    locales.find((candidateLocale) => assetExists(fileBase, candidateLocale, fileExtension))
    ?? locale
  );
}

function buildPdfViewerPath(
  fileBase: string,
  viewerLocale: string,
  assetLocale: string,
  from?: string,
  fileExtension = 'pdf',
) {
  const file = buildAssetPath(fileBase, assetLocale, fileExtension);
  const base = `/${viewerLocale}/pdf-viewer?file=${encodeURIComponent(file)}`;
  if (!from) return base;
  return `${base}&from=${encodeURIComponent(from)}`;
}

function getDownloadLabel(defaultLabel: string, fileExtension = 'pdf') {
  const normalizedExtension = fileExtension.toLowerCase();
  if (normalizedExtension === 'pdf') return defaultLabel;

  const extensionLabels: Record<string, string> = {
    ppt: 'PowerPoint',
    pptx: 'PowerPoint',
    doc: 'Word',
    docx: 'Word',
    xls: 'Excel',
    xlsx: 'Excel',
  };

  const formatLabel = extensionLabels[normalizedExtension] ?? normalizedExtension.toUpperCase();
  const baseLabel = defaultLabel.replace(/\s*pdf\s*$/i, '').trim();
  return `${baseLabel} ${formatLabel}`.trim();
}

function FileIcon({ fileExtension }: Readonly<{ fileExtension: string }>) {
  const normalizedExtension = fileExtension.toLowerCase();

  if (normalizedExtension === 'pdf') {
    return (
      <Image src="/pdf-icon.png" alt="PDF" width={36} height={36} className="block shrink-0" />
    );
  }

  if (normalizedExtension === 'pptx' || normalizedExtension === 'ppt') {
    return (
      <Image
        src="/pptx-icon.png"
        alt="PowerPoint"
        width={36}
        height={36}
        className="block shrink-0"
      />
    );
  }

  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-cableBlack/10 text-[10px] font-bold uppercase tracking-[0.08em] text-cableBlack">
      {normalizedExtension}
    </span>
  );
}

function DownloadAssetLink({
  fileBase,
  fileExtension,
  locale,
  ctaLabel,
  viewerFrom,
}: Readonly<{
  fileBase: string;
  fileExtension?: string;
  locale: string;
  ctaLabel: string;
  viewerFrom?: string;
}>) {
  const normalizedExtension = fileExtension?.toLowerCase() ?? 'pdf';
  const assetLocale = resolveAssetLocale(fileBase, locale, normalizedExtension);
  const assetPath = buildAssetPath(fileBase, assetLocale, normalizedExtension);
  const isPdf = normalizedExtension === 'pdf';
  const href = isPdf
    ? buildPdfViewerPath(fileBase, locale, assetLocale, viewerFrom, normalizedExtension)
    : assetPath;
  const fileName = assetPath.split('/').pop();
  const linkLabel = getDownloadLabel(ctaLabel, normalizedExtension);

  return (
    <a
      href={href}
      aria-label={`${linkLabel}: ${fileName ?? assetPath}`}
      download={isPdf ? undefined : fileName}
      className="group flex w-full items-end justify-between gap-2 rounded-md px-0 py-0 transition-colors hover:bg-white/30"
    >
      <div className="min-w-0 flex-1">
        <p className="break-all font-mono text-xs text-cableBlack/60 sm:truncate">{fileName}</p>
      </div>
      <span className="flex shrink-0 items-center justify-center px-1 pb-5 sm:px-0">
        <FileIcon fileExtension={normalizedExtension} />
      </span>
    </a>
  );
}

export default function DownloadCard({
  title,
  fileBase,
  fileExtension,
  locale,
  ctaLabel,
  viewerFrom,
  borderClassName,
}: Readonly<{
  title: string;
  fileBase: string;
  fileExtension?: string | string[];
  locale: string;
  ctaLabel: string;
  viewerFrom?: string;
  borderClassName?: string;
}>) {
  const extensions = normalizeFileExtensions(fileExtension);

  return (
    <div
      className={`rounded-lg border bg-white/80 px-2.5 py-2 shadow-sm transition-colors hover:bg-white sm:px-3 ${borderClassName ?? ''}`}
    >
      <p className="mb-0.5 break-words text-sm font-medium leading-tight text-cableBlack sm:text-base">
        {title}
      </p>
      <div className="space-y-0.5">
        {extensions.map((extension) => (
          <div key={`${fileBase}-${extension}`}>
            <DownloadAssetLink
              fileBase={fileBase}
              fileExtension={extension}
              locale={locale}
              ctaLabel={ctaLabel}
              viewerFrom={viewerFrom}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
