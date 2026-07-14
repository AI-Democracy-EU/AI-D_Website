import createNextIntlPlugin from 'next-intl/plugin';
import { withContentCollections } from '@content-collections/next';
import { withNextVideo } from 'next-video/process';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

const finalConfig = await withContentCollections(
  withNextIntl(withNextVideo(withMDX(nextConfig))),
);

// `next-video` adds a top-level `turbopack` config key that Next 14 rejects.
delete finalConfig.turbopack;

export default finalConfig;
