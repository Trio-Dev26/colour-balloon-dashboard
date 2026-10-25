'use client';

import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { EntitySummary } from '@/components/common/EntitySummary';
import { MetaBar } from '@/components/common/MetaBar';
import { NotFoundState } from '@/components/common/NotFoundState';
import { attemptsLabel, QUIZ_TYPE, requiredLabel } from '@/constants/quiz';
import { ROUTES } from '@/constants/routes';
import { useQuiz } from '@/hooks/useQuizzes';
import { QuizQuestionsSection } from './QuizQuestionsSection';

// Quiz details: type, codes and rules across the top, titles and description, then its questions.
export function QuizDetailView({ quizId }: { quizId: string }) {
   const { data: quiz, isPending } = useQuiz(quizId);

   if (isPending) return <ContentSkeleton />;
   if (!quiz) return <NotFoundState entityName="quiz" backHref={ROUTES.quizzes} />;

   const type = QUIZ_TYPE[quiz.type];
   return (
      <>
         <MetaBar
            items={[
               { label: 'Quiz code', value: quiz.code, tone: 'neutral' },
               { label: 'Type', value: type.label, tone: type.tone },
               { label: 'Module code', value: quiz.moduleCode, tone: 'warning' },
               ...(quiz.unitCode ? [{ label: 'Unit code', value: quiz.unitCode, tone: 'primary' as const }] : []),
               { label: 'Pass mark', value: `${quiz.passPercent}%`, tone: 'success' },
               { label: 'Attempts', value: attemptsLabel(quiz.maxAttempts), tone: 'info' },
               { label: 'Status', value: requiredLabel(quiz.required), tone: 'neutral' },
            ]}
         />
         <EntitySummary titleEn={quiz.titleEn} titleMy={quiz.titleMy} description={quiz.descriptionEn} />
         <QuizQuestionsSection quiz={quiz} />
      </>
   );
}
