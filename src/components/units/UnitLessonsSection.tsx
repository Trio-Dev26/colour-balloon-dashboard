'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { BilingualText } from '@/components/common/BilingualText';
import { CreateButton } from '@/components/common/CreateButton';
import { OrderBadge } from '@/components/common/OrderBadge';
import { OrderedChildrenSection } from '@/components/common/ordered/OrderedChildrenSection';
import { LessonFormDialog } from '@/components/lessons/LessonFormDialog';
import { LessonEmptyState } from '@/components/lessons/LessonEmptyState';
import { MODULE_RULE_HINTS } from '@/constants/module';
import { useDeleteLesson, useReorderUnitLessons } from '@/hooks/useLessons';
import { apiErrorMessage } from '@/lib/form';
import type { LessonListItem } from '@/types/api/lesson.types';
import type { UnitDetail } from '@/types/api/unit.types';
import { getLessonColumns } from './lessonColumns';

interface UnitLessonsSectionProps {
   unit: UnitDetail;
   lessons: LessonListItem[];
}

// Lessons section of the unit detail page: table, "Arrange lessons" and the Create / Edit Lesson dialog.
export function UnitLessonsSection({ unit, lessons }: UnitLessonsSectionProps) {
   // null = closed, {} = create, { lessonId } = edit.
   const [dialog, setDialog] = useState<{ lessonId?: string } | null>(null);
   const reorder = useReorderUnitLessons(unit.id);
   const { mutate: deleteLesson } = useDeleteLesson();
   const columns = useMemo(
      () =>
         getLessonColumns({
            onEdit: (lesson) => setDialog({ lessonId: lesson.id }),
            onDelete: (lesson) =>
               deleteLesson(lesson.id, {
                  onSuccess: () => toast.success(`${lesson.titleEn} deleted`),
                  onError: (error) => toast.error(apiErrorMessage(error, `Couldn’t delete ${lesson.titleEn}.`)),
               }),
         }),
      [deleteLesson]
   );
   const createButton = <CreateButton label="Create lesson" onClick={() => setDialog({})} />;

   return (
      <>
         <OrderedChildrenSection
            title="Lessons"
            description="Arrange and organize the lessons to follow a sequential learning order within the unit."
            createAction={createButton}
            items={lessons}
            columns={columns}
            getId={(lesson) => lesson.id}
            emptyState={<LessonEmptyState action={createButton} />}
            arrange={{
               buttonLabel: 'Arrange lessons',
               hint: 'Drag lessons by the handle to change the order learners unlock them in. Lesson 1 is always open first.',
               isSaving: reorder.isPending,
               // Reordering is Draft-only (D28).
               disabledReason: unit.moduleStatus === 'DRAFT' ? undefined : MODULE_RULE_HINTS.lessonReorderLocked,
               getHandleLabel: (lesson, index) => `Move lesson ${index + 1}: ${lesson.titleEn}`,
               renderItem: (lesson, index) => (
                  <>
                     <OrderBadge order={index + 1} />
                     <BilingualText en={lesson.titleEn} my={lesson.titleMy} />
                  </>
               ),
               onSave: (ids) => reorder.mutateAsync(ids).then(() => toast.success('Lesson order saved')),
            }}
         />
         <LessonFormDialog
            open={dialog !== null}
            onOpenChange={(open) => !open && setDialog(null)}
            unit={{ moduleId: unit.moduleId, unitId: unit.id }}
            lessonId={dialog?.lessonId}
         />
      </>
   );
}
