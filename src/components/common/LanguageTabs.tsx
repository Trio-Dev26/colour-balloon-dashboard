'use client';

import type { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LANGUAGES } from '@/constants/common';
import { cn } from '@/lib/utils';
import type { LanguageCode } from '@/types/ui/common.types';

interface LanguageTabsProps {
   /** Renders the panel content for one language. */
   children: (language: LanguageCode) => ReactNode;
   /** Languages whose fields have validation errors get a red dot. */
   invalidLanguages?: LanguageCode[];
}

// English / မြန်မာ underline tabs used for every bilingual form and detail section.
export function LanguageTabs({ children, invalidLanguages = [] }: LanguageTabsProps) {
   return (
      <Tabs defaultValue={LANGUAGES[0].value} className="gap-3">
         <TabsList variant="line" className="h-auto w-full justify-start gap-0 rounded-none border-b p-0">
            {LANGUAGES.map((language) => (
               <TabsTrigger
                  key={language.value}
                  value={language.value}
                  className={cn(
                     'w-20 flex-none px-3 py-2 text-sm font-normal text-muted-foreground data-active:font-medium data-active:text-accent-foreground',
                     'group-data-horizontal/tabs:after:bottom-[-1px] after:h-0.5 after:rounded-t-xs after:bg-primary',
                     language.className
                  )}
               >
                  {language.label}
                  {invalidLanguages.includes(language.value) && (
                     <span className="size-1.5 rounded-full bg-destructive" aria-label="has errors" />
                  )}
               </TabsTrigger>
            ))}
         </TabsList>
         {LANGUAGES.map((language) => (
            <TabsContent key={language.value} value={language.value} keepMounted className="data-hidden:hidden">
               {children(language.value)}
            </TabsContent>
         ))}
      </Tabs>
   );
}
