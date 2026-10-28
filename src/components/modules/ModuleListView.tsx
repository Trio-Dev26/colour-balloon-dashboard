'use client';

import { useMemo } from 'react';
import { toast } from 'sonner';
import { DataTable } from '@/components/common/DataTable';
import { ListFooter } from '@/components/common/ListFooter';
import { TablePagination } from '@/components/common/TablePagination';
import { Button } from '@/components/ui/button';
import { MODULE_FILTER_KEYS } from '@/constants/module';
import { ROUTES } from '@/constants/routes';
import { useDeleteModule, useModules } from '@/hooks/useModules';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { apiErrorMessage } from '@/lib/form';
import type { ModuleFilters as ModuleFilterValues } from '@/types/api/module.types';
import { CreateModuleButton } from './CreateModuleButton';
import { ModuleEmptyState } from './ModuleEmptyState';
import { ModuleFilters } from './ModuleFilters';
import { getModuleColumns } from './moduleColumns';

export function ModuleListView() {
   const { get, page, setPage } = useUrlFilters();
   const filters: ModuleFilterValues = {
      page,
      ...Object.fromEntries(MODULE_FILTER_KEYS.map((key) => [key, get(key)])),
   };
   const hasActiveFilters = MODULE_FILTER_KEYS.some((key) => get(key));

   const { data, isPending, isError, refetch } = useModules(filters);
   const { mutate: deleteModule } = useDeleteModule();

   const columns = useMemo(
      () =>
         getModuleColumns({
            onDelete: (module) =>
               deleteModule(module.id, {
                  onSuccess: () => toast.success(`${module.titleEn} deleted`),
                  // e.g. 409 when the module was published meanwhile (D18)
                  onError: (error) => toast.error(apiErrorMessage(error, `Couldn’t delete ${module.titleEn}.`)),
               }),
         }),
      [deleteModule]
   );

   const total = data?.meta.total ?? 0;
   const pageCount = data ? Math.ceil(total / data.meta.limit) : 0;

   if (isError) {
      return (
         <div className="flex flex-col items-center gap-3 p-10 text-sm text-muted-foreground">
            Couldn&apos;t load modules.
            <Button variant="outline" onClick={() => refetch()}>
               Try again
            </Button>
         </div>
      );
   }

   // The empty illustration is for "nothing created yet", not for "no match for these filters".
   if (!isPending && total === 0 && !hasActiveFilters) {
      return (
         <>
            <ModuleFilters />
            <ModuleEmptyState />
         </>
      );
   }

   return (
      <>
         <ModuleFilters action={<CreateModuleButton />} />
         <div className="overflow-hidden rounded-lg border">
            <DataTable
               columns={columns}
               rows={data?.data ?? []}
               getRowId={(module) => module.id}
               getRowHref={(module) => ROUTES.moduleDetail(module.id)}
               emptyMessage="No modules match these filters."
               isLoading={isPending}
            />
         </div>
         <ListFooter
            summary={data ? `Total ${total} modules are created.` : ''}
            pagination={<TablePagination page={page} pageCount={pageCount} onPageChange={setPage} />}
         />
      </>
   );
}
