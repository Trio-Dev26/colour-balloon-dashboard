import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { QuizListView } from '@/components/quizzes/QuizListView';

export const metadata: Metadata = { title: 'Quizzes' };

export default function QuizzesPage() {
   return (
      <>
         <PageHeader title="Quiz" description="Build unit quizzes and Chapter End Tests from the question bank." />
         <PageBody>
            {/* Suspense: the list reads its filters from the URL (useSearchParams). */}
            <Suspense>
               <QuizListView />
            </Suspense>
         </PageBody>
      </>
   );
}
