import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { QuestionBreadcrumb } from '@/components/questions/QuestionBreadcrumb';
import { QuestionPreviewActions } from '@/components/questions/QuestionPreviewActions';
import { QuestionDetailView } from '@/components/questions/QuestionDetailView';

export const metadata: Metadata = { title: 'Question detail' };

export default async function QuestionDetailPage({ params }: PageProps<'/questions/[id]'>) {
   const { id } = await params;

   return (
      <>
         <PageHeader
            title="Question Bank"
            breadcrumb={<QuestionBreadcrumb questionId={id} />}
            actions={<QuestionPreviewActions questionId={id} />}
         />
         <PageBody>
            <QuestionDetailView questionId={id} />
         </PageBody>
      </>
   );
}
