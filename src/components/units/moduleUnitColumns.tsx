import { BilingualText } from '@/components/common/BilingualText';
import type { DataTableColumn } from '@/components/common/DataTable';
import { OrderBadge } from '@/components/common/OrderBadge';
import { RowActions } from '@/components/common/RowActions';
import { TableLink } from '@/components/common/TableLink';
import { ToneBadge } from '@/components/common/ToneBadge';
import { EMPTY_VALUE } from '@/constants/common';
import { unitDeleteBlockedReason } from '@/constants/module';
import { ROUTES } from '@/constants/routes';
import { formatDateTime } from '@/lib/format';
import type { UnitListItem } from '@/types/api/unit.types';

// Columns of the Units table on the module detail page.
export function getModuleUnitColumns(onDelete: (unit: UnitListItem) => void): DataTableColumn<UnitListItem>[] {
   return [
      {
         id: 'order',
         header: 'Unit no',
         className: 'w-[73px] px-2 text-center',
         cell: (unit) => <OrderBadge order={unit.order} />,
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
      {
         id: 'code',
         header: 'Unit code',
         className: 'w-[120px]',
         cell: (unit) => <TableLink href={ROUTES.unitDetail(unit.id)}>{unit.code}</TableLink>,
      },
      {
         id: 'lessons',
         header: 'No of lessons',
         className: 'w-[150px] text-muted-foreground',
         cell: (unit) => (unit.lessonCount ? `${unit.lessonCount} lessons` : EMPTY_VALUE),
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
         cell: (unit) => (
            <RowActions
               entityName="unit"
               viewHref={ROUTES.unitDetail(unit.id)}
               editHref={ROUTES.editUnit(unit.id)}
               onDelete={() => onDelete(unit)}
               deleteDisabledReason={unitDeleteBlockedReason(unit.moduleStatus)}
            />
         ),
      },
   ];
}
