'use client';

import { useMemo } from 'react';
import { toast } from 'sonner';
import { BilingualText } from '@/components/common/BilingualText';
import { CreateButton } from '@/components/common/CreateButton';
import { EmptyIllustration } from '@/components/common/EmptyIllustration';
import { EmptyState } from '@/components/common/EmptyState';
import { OrderBadge } from '@/components/common/OrderBadge';
import { OrderedChildrenSection } from '@/components/common/ordered/OrderedChildrenSection';
import { ROUTES } from '@/constants/routes';
import { useDeleteLesson, useReorderUnitLessons } from '@/hooks/useLessons';
import type { LessonListItem } from '@/types/api/lesson.types';
import { getLessonColumns } from './lessonColumns';

// TODO: open the Create Lesson screen once it's designed.
const createLessonButton = <CreateButton label="Create lesson" href={ROUTES.lessons} />;

export function UnitLessonsSection({ unitId, lessons }: { unitId: string; lessons: LessonListItem[] }) {
   const reorder = useReorderUnitLessons(unitId);
   const { mutate: deleteLesson } = useDeleteLesson();
   const columns = useMemo(
      () =>
         getLessonColumns((lesson) =>
            deleteLesson(lesson.id, { onSuccess: () => toast.success(`${lesson.titleEn} deleted`) })
         ),
      [deleteLesson]
   );

   return (
      <OrderedChildrenSection
         title="Lessons"
         description="Arrange and organize the lessons to follow a sequential learning order within the unit."
         createAction={createLessonButton}
         items={lessons}
         columns={columns}
         getId={(lesson) => lesson.id}
         emptyState={
            <EmptyState
               icon={<EmptyIllustration />}
               title="No lessons yet!"
               description="It looks like you haven’t created any lessons. Let’s build some amazing for your students."
               action={createLessonButton}
            />
         }
         arrange={{
            buttonLabel: 'Arrange lessons',
            hint: 'Drag lessons by the handle to change the order learners unlock them in. Lesson 1 is always open first.',
            isSaving: reorder.isPending,
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
   );
}
