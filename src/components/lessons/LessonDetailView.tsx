'use client';

import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { EntitySummary } from '@/components/common/EntitySummary';
import { NotFoundState } from '@/components/common/NotFoundState';
import { UnitMetaBar } from '@/components/units/UnitMetaBar';
import { ROUTES } from '@/constants/routes';
import { useLesson } from '@/hooks/useLessons';
import { LessonFilesSection } from './LessonFilesSection';

// Figma "Lesson Details": meta pills, the lesson's titles and description, then its files.
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
         <EntitySummary
            titleEn={lesson.titleEn}
            titleMy={lesson.titleMy}
            descriptionEn={lesson.descriptionEn}
            descriptionMy={lesson.descriptionMy}
         />
         <LessonFilesSection lessonId={lesson.id} />
      </>
   );
}
