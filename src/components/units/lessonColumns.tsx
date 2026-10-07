import { BilingualText } from '@/components/common/BilingualText';
import type { DataTableColumn } from '@/components/common/DataTable';
import { OrderBadge } from '@/components/common/OrderBadge';
import { RowActions } from '@/components/common/RowActions';
import { ROUTES } from '@/constants/routes';
import { formatDateTime } from '@/lib/format';
import type { LessonListItem } from '@/types/api/lesson.types';

const filesLabel = (count: number) => `${count} ${count === 1 ? 'file' : 'files'} uploaded`;

// Columns of the Lessons table on the unit detail page (Figma "Unit Details").
export function getLessonColumns(onDelete: (lesson: LessonListItem) => void): DataTableColumn<LessonListItem>[] {
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
         cell: (lesson) => filesLabel(lesson.studentFileCount),
      },
      {
         id: 'teacher',
         header: 'Teacher guide',
         className: 'w-[130px]',
         cell: (lesson) => filesLabel(lesson.teacherFileCount),
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
         className: 'w-[100px]',
         // TODO: point at the lesson edit route once the Lesson screens are built.
         cell: (lesson) => (
            <RowActions entityName="lesson" editHref={ROUTES.lessons} onDelete={() => onDelete(lesson)} />
         ),
      },
   ];
}
