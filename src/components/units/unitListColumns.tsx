import { BilingualText } from '@/components/common/BilingualText';
import type { DataTableColumn } from '@/components/common/DataTable';
import { RowActions } from '@/components/common/RowActions';
import { TableLink } from '@/components/common/TableLink';
import { EMPTY_VALUE } from '@/constants/common';
import { unitDeleteBlockedReason } from '@/constants/module';
import { ROUTES } from '@/constants/routes';
import { formatDateTime } from '@/lib/format';
import type { UnitListItem } from '@/types/api/unit.types';

// Columns of the unit list page (Figma "Unit" table).
export function getUnitListColumns(onDelete: (unit: UnitListItem) => void): DataTableColumn<UnitListItem>[] {
   return [
      {
         id: 'title',
         header: 'Unit title',
         className: 'w-[368px]',
         cell: (unit) => <BilingualText en={unit.titleEn} my={unit.titleMy} />,
      },
      { id: 'code', header: 'Unit code', className: 'w-[116px]', cell: (unit) => unit.code },
      {
         id: 'lessons',
         header: 'No of lessons',
         className: 'w-[116px]',
         cell: (unit) => unit.lessonCount || EMPTY_VALUE,
      },
      {
         id: 'module',
         header: 'Module code',
         className: 'w-[92px]',
         cell: (unit) => <TableLink href={ROUTES.moduleDetail(unit.moduleId)}>{unit.moduleCode}</TableLink>,
      },
      {
         id: 'updatedAt',
         header: 'Last updated',
         className: 'w-[160px] text-xs text-muted-foreground',
         cell: (unit) => formatDateTime(unit.updatedAt),
      },
      {
         id: 'actions',
         header: 'Actions',
         className: 'w-[128px]',
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
