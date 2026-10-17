'use client';

import { useMemo } from 'react';
import { toast } from 'sonner';
import { DataTable } from '@/components/common/DataTable';
import { ListFooter } from '@/components/common/ListFooter';
import { TablePagination } from '@/components/common/TablePagination';
import { Button } from '@/components/ui/button';
import { MODULE_FILTER_KEYS } from '@/constants/module';
import { useDeleteModule, useModules, useUpdateModuleStatus } from '@/hooks/useModules';
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
   const { mutate: updateStatus } = useUpdateModuleStatus();
   const { mutate: deleteModule } = useDeleteModule();

   const columns = useMemo(
      () =>
         getModuleColumns({
            onTogglePublished: (module, published) =>
               updateStatus(
                  { id: module.id, status: published ? 'PUBLISHED' : 'UNPUBLISHED' },
                  {
                     onSuccess: () => toast.success(`${module.titleEn} ${published ? 'published' : 'unpublished'}`),
                     onError: (error) =>
                        toast.error(apiErrorMessage(error, `Couldn’t change the status of ${module.titleEn}.`)),
                  }
               ),
            onDelete: (module) =>
               deleteModule(module.id, {
                  onSuccess: () => toast.success(`${module.titleEn} deleted`),
                  // e.g. 409 when the module was published meanwhile (D18)
                  onError: (error) => toast.error(apiErrorMessage(error, `Couldn’t delete ${module.titleEn}.`)),
               }),
         }),
      [updateStatus, deleteModule]
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
         <DataTable
            columns={columns}
            rows={data?.data ?? []}
            getRowId={(module) => module.id}
            emptyMessage="No modules match these filters."
            isLoading={isPending}
         />
         <ListFooter
            summary={data ? `Total ${total} modules are created.` : ''}
            pagination={<TablePagination page={page} pageCount={pageCount} onPageChange={setPage} />}
         />
      </>
   );
}
