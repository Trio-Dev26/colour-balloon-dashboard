import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { QuestionPreviewActions } from '@/components/questions/QuestionPreviewActions';
import { QuestionPreviewView } from '@/components/questions/QuestionPreviewView';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Question preview' };

export default async function QuestionPreviewPage({ params }: PageProps<'/questions/[id]'>) {
   const { id } = await params;

   return (
      <>
         <PageHeader
            title="Question Bank"
            breadcrumbs={[{ label: 'Question Bank', href: ROUTES.questions }, { label: 'Preview Question' }]}
            actions={<QuestionPreviewActions questionId={id} />}
         />
         <PageBody>
            <QuestionPreviewView questionId={id} />
         </PageBody>
      </>
   );
}
