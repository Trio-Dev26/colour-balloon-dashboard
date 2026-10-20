import { BilingualText } from '@/components/common/BilingualText';
import type { DataTableColumn } from '@/components/common/DataTable';
import { RowActions } from '@/components/common/RowActions';
import { EMPTY_VALUE } from '@/constants/common';
import { MODULE_RULE_HINTS, moduleDeleteDescription } from '@/constants/module';
import { ROUTES } from '@/constants/routes';
import { formatDateTime } from '@/lib/format';
import type { ModuleListItem } from '@/types/api/module.types';
import { ModuleStatusCell } from './ModuleStatusCell';

export interface ModuleRowHandlers {
   onDelete: (module: ModuleListItem) => void;
   onTogglePublished: (module: ModuleListItem, published: boolean) => void;
}

// D17: publishing needs at least one unit with at least one lesson.
const publishBlockedReason = (module: ModuleListItem) => {
   if (module.status === 'PUBLISHED') return undefined;
   if (module.unitCount === 0) return MODULE_RULE_HINTS.publishNeedsUnit;
   return module.lessonCount === 0 ? MODULE_RULE_HINTS.publishNeedsLesson : undefined;
};

// D18: only a module that was never published can be deleted.
const deleteBlockedReason = (module: ModuleListItem) =>
   module.status === 'DRAFT' ? undefined : MODULE_RULE_HINTS.deletePublished;

// Column order follows the Figma module table; widths are trimmed slightly so the total fits the 1152px content area.
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
      { id: 'code', header: 'Module code', className: 'w-[110px]', cell: (module) => module.code },
      { id: 'units', header: 'Units', className: 'w-[70px]', cell: (module) => module.unitCount || EMPTY_VALUE },
      { id: 'category', header: 'Category', className: 'w-[120px]', cell: (module) => module.category.titleEn },
      { id: 'level', header: 'Level', className: 'w-[120px]', cell: (module) => module.level.titleEn },
      {
         id: 'status',
         header: 'Status',
         className: 'w-[138px]',
         cell: (module) => (
            <ModuleStatusCell
               status={module.status}
               onToggle={(published) => onTogglePublished(module, published)}
               disabledReason={publishBlockedReason(module)}
            />
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
               edit={ROUTES.editModule(module.id)}
               onDelete={() => onDelete(module)}
               deleteDescription={moduleDeleteDescription(module.unitCount, module.lessonCount)}
               deleteDisabledReason={deleteBlockedReason(module)}
            />
         ),
      },
   ];
}
