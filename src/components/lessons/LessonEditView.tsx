'use client';

import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { NotFoundState } from '@/components/common/NotFoundState';
import { ROUTES } from '@/constants/routes';
import { useLesson } from '@/hooks/useLessons';
import { lessonToFormValues } from '@/schemas/lesson.schema';
import { LessonForm } from './LessonForm';

// Loads the lesson, then opens the shared form pre-filled with its values.
export function LessonEditView({ lessonId }: { lessonId: string }) {
   const { data: lesson, isPending } = useLesson(lessonId);

   if (isPending) return <ContentSkeleton />;
   if (!lesson) return <NotFoundState entityName="lesson" backHref={ROUTES.lessons} />;

   return <LessonForm title="Edit Lesson" lessonId={lessonId} defaultValues={lessonToFormValues(lesson)} />;
}
