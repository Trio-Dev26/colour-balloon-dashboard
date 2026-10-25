'use client';

import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { NotFoundState } from '@/components/common/NotFoundState';
import { ROUTES } from '@/constants/routes';
import { useQuiz } from '@/hooks/useQuizzes';
import { quizToFormValues } from '@/schemas/quiz.schema';
import { QuizForm } from './QuizForm';

// Loads the quiz, then opens the shared form pre-filled with its values.
export function QuizEditView({ quizId }: { quizId: string }) {
   const { data: quiz, isPending } = useQuiz(quizId);

   if (isPending) return <ContentSkeleton />;
   if (!quiz) return <NotFoundState entityName="quiz" backHref={ROUTES.quizzes} />;

   return <QuizForm title="Edit Quiz" quizId={quizId} defaultValues={quizToFormValues(quiz)} />;
}
