'use client';

import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb';
import { CURRICULUM_CODE_TONES } from '@/constants/module';
import { ROUTES } from '@/constants/routes';
import { useLesson } from '@/hooks/useLessons';
import type { BreadcrumbEntry } from '@/types/ui/navigation.types';

// Lesson › M001 Module title › U001 Unit title › L001 Lesson title. Shares the page's lesson query.
export function LessonBreadcrumb({ lessonId }: { lessonId: string }) {
   const { data: lesson } = useLesson(lessonId);

   const items: BreadcrumbEntry[] = [{ label: 'Lesson', href: ROUTES.lessons }];
   if (lesson) {
      items.push(
         {
            code: lesson.moduleCode,
            codeTone: CURRICULUM_CODE_TONES.module,
            label: lesson.moduleTitleEn,
            href: ROUTES.moduleDetail(lesson.moduleId),
         },
         {
            code: lesson.unitCode,
            codeTone: CURRICULUM_CODE_TONES.unit,
            label: lesson.unitTitleEn,
            href: ROUTES.unitDetail(lesson.unitId),
         },
         { code: lesson.code, codeTone: CURRICULUM_CODE_TONES.lesson, label: lesson.titleEn }
      );
   }

   return <PageBreadcrumb items={items} />;
}
