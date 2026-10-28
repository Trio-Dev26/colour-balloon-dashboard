import { BilingualText } from '@/components/common/BilingualText';
import type { DataTableColumn } from '@/components/common/DataTable';
import { OrderBadge } from '@/components/common/OrderBadge';
import { RowActions } from '@/components/common/RowActions';
import { fileCountLabel } from '@/constants/lessonFile';
import { formatDateTime } from '@/lib/format';
import type { LessonListItem } from '@/types/api/lesson.types';

// Figma "Unit Details" file columns: "3 files uploaded".
const UPLOADED = ' uploaded';

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
         cell: (lesson) => fileCountLabel(lesson.fileCounts.student, UPLOADED),
      },
      {
         id: 'teacher',
         header: 'Teacher guide',
         className: 'w-[130px]',
         cell: (lesson) => fileCountLabel(lesson.fileCounts.teacher, UPLOADED),
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
         className: 'w-[96px]',
         cell: (lesson) => (
            <RowActions entityName="lesson" edit={() => onEdit(lesson)} onDelete={() => onDelete(lesson)} />
         ),
      },
   ];
}
