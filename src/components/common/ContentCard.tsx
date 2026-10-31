'use client';

import type { ReactNode } from 'react';
import { EMPTY_VALUE, LANGUAGES } from '@/constants/common';
import { cn } from '@/lib/utils';
import { LanguageCard } from './LanguageCard';
import { RichTextView } from './rich-text/RichTextView';
import type { LanguageCode } from '@/types/ui/common.types';

interface ContentCardProps {
   titleEn: string;
   titleMy?: string;
   /** Description HTML per language. */
   descriptionEn?: string;
   descriptionMy?: string;
   /** More content for that language under the description (e.g. a module's goal and outcome). */
   children?: (language: LanguageCode) => ReactNode;
}

// Read-only "CONTENT" card: that language's title and description (quiz and module detail pages).
export function ContentCard({ titleEn, titleMy, descriptionEn, descriptionMy, children }: ContentCardProps) {
   const content = {
      en: { title: titleEn, description: descriptionEn },
      my: { title: titleMy, description: descriptionMy },
   };

   return (
      <LanguageCard title="Content">
         {(code) => {
            const { title, description } = content[code];
            const language = LANGUAGES.find((option) => option.value === code);
            return (
               <div className={cn('flex flex-col gap-3', language?.className)}>
                  <h2 className="text-2xl leading-7.5 font-bold tracking-[-0.5px]">{title || EMPTY_VALUE}</h2>
                  {description && <RichTextView html={description} className="text-base text-muted-foreground" />}
                  {children?.(code)}
               </div>
            );
         }}
      </LanguageCard>
   );
}
