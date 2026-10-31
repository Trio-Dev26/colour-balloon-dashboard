import type { Metadata } from 'next';
import { LessonBreadcrumb } from '@/components/lessons/LessonBreadcrumb';
import { LessonEditView } from '@/components/lessons/LessonEditView';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = { title: 'Edit lesson' };

export default async function EditLessonPage({ params }: PageProps<'/lessons/[id]/edit'>) {
   const { id } = await params;

   return (
      <>
         <PageHeader title="Lesson" breadcrumb={<LessonBreadcrumb lessonId={id} current="Edit" />} />
         <PageBody>
            <LessonEditView lessonId={id} />
         </PageBody>
      </>
   );
}
