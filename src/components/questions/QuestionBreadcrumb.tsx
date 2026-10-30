'use client';

import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb';
import { CURRICULUM_CODE_TONES } from '@/constants/module';
import { ROUTES } from '@/constants/routes';
import { useQuestion } from '@/hooks/useQuestions';
import type { BreadcrumbEntry } from '@/types/ui/navigation.types';

// Question Bank › M001 Module title › U001 Unit title › QN001 prompt. Shares the page's question query.
export function QuestionBreadcrumb({ questionId }: { questionId: string }) {
   const { data: question } = useQuestion(questionId);

   const items: BreadcrumbEntry[] = [{ label: 'Question Bank', href: ROUTES.questions }];
   if (question) {
      items.push(
         {
            code: question.moduleCode,
            codeTone: CURRICULUM_CODE_TONES.module,
            label: question.moduleTitleEn,
            href: ROUTES.moduleDetail(question.moduleId),
         },
         {
            code: question.unitCode,
            codeTone: CURRICULUM_CODE_TONES.unit,
            label: question.unitTitleEn,
            href: ROUTES.unitDetail(question.unitId),
         },
         { code: question.code, codeTone: CURRICULUM_CODE_TONES.question, label: question.promptText }
      );
   }

   return <PageBreadcrumb items={items} />;
}
