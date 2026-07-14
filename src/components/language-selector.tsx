'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';
import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function LanguageSelector() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState(
    pathname.split('/')[1].toUpperCase() || 'EN',
  );

  const languageOptions = {
    EN: 'English',
    DE: 'Deutsch',
    NL: 'Nederlands',
  };

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    const currentParams = pathname.split('/').slice(2);
    const newPathname = `/${newLanguage.toLowerCase()}/${currentParams.join('/')}`;
    const queryString = searchParams.toString();
    router.replace(queryString ? `${newPathname}?${queryString}` : newPathname);
  };
  return (
    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="flex h-8 items-center rounded-3xl px-2 font-bold">
        <SelectValue placeholder="Select language">{selectedLanguage}</SelectValue>
        <Globe className="ml-2 w-5" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(languageOptions).map(([code, name]) => (
            <SelectItem key={code} value={code} className="pl-2">
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default LanguageSelector;
