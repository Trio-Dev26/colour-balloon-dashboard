import type { Metadata } from 'next';
import { EditPageButton } from '@/components/common/EditPageButton';
import { LessonDetailView } from '@/components/lessons/LessonDetailView';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Lesson detail' };

export default async function LessonDetailPage({ params }: PageProps<'/lessons/[id]'>) {
   const { id } = await params;

   return (
      <>
         <PageHeader
            title="Lesson"
            breadcrumbs={[{ label: 'Lesson', href: ROUTES.lessons }, { label: 'Lesson Details' }]}
            actions={<EditPageButton href={ROUTES.editLesson(id)} label="Edit lesson info" />}
         />
         <PageBody>
            <LessonDetailView lessonId={id} />
         </PageBody>
      </>
   );
}
