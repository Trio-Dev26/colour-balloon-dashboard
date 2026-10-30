'use client';

import { DeleteEntityButton } from '@/components/common/DeleteEntityButton';
import { EditPageButton } from '@/components/common/EditPageButton';
import { ROUTES } from '@/constants/routes';
import { useDeleteLesson, useLesson } from '@/hooks/useLessons';

// Delete + "Edit lesson info" in the lesson detail header; hidden while loading or when the lesson doesn't exist.
export function LessonDetailActions({ lessonId }: { lessonId: string }) {
   const { data: lesson } = useLesson(lessonId);
   const { mutateAsync: deleteLesson } = useDeleteLesson();
   if (!lesson) return null;

   return (
      <>
         <DeleteEntityButton
            entityName="lesson"
            name={`${lesson.code} · ${lesson.titleEn}`}
            description="The lesson and its files will be hidden from admins and learners. This can’t be undone from the dashboard."
            onDelete={() => deleteLesson(lessonId)}
            redirectTo={ROUTES.lessons}
         />
         <EditPageButton href={ROUTES.editLesson(lessonId)} label="Edit lesson info" />
      </>
   );
}
