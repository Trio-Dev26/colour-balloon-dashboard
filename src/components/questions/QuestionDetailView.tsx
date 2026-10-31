'use client';

import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { MetaBar } from '@/components/common/MetaBar';
import { NotFoundState } from '@/components/common/NotFoundState';
import { hasPartialPoints, QUESTION_TYPE_LABELS } from '@/constants/question';
import { ROUTES } from '@/constants/routes';
import { useModule } from '@/hooks/useModules';
import { useQuestion } from '@/hooks/useQuestions';
import { answerPartCount } from '@/lib/questionAnswers';
import { QuestionAnswerCard } from './QuestionAnswerCard';
import { QuestionContentCard } from './QuestionContentCard';
import { QuestionQuizzesCard } from './QuestionQuizzesCard';

// Question detail (FR-QB-008): code, type, level, category, scoring and use across the top; the question with its
// answer key (or learner view) on the left; the answer summary and the quizzes using it on the right.
export function QuestionDetailView({ questionId }: { questionId: string }) {
   const { data: question, isPending } = useQuestion(questionId);
   // The question API doesn't send the module's level and category; the module detail does (shared cache).
   const { data: module } = useModule(question?.moduleId ?? '');

   if (isPending) return <ContentSkeleton />;
   if (!question) return <NotFoundState entityName="question" backHref={ROUTES.questions} />;

   const partial = hasPartialPoints(question.type, answerPartCount(question));
   const quizCount = question.quizzes.length;

   return (
      <>
         <MetaBar
            items={[
               { label: 'Question code', value: question.code, tone: 'neutral' },
               { label: 'Type', value: QUESTION_TYPE_LABELS[question.type], tone: 'info' },
               { label: 'Level', value: module?.level.titleEn, tone: 'success' },
               { label: 'Category', value: module?.category.titleEn, tone: 'info' },
               // D22: partial points for matching, sequence and multi-blank; the rest all or nothing.
               { label: 'Points', value: `${question.points} · ${partial ? 'partial points' : 'all or nothing'}` },
               {
                  label: 'Used in',
                  value: quizCount ? `${quizCount} quiz${quizCount === 1 ? '' : 'zes'}` : 'No quizzes',
               },
            ]}
         />
         <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <QuestionContentCard question={question} />
            <div className="flex flex-col gap-6">
               <QuestionAnswerCard question={question} />
               <QuestionQuizzesCard question={question} />
            </div>
         </div>
      </>
   );
}
