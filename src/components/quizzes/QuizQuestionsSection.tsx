'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { CreateButton } from '@/components/common/CreateButton';
import { EmptyIllustration } from '@/components/common/EmptyIllustration';
import { EmptyState } from '@/components/common/EmptyState';
import { OrderBadge } from '@/components/common/OrderBadge';
import { OrderedChildrenSection } from '@/components/common/ordered/OrderedChildrenSection';
import { ROUTES } from '@/constants/routes';
import { useSetQuizQuestions } from '@/hooks/useQuizzes';
import { apiErrorMessage } from '@/lib/form';
import type { QuizDetail } from '@/types/api/quiz.types';
import { AddQuestionsDialog } from './AddQuestionsDialog';
import { getQuizQuestionColumns } from './quizQuestionColumns';

// Questions section of the quiz detail page (FR-QUIZ-004, 005): add from the bank, remove, arrange.
// Every change saves the whole ordered list; the total is the sum of the points (D21).
export function QuizQuestionsSection({ quiz }: { quiz: QuizDetail }) {
   const [isAdding, setIsAdding] = useState(false);
   const setQuestions = useSetQuizQuestions(quiz.id);
   const currentIds = quiz.questions.map((question) => question.id);

   const save = (questionIds: string[], success: string) =>
      setQuestions.mutateAsync(questionIds).then(
         () => toast.success(success),
         (error: unknown) => {
            toast.error(apiErrorMessage(error, 'Couldn’t save the quiz questions. Please try again.'));
            throw error;
         }
      );

   const columns = useMemo(
      () =>
         getQuizQuestionColumns(
            (question) =>
               setQuestions.mutate(
                  quiz.questions.filter((other) => other.id !== question.id).map((other) => other.id),
                  {
                     onSuccess: () => toast.success(`${question.code} removed from the quiz`),
                     onError: (error) => toast.error(apiErrorMessage(error, `Couldn’t remove ${question.code}.`)),
                  }
               ),
            quiz.type === 'CHAPTER_END_TEST'
         ),
      [quiz.questions, quiz.type, setQuestions]
   );
   const addButton = <CreateButton label="Add questions" onClick={() => setIsAdding(true)} />;

   return (
      <>
         <OrderedChildrenSection
            title={`Questions · ${quiz.totalPoints} point${quiz.totalPoints === 1 ? '' : 's'}`}
            description={`Students pass with ${quiz.passPercent}% of the total. The total is the sum of the question points.`}
            createAction={addButton}
            items={quiz.questions}
            columns={columns}
            getId={(question) => question.id}
            getRowHref={(question) => ROUTES.questionPreview(question.id)}
            emptyState={
               <EmptyState
                  icon={<EmptyIllustration />}
                  title="No question yet!"
                  description="It looks like you haven’t added any questions. Let’s add created questions for your students."
                  action={addButton}
               />
            }
            arrange={{
               buttonLabel: 'Arrange questions',
               hint: 'Drag questions by the handle to change the order students see them in.',
               isSaving: setQuestions.isPending,
               getHandleLabel: (question, index) => `Move question ${index + 1}: ${question.code}`,
               renderItem: (question, index) => (
                  <>
                     <OrderBadge order={index + 1} />
                     <span className="truncate text-sm">
                        {question.code} · {question.promptText}
                     </span>
                  </>
               ),
               onSave: (ids) => save(ids, 'Question order saved'),
            }}
         />
         <AddQuestionsDialog
            open={isAdding}
            onOpenChange={setIsAdding}
            quiz={quiz}
            isSaving={setQuestions.isPending}
            onAdd={(ids) => save([...currentIds, ...ids], 'Questions added')}
         />
      </>
   );
}
