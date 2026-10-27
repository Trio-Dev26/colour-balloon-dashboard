import { ImageIcon } from 'lucide-react';
import { EntitySummary } from '@/components/common/EntitySummary';
import type { ModuleDetail } from '@/types/api/module.types';
import { ModuleIntroduction } from './ModuleIntroduction';

// Per-language title, description, goal and outcome, plus the cover image.
export function ModuleSummary({ module }: { module: ModuleDetail }) {
   return (
      <EntitySummary
         titleEn={module.titleEn}
         titleMy={module.titleMy}
         descriptionEn={module.descriptionEn}
         descriptionMy={module.descriptionMy}
         aside={
            <div className="flex size-32.5 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted shadow-[0_4px_4px_0_color-mix(in_oklch,var(--primary)_25%,transparent)]">
               {module.thumbnailUrl ? (
                  // Plain <img>: short-lived signed URLs can't go through next/image.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={module.thumbnailUrl} alt={module.titleEn} className="size-full object-cover" />
               ) : (
                  <ImageIcon className="size-8 text-tertiary-foreground" aria-label="No image" />
               )}
            </div>
         }
      >
         {(language) => <ModuleIntroduction module={module} language={language} />}
      </EntitySummary>
   );
}
