'use client';

import LanguageSelector from '@/components/language-selector';
import SheetNavigation from '@/components/sheet-navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { Suspense } from 'react';

interface NavbarProps {
  title: string;
  className?: string;
}

function Navbar({ title, className }: NavbarProps) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  return (
    <nav
      className={cn(
        'sticky inset-x-0 top-0 z-40 h-fit border-b border-primary bg-[#c2edf2] bg-muted py-2 font-light',
        className,
      )}
    >
      <div className="max-w-7-xl mx-auto flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Sheet key="left">
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size="30" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href={`/${locale}`} className="mb-2 mt-2 flex hidden items-center lg:block">
                <SheetTitle>AI.D</SheetTitle>
              </Link>
              <SheetNavigation />
            </SheetContent>
          </Sheet>
          <Link href={`/${locale}`} className="mb-2 mt-2 flex hidden items-center lg:block">
            <Image priority src="/favicon.png" width={45} height={45} alt="AI.D logo" />
          </Link>
        </div>
        <div className="text-center font-garet-bold">
          <h1 className="p-2 text-xs font-bold sm:p-0 sm:text-sm lg:text-2xl">{title}</h1>
        </div>
        <div className="flex items-center justify-end">
          <Suspense fallback={<div className="h-8 w-[92px]" aria-hidden="true" />}>
            <LanguageSelector />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
