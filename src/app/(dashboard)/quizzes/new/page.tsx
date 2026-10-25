import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { QuizForm } from '@/components/quizzes/QuizForm';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Create quiz' };

export default function CreateQuizPage() {
   return (
      <>
         <PageHeader title="Quiz" breadcrumbs={[{ label: 'Quiz', href: ROUTES.quizzes }, { label: 'Create Quiz' }]} />
         <PageBody>
            <QuizForm title="Create New Quiz" />
         </PageBody>
      </>
   );
}
