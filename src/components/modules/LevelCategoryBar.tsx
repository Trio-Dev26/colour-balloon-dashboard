import { MetaBar } from '@/components/common/MetaBar';
import type { Taxonomy } from '@/types/api/module.types';

// LEVEL / CATEGORY pills at the top of the module, unit and lesson detail pages.
// Codes are left out: the breadcrumb above already shows them as links.
export function LevelCategoryBar({ level, category }: { level: Taxonomy; category: Taxonomy }) {
   return (
      <MetaBar
         items={[
            { label: 'Level', value: level.titleEn, tone: 'success' },
            { label: 'Category', value: category.titleEn, tone: 'info' },
         ]}
      />
   );
}
