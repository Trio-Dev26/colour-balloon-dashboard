'use client';

import type { ReactNode } from 'react';
import { FilterSelect } from '@/components/common/FilterSelect';
import { SearchInput } from '@/components/common/SearchInput';
import { useModuleSelectOptions } from '@/hooks/useModules';
import { useUrlFilters } from '@/hooks/useUrlFilters';

// Search + Module filter for the unit list. Values live in the URL (?search=&moduleId=).
export function UnitFilters({ action }: { action?: ReactNode }) {
   const filters = useUrlFilters();
   const moduleOptions = useModuleSelectOptions();

   return (
      <div className="flex flex-wrap items-center justify-between gap-3">
         <div className="flex flex-1 flex-wrap items-center gap-3">
            <SearchInput
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
         </div>
         {action}
      </div>
   );
}
