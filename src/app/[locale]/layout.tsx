import { Inter } from 'next/font/google';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import Footer from '@/components/footer';
import { locales } from '@/navigation';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '600', '700', '800'],
});

// const customFont = localFont({
//   src: "../../public/fonts/CalSans-SemiBold.ttf", variable: "--font-custom",
// });

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'WebsiteMetadata' });
  return {
    title: {
      default: t('title'),
      template: '%s | AI.D',
    },
    description: t('description'),
    metadataBase: new URL(process.env.NEXT_PUBLIC_WEBAPP_URL ?? 'https://www.democracy-ai.eu'),
    alternates: {
      canonical: '/',
      languages: {
        en: '/en',
        de: '/de',
        nl: '/nl',
      },
    },
    openGraph: {
      title: {
        default: t('title'),
        template: '%s | AI.D',
      },
      description: t('description'),
      url: 'https://www.democracy-ai.eu',
      siteName: 'AI.D',
      type: 'website',
      locale: params.locale,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/aid-favicon.ico',
      shortcut: '/favicon.png',
      apple: '/apple-icon.png',
    },
    twitter: {
      title: t('twitter-title'),
      card: 'summary_large_image',
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages({ locale });
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
