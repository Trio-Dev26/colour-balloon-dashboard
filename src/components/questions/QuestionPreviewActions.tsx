'use client';

import Link from 'next/link';
import { PencilIcon } from 'lucide-react';
import { DeleteEntityButton } from '@/components/common/DeleteEntityButton';
import { Button } from '@/components/ui/button';
import { questionInUseReason } from '@/constants/question';
import { ROUTES } from '@/constants/routes';
import { useDeleteQuestion, useQuestion } from '@/hooks/useQuestions';

// Header buttons on the question preview page; hidden while loading or when the question doesn't exist.
export function QuestionPreviewActions({ questionId }: { questionId: string }) {
   const { data: question } = useQuestion(questionId);
   const { mutateAsync: deleteQuestion } = useDeleteQuestion();
   if (!question) return null;

   return (
      <>
         <DeleteEntityButton
            entityName="question"
            name={question.code}
            // D18: a question in a quiz can't be deleted.
            disabledReason={questionInUseReason(question.quizCodes)}
            onDelete={() => deleteQuestion(questionId)}
            redirectTo={ROUTES.questions}
         />
         <Button
            size="lg"
            className="font-semibold"
            nativeButton={false}
            render={<Link href={ROUTES.editQuestion(questionId)} />}
         >
            <PencilIcon />
            Edit question
         </Button>
      </>
   );
}
