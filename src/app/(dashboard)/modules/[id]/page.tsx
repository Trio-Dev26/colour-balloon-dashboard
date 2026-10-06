import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { ModuleDetailActions } from '@/components/modules/ModuleDetailActions';
import { ModuleDetailView } from '@/components/modules/ModuleDetailView';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Module detail' };

export default async function ModuleDetailPage({ params }: PageProps<'/modules/[id]'>) {
   const { id } = await params;

   return (
      <>
         <PageHeader
            title="Module"
            breadcrumbs={[{ label: 'Module', href: ROUTES.modules }, { label: 'Module Detail' }]}
            actions={<ModuleDetailActions moduleId={id} />}
         />
         <PageBody>
            <ModuleDetailView moduleId={id} />
         </PageBody>
      </>
   );
}
