import { BilingualText } from '@/components/common/BilingualText';
import type { DataTableColumn } from '@/components/common/DataTable';
import { RowActions } from '@/components/common/RowActions';
import { EMPTY_VALUE } from '@/constants/common';
import { ToneBadge } from '@/components/common/ToneBadge';
import { MODULE_RULE_HINTS, MODULE_STATUS, moduleDeleteDescription } from '@/constants/module';
import { ROUTES } from '@/constants/routes';
import { formatDateTime } from '@/lib/format';
import type { ModuleListItem } from '@/types/api/module.types';

export interface ModuleRowHandlers {
   onDelete: (module: ModuleListItem) => void;
}

// D18: only a module that was never published can be deleted.
const deleteBlockedReason = (module: ModuleListItem) =>
   module.status === 'DRAFT' ? undefined : MODULE_RULE_HINTS.deletePublished;

// Column order follows the Figma module table; widths are trimmed slightly so the total fits the 1152px content area.
export function getModuleColumns({ onDelete }: ModuleRowHandlers): DataTableColumn<ModuleListItem>[] {
   return [
      {
         id: 'title',
         header: 'Module title',
         className: 'w-[300px]',
         cell: (module) => <BilingualText en={module.titleEn} my={module.titleMy} />,
      },
      { id: 'code', header: 'Module code', className: 'w-[110px]', cell: (module) => module.code },
      { id: 'units', header: 'Units', className: 'w-[70px]', cell: (module) => module.unitCount || EMPTY_VALUE },
      { id: 'category', header: 'Category', className: 'w-[120px]', cell: (module) => module.category.titleEn },
      { id: 'level', header: 'Level', className: 'w-[120px]', cell: (module) => module.level.titleEn },
      {
         id: 'status',
         header: 'Status',
         className: 'w-[138px]',
         // Status only: publishing is a serious action and lives on the module detail page, behind a confirmation.
         cell: (module) => (
            <ToneBadge tone={MODULE_STATUS[module.status].tone} className="min-w-18">
               {MODULE_STATUS[module.status].label}
            </ToneBadge>
         ),
      },
      {
         id: 'updatedAt',
         header: 'Last updated',
         className: 'w-[150px] text-xs text-muted-foreground',
         cell: (module) => formatDateTime(module.updatedAt),
      },
      {
         id: 'actions',
         header: 'Actions',
         className: 'w-[96px]',
         cell: (module) => (
            <RowActions
               entityName="module"
               edit={ROUTES.editModule(module.id)}
               onDelete={() => onDelete(module)}
               deleteDescription={moduleDeleteDescription(module.unitCount, module.lessonCount)}
               deleteDisabledReason={deleteBlockedReason(module)}
            />
         ),
      },
   ];
}
