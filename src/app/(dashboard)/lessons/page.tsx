import { Suspense } from 'react';
import type { Metadata } from 'next';
import { LessonListView } from '@/components/lessons/LessonListView';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = { title: 'Lessons' };

export default function LessonsPage() {
   return (
      <>
         <PageHeader title="Lesson" description="Create new lessons and assign to a unit." />
         <PageBody>
            {/* Suspense: the list reads its filters from the URL (useSearchParams). */}
            <Suspense>
               <LessonListView />
            </Suspense>
         </PageBody>
      </>
   );
}
