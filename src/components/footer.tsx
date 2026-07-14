'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/navigation';
import { useMediaQuery } from 'react-responsive';

function Footer() {
  const tNavi = useTranslations('Navigation');
  const tBiblio = useTranslations('Bibliography');
  const tCopyright = useTranslations('Copyright');
  const tFunding = useTranslations('Funding');
  const pathname = usePathname();
  const hidePath = ['/', '/*/partners', '/*/legal-notice', '/*/bibliography'];
  
  // Track if component is mounted to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show CIF logo only on specific pages
  const shouldCifBeHidden = () =>
    hidePath.some((path) => {
      if (path === pathname) return true;

      // Handle wildcard paths like '/*/partners'
      if (path.includes('*')) {
        const pathnameParts = pathname.split('/');
        const pathParts = path.split('/');
        if (pathnameParts.length !== pathParts.length) return false;
        for (let i = 0; i < pathnameParts.length; i++) {
          if (pathParts[i] === '*') continue; // Skip wildcard parts
          if (pathnameParts[i] !== pathParts[i]) return false; // Mismatch found
        }
        return true; // All parts match
      }

      return false; // No match found
    });

  const hideCifFooter = shouldCifBeHidden();
  const useShortFooter = useMediaQuery({
    query: '(max-width: 767px)',
  });
  
  // Use desktop layout on server and during initial render to prevent hydration mismatch
  const displayShortFooter = isMounted ? useShortFooter : false;

  const links = [
    { href: '/partners', text: tNavi('partners.title') },
    { href: '/legal-notice', text: tNavi('legal-notice.title') },
    {
      href: 'https://www.bmbwf.gv.at/Themen/schule/schulrecht/ds.html',
      text: tNavi('privacy.title'),
    },
    { href: '/bibliography', text: tBiblio('bibliography') },
    // { href: 'mailto:contact@aid.eu', text: t('partners.title'), isEmail: true },
  ];
  return (
    <footer className="mx-auto px-4 py-12 md:container">
      {/* Footer links */}
      <div className="mb-8 text-center text-xs">
        {links.map((link, index) => (
          <span key={link.href}>
            <Link href={link.href}>{link.text}</Link>
            {index < links.length - 1 && ' | '}
          </span>
        ))}
      </div>

      {displayShortFooter && (
        <div>
          <div className="grid content-center justify-items-center text-center text-xs">
            <Image
              priority
              src={`/${tFunding('eu.logo')}`}
              height={71}
              width={320}
              alt={tFunding('eu.alt')}
              className="me-4 max-h-[71px] max-w-[320px] self-center"
            />
            <p className="mt-4 max-w-prose self-center md:mt-0">{tFunding('eu.text')}</p>
          </div>
          {!hideCifFooter && (
            <div className="mt-8 grid content-center justify-items-center text-center text-xs">
              <a
                href="https://thecivics.eu/projects/civic-innovation-fund/"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  priority
                  src={`/${tFunding('cif.logo')}`}
                  height={30}
                  width={100}
                  alt={tFunding('cif.alt')}
                  className="ms-4 max-w-[100px] self-center"
                />
              </a>
              <div className="max-w-prose self-center md:mt-0">
                <div dangerouslySetInnerHTML={{ __html: tFunding.raw('cif.text') }} />
              </div>
            </div>
          )}
        </div>
      )}
      {!displayShortFooter && (
        <div>
          <div className="flex items-start justify-start text-left text-xs">
            <Image
              priority
              src={`/${tFunding('eu.logo')}`}
              height={71}
              width={320}
              alt={tFunding('eu.alt')}
              className="me-4 max-w-[320px]"
            />
            <div className="max-w-prose">{tFunding('eu.text')}</div>
          </div>
          {!hideCifFooter && (
            <div className="mt-4 flex items-start justify-end text-right text-xs">
              <div
                className="max-w-prose"
                dangerouslySetInnerHTML={{ __html: tFunding.raw('cif.text') }}
              />
              <a
                href="https://thecivics.eu/projects/civic-innovation-fund/"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  priority
                  src={`/${tFunding('cif.logo')}`}
                  height={30}
                  width={100}
                  alt={tFunding('cif.alt')}
                  className="ms-4 max-w-[100px]"
                />
              </a>
            </div>
          )}
        </div>
      )}

      {/* CC BY-SA Lizenz-Hinweis */}
      <div className="mt-6 flex items-start text-[10px]">
        <Image
          src="/icons/by-sa.svg"
          alt="Creative Commons Lizenz: CC BY-SA 4.0"
          width={80}
          height={24}
          priority
          className="me-2 flex-shrink-0"
        />
        <div className="leading-tight">
          <p className="m-0">{tCopyright('copyright')}</p>
          <p className="m-0">
            {tCopyright('license')}
            &nbsp;
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              CC BY-SA 4.0
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
