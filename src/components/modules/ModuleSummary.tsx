import { ContentCard } from '@/components/common/ContentCard';
import type { ModuleDetail } from '@/types/api/module.types';
import { ModuleCoverCard } from './ModuleCoverCard';
import { ModuleIntroduction } from './ModuleIntroduction';

// CONTENT card (per-language title, description, goal and outcome) with the cover image beside it;
// on phones and tablets the image goes below, so the content comes first.
export function ModuleSummary({ module }: { module: ModuleDetail }) {
   return (
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
         <div className="min-w-0 flex-1">
            <ContentCard
               titleEn={module.titleEn}
               titleMy={module.titleMy}
               descriptionEn={module.descriptionEn}
               descriptionMy={module.descriptionMy}
            >
               {(language) => <ModuleIntroduction module={module} language={language} />}
            </ContentCard>
         </div>
         <div className="w-full sm:max-w-80 lg:w-46 lg:shrink-0">
            <ModuleCoverCard src={module.thumbnailUrl} alt={module.titleEn} />
         </div>
      </div>
   );
}
