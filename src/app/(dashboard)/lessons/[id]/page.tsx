import type { Metadata } from 'next';
import { LessonDetailActions } from '@/components/lessons/LessonDetailActions';
import { LessonBreadcrumb } from '@/components/lessons/LessonBreadcrumb';
import { LessonDetailView } from '@/components/lessons/LessonDetailView';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = { title: 'Lesson detail' };

export default async function LessonDetailPage({ params }: PageProps<'/lessons/[id]'>) {
   const { id } = await params;

   return (
      <>
         <PageHeader
            title="Lesson"
            breadcrumb={<LessonBreadcrumb lessonId={id} />}
            actions={<LessonDetailActions lessonId={id} />}
         />
         <PageBody>
            <LessonDetailView lessonId={id} />
         </PageBody>
      </>
   );
}
