'use client';

import type { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LANGUAGES } from '@/constants/common';
import { cn } from '@/lib/utils';
import type { LanguageCode } from '@/types/ui/common.types';
import { CardSection } from './CardSection';

interface LanguageCardProps {
   /** Card heading, e.g. "Content". */
   title: string;
   /** Renders one language's content. Panels stay mounted, so form fields keep their state. */
   children: (language: LanguageCode) => ReactNode;
   /** Languages whose fields have validation errors get a red dot. */
   invalidLanguages?: LanguageCode[];
   value?: LanguageCode;
   onValueChange?: (language: LanguageCode) => void;
}

// CardSection with an English / မြန်မာ segmented switch in its heading row.
export function LanguageCard({ title, children, invalidLanguages = [], value, onValueChange }: LanguageCardProps) {
   return (
      <Tabs
         defaultValue={LANGUAGES[0].value}
         value={value}
         onValueChange={(next: LanguageCode) => onValueChange?.(next)}
      >
         <CardSection
            title={title}
            action={
               <TabsList>
                  {LANGUAGES.map((language) => (
                     <TabsTrigger
                        key={language.value}
                        value={language.value}
                        className={cn('px-3', language.className)}
                     >
                        {language.label}
                        {invalidLanguages.includes(language.value) && (
                           <span className="size-1.5 rounded-full bg-destructive" aria-label="has errors" />
                        )}
                     </TabsTrigger>
                  ))}
               </TabsList>
            }
         >
            {LANGUAGES.map((language) => (
               <TabsContent key={language.value} value={language.value} keepMounted className="data-hidden:hidden">
                  {children(language.value)}
               </TabsContent>
            ))}
         </CardSection>
      </Tabs>
   );
}
