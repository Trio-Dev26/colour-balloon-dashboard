'use client';

import type { ReactNode } from 'react';
import { LANGUAGES } from '@/constants/common';
import type { LanguageCode } from '@/types/ui/common.types';
import { UnderlineTabs } from './UnderlineTabs';

interface LanguageTabsProps {
   /** Renders the panel content for one language. */
   children: (language: LanguageCode) => ReactNode;
   /** Languages whose fields have validation errors get a red dot. */
   invalidLanguages?: LanguageCode[];
   /** Controlled active tab (optional); uncontrolled starting on English otherwise. */
   value?: LanguageCode;
   onValueChange?: (language: LanguageCode) => void;
}

// English / မြန်မာ underline tabs used for every bilingual form and detail section.
export function LanguageTabs({ children, invalidLanguages = [], value, onValueChange }: LanguageTabsProps) {
   const tabs = LANGUAGES.map((language) => ({
      value: language.value,
      className: language.className,
      label: (
         <>
            {language.label}
            {invalidLanguages.includes(language.value) && (
               <span className="size-1.5 rounded-full bg-destructive" aria-label="has errors" />
            )}
         </>
      ),
   }));

   return (
      <UnderlineTabs tabs={tabs} value={value} onValueChange={onValueChange}>
         {children}
      </UnderlineTabs>
   );
}
