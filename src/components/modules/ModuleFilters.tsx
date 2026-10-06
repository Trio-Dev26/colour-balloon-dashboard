'use client';

import type { ReactNode } from 'react';
import { FilterSelect } from '@/components/common/FilterSelect';
import { SearchInput } from '@/components/common/SearchInput';
import { MODULE_CATEGORY_OPTIONS, MODULE_LEVEL_OPTIONS, MODULE_STATUS_OPTIONS } from '@/constants/module';
import { useUrlFilters } from '@/hooks/useUrlFilters';

const FILTERS = [
   { key: 'level', placeholder: 'Level', options: MODULE_LEVEL_OPTIONS },
   { key: 'category', placeholder: 'Category', options: MODULE_CATEGORY_OPTIONS },
   { key: 'status', placeholder: 'Status', options: MODULE_STATUS_OPTIONS },
] as const;

// Search + Level / Category / Status filters. Values live in the URL (see useUrlFilters).
export function ModuleFilters({ action }: { action?: ReactNode }) {
   const filters = useUrlFilters();

   return (
      <div className="flex flex-wrap items-center justify-between gap-3">
         <div className="flex flex-1 flex-wrap items-center gap-3">
            <SearchInput
               placeholder="Search module, code"
               aria-label="Search modules"
               defaultValue={filters.get('search')}
               onChange={(event) => filters.set('search', event.target.value)}
            />
            {FILTERS.map((filter) => (
               <FilterSelect
                  key={filter.key}
                  placeholder={filter.placeholder}
                  options={filter.options}
                  value={filters.get(filter.key)}
                  onValueChange={(value) => filters.set(filter.key, value)}
               />
            ))}
         </div>
         {action}
      </div>
   );
}
