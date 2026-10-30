'use client';

import { DeleteEntityButton } from '@/components/common/DeleteEntityButton';
import { EditPageButton } from '@/components/common/EditPageButton';
import { ROUTES } from '@/constants/routes';
import { useDeleteQuiz, useQuiz } from '@/hooks/useQuizzes';

// Delete + "Edit quiz info" in the quiz detail header; hidden while loading or when the quiz doesn't exist.
export function QuizHeaderActions({ quizId }: { quizId: string }) {
   const { data: quiz } = useQuiz(quizId);
   const { mutateAsync: deleteQuiz } = useDeleteQuiz();
   if (!quiz) return null;

   return (
      <>
         <DeleteEntityButton
            entityName="quiz"
            name={`${quiz.code} · ${quiz.titleEn}`}
            description="The quiz will be hidden from admins and learners. Its questions stay in the question bank. This can’t be undone from the dashboard."
            onDelete={() => deleteQuiz(quiz.id)}
            redirectTo={ROUTES.quizzes}
         />
         <EditPageButton href={ROUTES.editQuiz(quiz.id)} label="Edit quiz info" />
      </>
   );
}
