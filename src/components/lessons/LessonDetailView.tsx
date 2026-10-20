'use client';

import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { EntitySummary } from '@/components/common/EntitySummary';
import { NotFoundState } from '@/components/common/NotFoundState';
import { UnitMetaBar } from '@/components/units/UnitMetaBar';
import { ROUTES } from '@/constants/routes';
import { useLesson } from '@/hooks/useLessons';

// Figma "Lesson Details": meta pills, then the lesson's titles and description.
// TODO(api): the "Lesson Files" section (student materials / teacher guide uploads) once the backend has lesson files.
export function LessonDetailView({ lessonId }: { lessonId: string }) {
   const { data: lesson, isPending } = useLesson(lessonId);

   if (isPending) return <ContentSkeleton />;
   if (!lesson) return <NotFoundState entityName="lesson" backHref={ROUTES.lessons} />;

   return (
      <>
         <UnitMetaBar
            level={lesson.level}
            category={lesson.category}
            moduleCode={lesson.moduleCode}
            unitCode={lesson.unitCode}
         />
         <EntitySummary titleEn={lesson.titleEn} titleMy={lesson.titleMy} description={lesson.descriptionEn} />
      </>
   );
}
