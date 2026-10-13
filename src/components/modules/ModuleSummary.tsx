import { ImageIcon } from 'lucide-react';
import { EntitySummary } from '@/components/common/EntitySummary';
import type { ModuleDetail } from '@/types/api/module.types';

// Title (EN + MY), description and cover image.
// TODO(api): show module.imageUrl here (<img … className="size-full object-cover" />) once the API stores images.
export function ModuleSummary({ module }: { module: ModuleDetail }) {
   return (
      <EntitySummary
         titleEn={module.titleEn}
         titleMy={module.titleMy}
         description={module.descriptionEn}
         aside={
            <div className="flex size-32.5 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted shadow-[0_4px_4px_0_color-mix(in_oklch,var(--primary)_25%,transparent)]">
               <ImageIcon className="size-8 text-tertiary-foreground" aria-label="No image" />
            </div>
         }
      />
   );
}
