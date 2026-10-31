import { BilingualText } from '@/components/common/BilingualText';
import type { DataTableColumn } from '@/components/common/DataTable';
import { OrderBadge } from '@/components/common/OrderBadge';
import { RowActions } from '@/components/common/RowActions';
import { TableLink } from '@/components/common/TableLink';
import { ToneBadge } from '@/components/common/ToneBadge';
import { ROUTES } from '@/constants/routes';
import { countLabel, formatDateTime } from '@/lib/format';
import type { UnitListItem } from '@/types/api/unit.types';

interface ModuleUnitRowHandlers {
   onEdit: (unit: UnitListItem) => void;
   onDelete: (unit: UnitListItem) => void;
}

// Columns of the Units table on the module detail page. Edit opens the Edit Unit dialog.
export function getModuleUnitColumns({ onEdit, onDelete }: ModuleUnitRowHandlers): DataTableColumn<UnitListItem>[] {
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
         className: 'w-[240px]',
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
         className: 'w-[100px]',
         cell: (unit) => <TableLink href={ROUTES.unitDetail(unit.id)}>{unit.code}</TableLink>,
      },
      {
         id: 'lessons',
         header: 'No of lessons',
         className: 'w-[120px] text-muted-foreground',
         cell: (unit) => countLabel(unit.lessonCount, 'lesson'),
      },
      {
         id: 'updatedAt',
         header: 'Last updated',
         className: 'w-[170px] text-xs text-muted-foreground',
         cell: (unit) => formatDateTime(unit.updatedAt),
      },
      {
         id: 'actions',
         header: 'Actions',
         className: 'w-[96px]',
         cell: (unit) => <RowActions entityName="unit" edit={() => onEdit(unit)} onDelete={() => onDelete(unit)} />,
      },
   ];
}
