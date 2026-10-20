'use client';

import type { ReactNode } from 'react';
import { ClearFiltersButton } from '@/components/common/ClearFiltersButton';
import { FilterSelect } from '@/components/common/FilterSelect';
import { SearchInput } from '@/components/common/SearchInput';
import { UNIT_FILTER_KEYS } from '@/constants/unit';
import { useClearableFilters } from '@/hooks/useClearableFilters';
import { useModuleSelectOptions } from '@/hooks/useModules';
import { useUrlFilters } from '@/hooks/useUrlFilters';

// Search + Module filter for the unit list. Values live in the URL (?search=&moduleId=).
export function UnitFilters({ action }: { action?: ReactNode }) {
   const filters = useUrlFilters();
   const moduleOptions = useModuleSelectOptions();
   const { searchRef, hasActiveFilters, clearFilters } = useClearableFilters(UNIT_FILTER_KEYS);

   return (
      <div className="flex flex-wrap items-center justify-between gap-3">
         <div className="flex flex-1 flex-wrap items-center gap-3">
            <SearchInput
               ref={searchRef}
               placeholder="Search unit title, code"
               aria-label="Search units"
               className="w-62"
               defaultValue={filters.get('search')}
               onChange={(event) => filters.set('search', event.target.value)}
            />
            <FilterSelect
               placeholder="Module"
               options={moduleOptions}
               value={filters.get('moduleId')}
               onValueChange={(value) => filters.set('moduleId', value)}
            />
            {hasActiveFilters && <ClearFiltersButton onClear={clearFilters} />}
         </div>
         {action}
      </div>
   );
}
