import { ImageIcon } from 'lucide-react';
import { RichTextView } from '@/components/common/rich-text/RichTextView';
import { EMPTY_VALUE } from '@/constants/common';
import type { ModuleDetail } from '@/types/api/module.types';

// Title (EN + MY), description and cover image.
export function ModuleSummary({ module }: { module?: ModuleDetail }) {
   return (
      <section className="flex items-center justify-between gap-6">
         <div className="flex max-w-182.5 min-w-0 flex-col gap-3">
            <div className="flex flex-col gap-2">
               <h2 className="text-2xl leading-7.5 font-bold tracking-[-0.5px]">{module?.titleEn || EMPTY_VALUE}</h2>
               {module?.titleMy && (
                  <p className="font-myanmar text-xl leading-6 font-medium text-muted-foreground">{module.titleMy}</p>
               )}
            </div>
            {module?.descriptionEn && (
               <RichTextView html={module.descriptionEn} className="text-base text-muted-foreground" />
            )}
         </div>
         <div className="flex size-32.5 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted shadow-[0_4px_4px_0_color-mix(in_oklch,var(--primary)_25%,transparent)]">
            {module?.imageUrl ? (
               // eslint-disable-next-line @next/next/no-img-element -- signed storage URL
               <img src={module.imageUrl} alt={module.titleEn} className="size-full object-cover" />
            ) : (
               <ImageIcon className="size-8 text-tertiary-foreground" aria-label="No image" />
            )}
         </div>
      </section>
   );
}
