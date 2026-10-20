'use client';

import type { ReactNode } from 'react';
import { ClearFiltersButton } from '@/components/common/ClearFiltersButton';
import { FilterSelect } from '@/components/common/FilterSelect';
import { SearchInput } from '@/components/common/SearchInput';
import { LESSON_FILTER_KEYS } from '@/constants/lesson';
import { useClearableFilters } from '@/hooks/useClearableFilters';
import { useModuleSelectOptions } from '@/hooks/useModules';
import { useUnitOptions, useUnitSelectOptions } from '@/hooks/useUnits';
import { useUrlFilters } from '@/hooks/useUrlFilters';

// Search + Module + Unit filters for the lesson list (Figma "Actions and Filters").
// Values live in the URL (?search=&moduleId=&unitId=). The Unit picker lists every unit, or only
// the chosen module's; picking a unit also picks its module, and a new module clears the unit.
export function LessonFilters({ action }: { action?: ReactNode }) {
   const filters = useUrlFilters();
   const moduleId = filters.get('moduleId');
   const moduleOptions = useModuleSelectOptions();
   // Same cached query: the options for the picker, the units to look up a unit's module.
   const { data: units = [] } = useUnitOptions(moduleId);
   const unitOptions = useUnitSelectOptions(moduleId);
   const { searchRef, hasActiveFilters, clearFilters } = useClearableFilters(LESSON_FILTER_KEYS);

   const selectUnit = (unitId: string | undefined) => {
      const unit = units.find((option) => option.id === unitId);
      filters.setMany({ unitId, moduleId: unit?.moduleId ?? moduleId });
   };

   return (
      <div className="flex flex-wrap items-center justify-between gap-3">
         <div className="flex flex-1 flex-wrap items-center gap-3">
            <SearchInput
               ref={searchRef}
               placeholder="Search lesson"
               aria-label="Search lessons"
               className="w-80"
               defaultValue={filters.get('search')}
               onChange={(event) => filters.set('search', event.target.value)}
            />
            <FilterSelect
               placeholder="Module"
               options={moduleOptions}
               value={moduleId}
               onValueChange={(value) => filters.setMany({ moduleId: value, unitId: undefined })}
            />
            <FilterSelect
               placeholder="Unit"
               options={unitOptions}
               value={filters.get('unitId')}
               onValueChange={selectUnit}
            />
            {hasActiveFilters && <ClearFiltersButton onClear={clearFilters} />}
         </div>
         {action}
      </div>
   );
}
