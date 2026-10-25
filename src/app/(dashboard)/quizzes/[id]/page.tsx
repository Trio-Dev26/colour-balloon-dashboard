import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { QuizDetailView } from '@/components/quizzes/QuizDetailView';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Quiz detail' };

export default async function QuizDetailPage({ params }: PageProps<'/quizzes/[id]'>) {
   const { id } = await params;

   return (
      <>
         <PageHeader title="Quiz" breadcrumbs={[{ label: 'Quiz', href: ROUTES.quizzes }, { label: 'Quiz Details' }]} />
         <PageBody>
            <QuizDetailView quizId={id} />
         </PageBody>
      </>
   );
}
