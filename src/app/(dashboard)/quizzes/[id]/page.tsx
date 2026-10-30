import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { QuizBreadcrumb } from '@/components/quizzes/QuizBreadcrumb';
import { QuizDetailView } from '@/components/quizzes/QuizDetailView';
import { QuizHeaderActions } from '@/components/quizzes/QuizHeaderActions';

export const metadata: Metadata = { title: 'Quiz detail' };

export default async function QuizDetailPage({ params }: PageProps<'/quizzes/[id]'>) {
   const { id } = await params;

   return (
      <>
         <PageHeader
            title="Quiz"
            breadcrumb={<QuizBreadcrumb quizId={id} />}
            actions={<QuizHeaderActions quizId={id} />}
         />
         <PageBody>
            <QuizDetailView quizId={id} />
         </PageBody>
      </>
   );
}
