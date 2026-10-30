import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { QuestionForm } from '@/components/questions/QuestionForm';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Create question' };

export default function CreateQuestionPage() {
   return (
      <>
         <PageHeader
            title="Question Bank"
            breadcrumbs={[{ label: 'Question Bank', href: ROUTES.questions }, { label: 'Create' }]}
         />
         <PageBody>
            <QuestionForm title="Create question" />
         </PageBody>
      </>
   );
}
