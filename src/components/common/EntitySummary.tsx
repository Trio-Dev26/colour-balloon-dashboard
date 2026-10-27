'use client';

import type { ReactNode } from 'react';
import { EMPTY_VALUE } from '@/constants/common';
import { cn } from '@/lib/utils';
import type { LanguageCode } from '@/types/ui/common.types';
import { LanguageTabs } from './LanguageTabs';
import { RichTextView } from './rich-text/RichTextView';

interface EntitySummaryProps {
   titleEn: string;
   titleMy?: string;
   /** Description HTML per language. */
   descriptionEn?: string;
   descriptionMy?: string;
   /** Optional content on the right, e.g. the module cover image. */
   aside?: ReactNode;
   /** Extra bilingual content shown under the description in the same language tab. */
   children?: (language: LanguageCode) => ReactNode;
}

// Detail pages: English / မြန်မာ tabs, each showing that language's title and description only.
export function EntitySummary({ titleEn, titleMy, descriptionEn, descriptionMy, aside, children }: EntitySummaryProps) {
   return (
      <section className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between">
         <div className="max-w-182.5 min-w-0 flex-1">
            <LanguageTabs>
               {(language) => {
                  const isMy = language === 'my';
                  const title = isMy ? titleMy : titleEn;
                  const description = isMy ? descriptionMy : descriptionEn;
                  return (
                     <div className={cn('flex flex-col gap-3', isMy && 'font-myanmar')}>
                        <h2 className="text-2xl leading-7.5 font-bold tracking-[-0.5px]">{title || EMPTY_VALUE}</h2>
                        {description && <RichTextView html={description} className="text-base text-muted-foreground" />}
                        {children?.(language)}
                     </div>
                  );
               }}
            </LanguageTabs>
         </div>
         {aside}
      </section>
   );
}
