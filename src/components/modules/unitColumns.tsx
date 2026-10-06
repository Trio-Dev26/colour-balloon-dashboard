import { BilingualText } from '@/components/common/BilingualText';
import type { DataTableColumn } from '@/components/common/DataTable';
import { RowActions } from '@/components/common/RowActions';
import { UnitNumberBadge } from './UnitNumberBadge';
import { ToneBadge } from '@/components/common/ToneBadge';
import { ROUTES } from '@/constants/routes';
import { formatDateTime } from '@/lib/format';
import type { UnitSummary } from '@/types/api/module.types';

// Columns of the Units table on the module detail page.
export function getUnitColumns(onDelete: (unit: UnitSummary) => void): DataTableColumn<UnitSummary>[] {
   return [
      {
         id: 'order',
         header: 'Unit no',
         className: 'w-[73px] px-2 text-center',
         cell: (unit) => <UnitNumberBadge order={unit.order} />,
      },
      {
         id: 'title',
         header: 'Unit title',
         className: 'w-[501px]',
         cell: (unit, index) => (
            <div className="flex items-center gap-3">
               <BilingualText en={unit.titleEn} my={unit.titleMy} />
               {index === 0 && <ToneBadge tone="primary">First unit</ToneBadge>}
            </div>
         ),
      },
      { id: 'code', header: 'Unit code', className: 'w-[120px]', cell: (unit) => unit.code },
      {
         id: 'lessons',
         header: 'No of lessons',
         className: 'w-[150px] text-muted-foreground',
         cell: (unit) => `${unit.lessonCount} lessons`,
      },
      {
         id: 'updatedAt',
         header: 'Last updated',
         className: 'w-[150px] text-xs text-muted-foreground',
         cell: (unit) => formatDateTime(unit.updatedAt),
      },
      {
         id: 'actions',
         header: 'Actions',
         className: 'w-[158px]',
         // TODO: point at the unit routes once the Unit screens are built.
         cell: (unit) => (
            <RowActions
               entityName="unit"
               viewHref={ROUTES.units}
               editHref={ROUTES.units}
               onDelete={() => onDelete(unit)}
            />
         ),
      },
   ];
}
