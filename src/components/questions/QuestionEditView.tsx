'use client';

import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { NotFoundState } from '@/components/common/NotFoundState';
import { ROUTES } from '@/constants/routes';
import { useQuestion } from '@/hooks/useQuestions';
import { questionToFormValues } from '@/schemas/question.schema';
import { QuestionForm } from './QuestionForm';

// Loads the question, then opens the shared form pre-filled with its values.
export function QuestionEditView({ questionId }: { questionId: string }) {
   const { data: question, isPending } = useQuestion(questionId);

   if (isPending) return <ContentSkeleton />;
   if (!question) return <NotFoundState entityName="question" backHref={ROUTES.questions} />;

   return (
      <QuestionForm
         title={`Edit Question ${question.code}`}
         questionId={questionId}
         defaultValues={questionToFormValues(question)}
      />
   );
}
