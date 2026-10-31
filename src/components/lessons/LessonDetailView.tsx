'use client';

import { ContentCard } from '@/components/common/ContentCard';
import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { MetaBar } from '@/components/common/MetaBar';
import { NotFoundState } from '@/components/common/NotFoundState';
import { CURRICULUM_CODE_TONES, MODULE_STATUS } from '@/constants/module';
import { ROUTES } from '@/constants/routes';
import { useLesson } from '@/hooks/useLessons';
import { LessonFilesSection } from './LessonFilesSection';

// Lesson details: unit and module codes (the breadcrumb shows the lesson's own), the module's level, category and
// status, and file counts across the top, the bilingual content card, then its files.
export function LessonDetailView({ lessonId }: { lessonId: string }) {
   const { data: lesson, isPending } = useLesson(lessonId);

   if (isPending) return <ContentSkeleton />;
   if (!lesson) return <NotFoundState entityName="lesson" backHref={ROUTES.lessons} />;

   const status = MODULE_STATUS[lesson.moduleStatus];
   return (
      <>
         <MetaBar
            items={[
               { label: 'Unit', value: lesson.unitCode, tone: CURRICULUM_CODE_TONES.unit },
               { label: 'Module', value: lesson.moduleCode, tone: CURRICULUM_CODE_TONES.module },
               { label: 'Level', value: lesson.level.titleEn, tone: 'success' },
               { label: 'Category', value: lesson.category.titleEn, tone: 'info' },
               { label: 'Module status', value: status.label, tone: status.tone },
               // Learner side · teacher side, like the file tabs below.
               {
                  label: 'Files',
                  value: `${lesson.fileCounts.student} learner · ${lesson.fileCounts.teacher} teacher`,
               },
            ]}
         />
         <ContentCard
            titleEn={lesson.titleEn}
            titleMy={lesson.titleMy}
            descriptionEn={lesson.descriptionEn}
            descriptionMy={lesson.descriptionMy}
         />
         <LessonFilesSection lessonId={lesson.id} />
      </>
   );
}
