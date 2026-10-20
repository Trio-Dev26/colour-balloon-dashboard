import type { Metadata } from 'next';
import { LessonEditView } from '@/components/lessons/LessonEditView';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Edit lesson' };

export default async function EditLessonPage({ params }: PageProps<'/lessons/[id]/edit'>) {
   const { id } = await params;

   return (
      <>
         <PageHeader
            title="Lesson"
            breadcrumbs={[{ label: 'Lesson', href: ROUTES.lessons }, { label: 'Edit Lesson' }]}
         />
         <PageBody>
            <LessonEditView lessonId={id} />
         </PageBody>
      </>
   );
}
