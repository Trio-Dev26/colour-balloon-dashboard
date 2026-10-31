'use client';

import Link from 'next/link';
import { CardSection } from '@/components/common/CardSection';
import { InfoAlert } from '@/components/common/InfoAlert';
import { ToneBadge } from '@/components/common/ToneBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { MODULE_STATUS } from '@/constants/module';
import { QUIZ_TYPE } from '@/constants/quiz';
import { ROUTES } from '@/constants/routes';
import { useQuizzesByIds } from '@/hooks/useQuizzes';
import type { QuestionDetail } from '@/types/api/question.types';

// USED IN QUIZZES card on the question detail page (D18: a question in a quiz can't be deleted). Each quiz links
// to its page and shows where it sits and whether learners can see it (its module's status).
export function QuestionQuizzesCard({ question }: { question: QuestionDetail }) {
   const quizzes = useQuizzesByIds(question.quizzes.map((quiz) => quiz.id));

   return (
      <CardSection title={`Used in quizzes (${question.quizzes.length})`}>
         {question.quizzes.length === 0 ? (
            <p className="text-sm text-muted-foreground">Not used in any quiz yet.</p>
         ) : (
            <div className="flex flex-col gap-3">
               <ul className="flex flex-col divide-y">
                  {question.quizzes.map(({ id, code }, index) => {
                     const quiz = quizzes[index]?.data;
                     const status = quiz ? MODULE_STATUS[quiz.moduleStatus] : null;
                     return (
                        <li key={id} className="flex items-start justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                           <div className="flex min-w-0 flex-col gap-0.5">
                              <Link
                                 href={ROUTES.quizDetail(id)}
                                 className="truncate text-sm font-semibold hover:text-accent-foreground hover:underline"
                              >
                                 {code}
                                 {quiz && ` · ${quiz.titleEn}`}
                              </Link>
                              {quiz ? (
                                 <span className="text-xs text-muted-foreground">
                                    {quiz.unitCode ?? quiz.moduleCode} · {QUIZ_TYPE[quiz.type].label}
                                 </span>
                              ) : (
                                 <Skeleton className="h-3 w-28" />
                              )}
                           </div>
                           {status && (
                              <ToneBadge tone={status.tone} className="shrink-0">
                                 {status.label}
                              </ToneBadge>
                           )}
                        </li>
                     );
                  })}
               </ul>
               <InfoAlert tone="warning">Editing this question changes it in every quiz listed here.</InfoAlert>
            </div>
         )}
      </CardSection>
   );
}
