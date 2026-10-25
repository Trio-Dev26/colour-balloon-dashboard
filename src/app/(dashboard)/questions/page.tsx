import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { QuestionListView } from '@/components/questions/QuestionListView';

export const metadata: Metadata = { title: 'Question Bank' };

export default function QuestionBankPage() {
   return (
      <>
         <PageHeader title="Question Bank" description="Create questions for quizzes and Chapter End Tests." />
         <PageBody>
            {/* Suspense: the list reads its filters from the URL (useSearchParams). */}
            <Suspense>
               <QuestionListView />
            </Suspense>
         </PageBody>
      </>
   );
}
