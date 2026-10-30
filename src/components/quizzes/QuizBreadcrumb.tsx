'use client';

import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb';
import { CURRICULUM_CODE_TONES } from '@/constants/module';
import { ROUTES } from '@/constants/routes';
import { useQuiz } from '@/hooks/useQuizzes';
import type { BreadcrumbEntry } from '@/types/ui/navigation.types';

// Quiz › M001 Module title › U001 Unit title › Quiz code + title (no unit for the Chapter End Test).
// Shares the page's quiz query.
export function QuizBreadcrumb({ quizId }: { quizId: string }) {
   const { data: quiz } = useQuiz(quizId);

   const items: BreadcrumbEntry[] = [{ label: 'Quiz', href: ROUTES.quizzes }];
   if (quiz) {
      items.push({
         code: quiz.moduleCode,
         codeTone: CURRICULUM_CODE_TONES.module,
         label: quiz.moduleTitleEn,
         href: ROUTES.moduleDetail(quiz.moduleId),
      });
      if (quiz.unitId && quiz.unitCode && quiz.unitTitleEn) {
         items.push({
            code: quiz.unitCode,
            codeTone: CURRICULUM_CODE_TONES.unit,
            label: quiz.unitTitleEn,
            href: ROUTES.unitDetail(quiz.unitId),
         });
      }
      items.push({ code: quiz.code, codeTone: CURRICULUM_CODE_TONES.quiz, label: quiz.titleEn });
   }

   return <PageBreadcrumb items={items} />;
}
