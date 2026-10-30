import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { QuizListView } from '@/components/quizzes/QuizListView';

export const metadata: Metadata = { title: 'Quizzes' };

export default function QuizzesPage() {
   return (
      <>
         <PageHeader title="Quiz" description="Create new quiz and assign to a unit." />
         <PageBody>
            {/* Suspense: the list reads its filters from the URL (useSearchParams). */}
            <Suspense>
               <QuizListView />
            </Suspense>
         </PageBody>
      </>
   );
}
