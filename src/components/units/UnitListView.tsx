'use client';

import { useMemo } from 'react';
import { toast } from 'sonner';
import { apiErrorMessage } from '@/lib/form';
import { CreateButton } from '@/components/common/CreateButton';
import { DataTable } from '@/components/common/DataTable';
import { ListFooter } from '@/components/common/ListFooter';
import { TablePagination } from '@/components/common/TablePagination';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { UNIT_FILTER_KEYS } from '@/constants/unit';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { useDeleteUnit, useUnits } from '@/hooks/useUnits';
import type { UnitFilters as UnitFilterValues } from '@/types/api/unit.types';
import { UnitEmptyState } from './UnitEmptyState';
import { UnitFilters } from './UnitFilters';
import { getUnitListColumns } from './unitListColumns';

const createUnitButton = <CreateButton label="Create unit" href={ROUTES.newUnit} />;

export function UnitListView() {
   const { get, page, setPage } = useUrlFilters();
   const filters: UnitFilterValues = {
      page,
      ...Object.fromEntries(UNIT_FILTER_KEYS.map((key) => [key, get(key)])),
   };
   const hasActiveFilters = UNIT_FILTER_KEYS.some((key) => get(key));

   const { data, isPending, isError, refetch } = useUnits(filters);
   const { mutate: deleteUnit } = useDeleteUnit();

   const columns = useMemo(
      () =>
         getUnitListColumns((unit) =>
            deleteUnit(unit.id, {
               onSuccess: () => toast.success(`${unit.titleEn} deleted`),
               // e.g. 409 when the module was published meanwhile (D18)
               onError: (error) => toast.error(apiErrorMessage(error, `Couldn’t delete ${unit.titleEn}.`)),
            })
         ),
      [deleteUnit]
   );

   const total = data?.meta.total ?? 0;
   const pageCount = data ? Math.ceil(total / data.meta.limit) : 0;

   if (isError) {
      return (
         <div className="flex flex-col items-center gap-3 p-10 text-sm text-muted-foreground">
            Couldn&apos;t load units.
            <Button variant="outline" onClick={() => refetch()}>
               Try again
            </Button>
         </div>
      );
   }

   // The empty illustration means "nothing created yet", not "no match for these filters".
   if (!isPending && total === 0 && !hasActiveFilters) {
      return (
         <>
            <UnitFilters />
            <UnitEmptyState title="No unit yet!" action={createUnitButton} />
         </>
      );
   }

   return (
      <>
         <UnitFilters action={createUnitButton} />
         <div className="overflow-hidden rounded-lg border">
            <DataTable
               columns={columns}
               rows={data?.data ?? []}
               getRowId={(unit) => unit.id}
               getRowHref={(unit) => ROUTES.unitDetail(unit.id)}
               emptyMessage="No units match these filters."
               isLoading={isPending}
            />
         </div>
         <ListFooter
            summary={data ? `Total ${total} units are created.` : ''}
            pagination={<TablePagination page={page} pageCount={pageCount} onPageChange={setPage} />}
         />
      </>
   );
}
