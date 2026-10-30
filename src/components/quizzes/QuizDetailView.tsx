'use client';

import { ContentCard } from '@/components/common/ContentCard';
import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { MetaBar } from '@/components/common/MetaBar';
import { NotFoundState } from '@/components/common/NotFoundState';
import { InfoAlert } from '@/components/common/InfoAlert';
import { MODULE_STATUS } from '@/constants/module';
import { attemptsLabel, emptyQuizWarning, passMarkLabel, QUIZ_TYPE, requiredLabel } from '@/constants/quiz';
import { ROUTES } from '@/constants/routes';
import { useQuiz } from '@/hooks/useQuizzes';
import { QuizQuestionsSection } from './QuizQuestionsSection';

// Quiz details: code, type and scoring rules across the top, the bilingual content card,
// then its questions.
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
               { label: 'Status', value: requiredLabel(quiz.required), tone: 'neutral' },
               {
                  label: 'Module status',
                  value: MODULE_STATUS[quiz.moduleStatus].label,
                  tone: MODULE_STATUS[quiz.moduleStatus].tone,
               },
               { label: 'Pass mark', value: passMarkLabel(quiz.passPercent, quiz.totalPoints), tone: 'success' },
               { label: 'Attempts', value: attemptsLabel(quiz.maxAttempts) },
               // D21: the total is the sum of the question points.
               {
                  label: 'Questions',
                  value: `${quiz.questionCount} · ${quiz.totalPoints} point${quiz.totalPoints === 1 ? '' : 's'}`,
               },
            ]}
         />
         <ContentCard
            titleEn={quiz.titleEn}
            titleMy={quiz.titleMy}
            descriptionEn={quiz.descriptionEn}
            descriptionMy={quiz.descriptionMy}
         />
         {quiz.questionCount === 0 && (
            <InfoAlert tone="warning">{emptyQuizWarning(quiz.required, quiz.type)}</InfoAlert>
         )}
         <QuizQuestionsSection quiz={quiz} />
      </>
   );
}
