import type { Metadata } from 'next';
import { LessonForm } from '@/components/lessons/LessonForm';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Create lesson' };

export default function CreateLessonPage() {
   return (
      <>
         <PageHeader
            title="Lesson"
            breadcrumbs={[{ label: 'Lesson', href: ROUTES.lessons }, { label: 'Create Lesson' }]}
         />
         <PageBody>
            <LessonForm title="Create New Lesson" />
         </PageBody>
      </>
   );
}
