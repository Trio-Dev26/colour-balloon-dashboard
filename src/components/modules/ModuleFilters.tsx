'use client';

import type { ReactNode } from 'react';
import { ClearFiltersButton } from '@/components/common/ClearFiltersButton';
import { FilterSelect } from '@/components/common/FilterSelect';
import { SearchInput } from '@/components/common/SearchInput';
import { MODULE_FILTER_KEYS, MODULE_STATUS_OPTIONS } from '@/constants/module';
import { useCategoryOptions, useLevelOptions } from '@/hooks/useCatalog';
import { useClearableFilters } from '@/hooks/useClearableFilters';
import { useUrlFilters } from '@/hooks/useUrlFilters';

// Search + Level / Category / Status filters. Values live in the URL (see useUrlFilters).
export function ModuleFilters({ action }: { action?: ReactNode }) {
   const filters = useUrlFilters();
   const { searchRef, hasActiveFilters, clearFilters } = useClearableFilters(MODULE_FILTER_KEYS);
   const selects = [
      { key: 'levelId', placeholder: 'Level', options: useLevelOptions() },
      { key: 'categoryId', placeholder: 'Category', options: useCategoryOptions() },
      { key: 'status', placeholder: 'Status', options: MODULE_STATUS_OPTIONS },
   ];

   return (
      <div className="flex flex-wrap items-center justify-between gap-3">
         <div className="flex flex-1 flex-wrap items-center gap-3">
            <SearchInput
               ref={searchRef}
               placeholder="Search module, code"
               aria-label="Search modules"
               defaultValue={filters.get('search')}
               onChange={(event) => filters.set('search', event.target.value)}
            />
            {selects.map((filter) => (
               <FilterSelect
                  key={filter.key}
                  placeholder={filter.placeholder}
                  options={filter.options}
                  value={filters.get(filter.key)}
                  onValueChange={(value) => filters.set(filter.key, value)}
               />
            ))}
            {hasActiveFilters && <ClearFiltersButton onClear={clearFilters} />}
         </div>
         {action}
      </div>
   );
}
