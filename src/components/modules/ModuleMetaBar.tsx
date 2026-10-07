import { MetaBar } from '@/components/common/MetaBar';
import type { ModuleDetail } from '@/types/api/module.types';

// LEVEL / CATEGORY / MODULE CODE pills across the top of the module detail page.
export function ModuleMetaBar({ module }: { module: ModuleDetail }) {
   return (
      <MetaBar
         items={[
            { label: 'Level', value: module.level.titleEn, tone: 'success' },
            { label: 'Category', value: module.category.titleEn, tone: 'info' },
            { label: 'Module code', value: module.code, tone: 'warning' },
         ]}
      />
   );
}
