import { BilingualText } from '@/components/common/BilingualText';
import type { DataTableColumn } from '@/components/common/DataTable';
import { OrderBadge } from '@/components/common/OrderBadge';
import { RowActions } from '@/components/common/RowActions';
import { EMPTY_VALUE } from '@/constants/common';
import { lessonDeleteBlockedReason } from '@/constants/module';
import { ROUTES } from '@/constants/routes';
import { formatDateTime } from '@/lib/format';
import type { LessonListItem } from '@/types/api/lesson.types';

// TODO(api): the file columns show "N files uploaded" once the backend has lesson files.

interface UnitLessonRowHandlers {
   onEdit: (lesson: LessonListItem) => void;
   onDelete: (lesson: LessonListItem) => void;
}

// Columns of the Lessons table on the unit detail page (Figma "Unit Details"). Edit opens the Edit Lesson dialog.
export function getLessonColumns({ onEdit, onDelete }: UnitLessonRowHandlers): DataTableColumn<LessonListItem>[] {
   return [
      {
         id: 'order',
         header: 'Lesson no',
         className: 'w-[80px] px-2 text-center',
         cell: (lesson) => <OrderBadge order={lesson.order} />,
      },
      {
         id: 'title',
         header: 'Lesson title',
         className: 'w-[366px]',
         cell: (lesson) => <BilingualText en={lesson.titleEn} my={lesson.titleMy} />,
      },
      {
         id: 'student',
         header: 'Student materials',
         className: 'w-[130px]',
         cell: () => EMPTY_VALUE,
      },
      {
         id: 'teacher',
         header: 'Teacher guide',
         className: 'w-[130px]',
         cell: () => EMPTY_VALUE,
      },
      {
         id: 'updatedAt',
         header: 'Last updated',
         className: 'w-[150px] text-xs text-muted-foreground',
         cell: (lesson) => formatDateTime(lesson.updatedAt),
      },
      {
         id: 'actions',
         header: 'Actions',
         className: 'w-[136px]',
         cell: (lesson) => (
            <RowActions
               entityName="lesson"
               viewHref={ROUTES.lessonDetail(lesson.id)}
               edit={() => onEdit(lesson)}
               onDelete={() => onDelete(lesson)}
               deleteDisabledReason={lessonDeleteBlockedReason(lesson.moduleStatus)}
            />
         ),
      },
   ];
}
