import { BilingualText } from '@/components/common/BilingualText';
import type { DataTableColumn } from '@/components/common/DataTable';
import { RowActions } from '@/components/common/RowActions';
import { ROUTES } from '@/constants/routes';
import { formatDateTime } from '@/lib/format';
import type { ModuleListItem } from '@/types/api/module.types';
import { ModuleStatusCell } from './ModuleStatusCell';

export interface ModuleRowHandlers {
   onDelete: (module: ModuleListItem) => void;
   onTogglePublished: (module: ModuleListItem, published: boolean) => void;
}

// Column order follows the Figma module table; widths are trimmed slightly so the total fits the 1152px content area.
// TODO(api): add back the Units (unitCount) column once the API returns it (FR-CUR-001).
export function getModuleColumns({
   onDelete,
   onTogglePublished,
}: ModuleRowHandlers): DataTableColumn<ModuleListItem>[] {
   return [
      {
         id: 'title',
         header: 'Module title',
         className: 'w-[300px]',
         cell: (module) => <BilingualText en={module.titleEn} my={module.titleMy} />,
      },
      { id: 'code', header: 'Module code', className: 'w-[180px]', cell: (module) => module.code },
      { id: 'category', header: 'Category', className: 'w-[120px]', cell: (module) => module.category.titleEn },
      { id: 'level', header: 'Level', className: 'w-[120px]', cell: (module) => module.level.titleEn },
      {
         id: 'status',
         header: 'Status',
         className: 'w-[138px]',
         cell: (module) => (
            <ModuleStatusCell status={module.status} onToggle={(published) => onTogglePublished(module, published)} />
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
         className: 'w-[128px]',
         cell: (module) => (
            <RowActions
               entityName="module"
               viewHref={ROUTES.moduleDetail(module.id)}
               editHref={ROUTES.editModule(module.id)}
               onDelete={() => onDelete(module)}
            />
         ),
      },
   ];
}
