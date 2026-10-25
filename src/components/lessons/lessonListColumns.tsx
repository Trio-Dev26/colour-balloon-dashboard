import { BilingualText } from '@/components/common/BilingualText';
import type { DataTableColumn } from '@/components/common/DataTable';
import { RowActions } from '@/components/common/RowActions';
import { TableLink } from '@/components/common/TableLink';
import { fileCountLabel } from '@/constants/lessonFile';
import { ROUTES } from '@/constants/routes';
import { formatDateTime } from '@/lib/format';
import type { LessonListItem } from '@/types/api/lesson.types';

// Columns of the lesson list page (Figma "Lessons" table).
export function getLessonListColumns(onDelete: (lesson: LessonListItem) => void): DataTableColumn<LessonListItem>[] {
   return [
      {
         id: 'title',
         header: 'Lesson title',
         className: 'w-[383px]',
         cell: (lesson) => <BilingualText en={lesson.titleEn} my={lesson.titleMy} />,
      },
      {
         id: 'student',
         header: 'Student materials',
         className: 'w-[148px]',
         cell: (lesson) => fileCountLabel(lesson.fileCounts.student),
      },
      {
         id: 'teacher',
         header: 'Teacher guide',
         className: 'w-[117px]',
         cell: (lesson) => fileCountLabel(lesson.fileCounts.teacher),
      },
      {
         id: 'unit',
         header: 'Unit code',
         className: 'w-[109px]',
         cell: (lesson) => <TableLink href={ROUTES.unitDetail(lesson.unitId)}>{lesson.unitCode}</TableLink>,
      },
      {
         id: 'module',
         header: 'Module code',
         className: 'w-[109px]',
         cell: (lesson) => <TableLink href={ROUTES.moduleDetail(lesson.moduleId)}>{lesson.moduleCode}</TableLink>,
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
               edit={ROUTES.editLesson(lesson.id)}
               onDelete={() => onDelete(lesson)}
            />
         ),
      },
   ];
}
