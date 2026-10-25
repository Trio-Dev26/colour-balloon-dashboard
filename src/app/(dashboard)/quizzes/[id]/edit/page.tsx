import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { QuizEditView } from '@/components/quizzes/QuizEditView';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Edit quiz' };

export default async function EditQuizPage({ params }: PageProps<'/quizzes/[id]/edit'>) {
   const { id } = await params;

   return (
      <>
         <PageHeader title="Quiz" breadcrumbs={[{ label: 'Quiz', href: ROUTES.quizzes }, { label: 'Edit Quiz' }]} />
         <PageBody>
            <QuizEditView quizId={id} />
         </PageBody>
      </>
   );
}
