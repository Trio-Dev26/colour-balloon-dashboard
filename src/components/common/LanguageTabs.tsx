'use client';

import type { ReactNode } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { LANGUAGES } from '@/constants/common';
import type { LanguageCode } from '@/types/ui/common.types';
import { LanguageTabsList } from './LanguageTabsList';

interface LanguageTabsProps {
   /** Renders the panel content for one language. Panels stay mounted, so form fields keep their state. */
   children: (language: LanguageCode) => ReactNode;
   /** Languages whose fields have validation errors get a red dot. */
   invalidLanguages?: LanguageCode[];
   /** Controlled active tab (optional); uncontrolled starting on English otherwise. */
   value?: LanguageCode;
   onValueChange?: (language: LanguageCode) => void;
}

// English / မြန်မာ segmented switch above the fields, without a card (Create / Edit Unit and Lesson dialogs).
// LanguageCard is the same switch inside a card heading.
export function LanguageTabs({ children, invalidLanguages, value, onValueChange }: LanguageTabsProps) {
   return (
      <Tabs
         defaultValue={LANGUAGES[0].value}
         value={value}
         onValueChange={(next: LanguageCode) => onValueChange?.(next)}
         className="gap-4"
      >
         <LanguageTabsList invalidLanguages={invalidLanguages} />
         {LANGUAGES.map((language) => (
            <TabsContent key={language.value} value={language.value} keepMounted className="data-hidden:hidden">
               {children(language.value)}
            </TabsContent>
         ))}
      </Tabs>
   );
}
