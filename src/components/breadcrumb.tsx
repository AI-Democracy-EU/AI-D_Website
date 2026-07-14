'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link, usePathname } from '@/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BreadcrumbComponentProps {
  className?: string;
}

function BreadcrumbComponent({ className }: BreadcrumbComponentProps) {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);

  const t = useTranslations('Breadcrumbs');
  const nav = useTranslations('Navigation');

  // Get the current course and section
  const currentCourse = pathNames[0]; // e.g., 'fundamentals', 'genai'
  const currentSection = pathNames[pathNames.length - 1];

  // this array of special paths should never show as dropdowns
  const nonSectionPaths = ['quiz'];

  // Helper to get available sections for the current course
  const getCourseSections = (course: string) => {
    try {
      const courseData = Object.entries(nav.raw(`${course}`));
      return courseData
        .filter(([key]) => key !== 'title' && !nonSectionPaths.includes(key))
        .map(([key]) => key);
    } catch {
      return [];
    }
  };

  // Modify the isSection check
  const isSection =
    currentCourse
    && getCourseSections(currentCourse).includes(currentSection)
    && !nonSectionPaths.includes(currentSection);

  const formatDefaultText = (text: string) =>
    text
      .replace(/-/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const formatLinkText = (text: string, index: number) => {
    // Handle language code
    if (text.length === 2) return text.toUpperCase();

    // If it's the first segment (course name), get the title from Navigation
    if (index === 0) {
      try {
        return nav(`${text}.title`);
      } catch {
        return formatDefaultText(text);
      }
    }

    // If it's a section, get it from Navigation
    if (currentCourse && index === 1) {
      try {
        return nav(`${currentCourse}.${text}`);
      } catch {
        return formatDefaultText(text);
      }
    }

    return formatDefaultText(text);
  };

  return (
    <Breadcrumb className={cn('mb-2', 'ms-0', className)}>
      <BreadcrumbList className="ps-0">
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/">{t('home')}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbLink>
            {currentCourse.startsWith('material') ? (
              <Link href="/materials">{t('materials')}</Link>
            ) : (
              <Link href="/webinars">{t('webinars')}</Link>
            )}
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>

        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const itemLink = formatLinkText(link, index);

          if (index === pathNames.length - 1 && isSection) {
            const articlePath = href.split('/').slice(0, -1).join('/');
            const sections = getCourseSections(currentCourse);

            return (
              <BreadcrumbItem key={index}>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    {itemLink}
                    <ChevronDownIcon className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {sections.map((section) => (
                      <DropdownMenuItem key={section} asChild>
                        <Link href={`${articlePath}/${section}`}>
                          {nav(`${currentCourse}.${section}`)}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            );
          }

          return (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink>
                <Link href={href}>{itemLink}</Link>
              </BreadcrumbLink>
              {index < pathNames.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbComponent;
