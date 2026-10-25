import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { QuestionEditView } from '@/components/questions/QuestionEditView';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Edit question' };

export default async function EditQuestionPage({ params }: PageProps<'/questions/[id]/edit'>) {
   const { id } = await params;

   return (
      <>
         <PageHeader
            title="Question Bank"
            breadcrumbs={[{ label: 'Question Bank', href: ROUTES.questions }, { label: 'Edit Question' }]}
         />
         <PageBody>
            <QuestionEditView questionId={id} />
         </PageBody>
      </>
   );
}
