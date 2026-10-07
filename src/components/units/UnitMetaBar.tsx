import { MetaBar } from '@/components/common/MetaBar';
import type { UnitDetail } from '@/types/api/unit.types';

// LEVEL / CATEGORY / MODULE CODE / UNIT CODE pills across the top of the unit detail page.
export function UnitMetaBar({ unit }: { unit: UnitDetail }) {
   return (
      <MetaBar
         items={[
            { label: 'Level', value: unit.module.level.titleEn, tone: 'success' },
            { label: 'Category', value: unit.module.category.titleEn, tone: 'info' },
            { label: 'Module code', value: unit.module.code, tone: 'warning' },
            { label: 'Unit code', value: unit.code, tone: 'primary' },
         ]}
      />
   );
}
