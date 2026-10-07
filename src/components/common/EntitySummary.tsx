import type { ReactNode } from 'react';
import { EMPTY_VALUE } from '@/constants/common';
import { RichTextView } from './rich-text/RichTextView';

interface EntitySummaryProps {
   titleEn: string;
   titleMy?: string;
   /** English description HTML. */
   description?: string;
   /** Optional content on the right, e.g. the module cover image. */
   aside?: ReactNode;
}

// Big English title, Myanmar title underneath, then the description (detail pages).
export function EntitySummary({ titleEn, titleMy, description, aside }: EntitySummaryProps) {
   return (
      <section className="flex items-center justify-between gap-6">
         <div className="flex max-w-182.5 min-w-0 flex-col gap-3">
            <div className="flex flex-col gap-2">
               <h2 className="text-2xl leading-7.5 font-bold tracking-[-0.5px]">{titleEn || EMPTY_VALUE}</h2>
               {titleMy && (
                  <p className="font-myanmar text-xl leading-6 font-medium text-muted-foreground">{titleMy}</p>
               )}
            </div>
            {description && <RichTextView html={description} className="text-base text-muted-foreground" />}
         </div>
         {aside}
      </section>
   );
}
