import { MetaBar } from '@/components/common/MetaBar';
import type { Taxonomy } from '@/types/api/module.types';

interface UnitMetaBarProps {
   level: Taxonomy;
   category: Taxonomy;
   moduleCode: string;
   unitCode: string;
}

// LEVEL / CATEGORY / MODULE CODE / UNIT CODE pills across the top of the unit and lesson detail pages.
export function UnitMetaBar({ level, category, moduleCode, unitCode }: UnitMetaBarProps) {
   return (
      <MetaBar
         items={[
            { label: 'Level', value: level.titleEn, tone: 'success' },
            { label: 'Category', value: category.titleEn, tone: 'info' },
            { label: 'Module code', value: moduleCode, tone: 'warning' },
            { label: 'Unit code', value: unitCode, tone: 'primary' },
         ]}
      />
   );
}
