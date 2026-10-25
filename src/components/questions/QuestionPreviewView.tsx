'use client';

import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { MetaBar } from '@/components/common/MetaBar';
import { NotFoundState } from '@/components/common/NotFoundState';
import { QUESTION_TYPE_LABELS } from '@/constants/question';
import { ROUTES } from '@/constants/routes';
import { useQuestion } from '@/hooks/useQuestions';
import { QuestionPreview } from './QuestionPreview';

// Question code, type and place in the curriculum, then the learner preview.
export function QuestionPreviewView({ questionId }: { questionId: string }) {
   const { data: question, isPending } = useQuestion(questionId);

   if (isPending) return <ContentSkeleton />;
   if (!question) return <NotFoundState entityName="question" backHref={ROUTES.questions} />;

   return (
      <>
         <MetaBar
            items={[
               { label: 'Question code', value: question.code, tone: 'neutral' },
               { label: 'Type', value: QUESTION_TYPE_LABELS[question.type], tone: 'info' },
               { label: 'Module code', value: question.moduleCode, tone: 'warning' },
               { label: 'Unit code', value: question.unitCode, tone: 'primary' },
            ]}
         />
         <QuestionPreview question={question} />
      </>
   );
}
