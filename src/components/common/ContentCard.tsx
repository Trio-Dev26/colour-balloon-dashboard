'use client';

import { EMPTY_VALUE, LANGUAGES } from '@/constants/common';
import { cn } from '@/lib/utils';
import { LanguageCard } from './LanguageCard';
import { RichTextView } from './rich-text/RichTextView';

interface ContentCardProps {
   titleEn: string;
   titleMy?: string;
   /** Description HTML per language. */
   descriptionEn?: string;
   descriptionMy?: string;
}

// Read-only "CONTENT" card: that language's title and description (quiz detail page).
export function ContentCard({ titleEn, titleMy, descriptionEn, descriptionMy }: ContentCardProps) {
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
               </div>
            );
         }}
      </LanguageCard>
   );
}
