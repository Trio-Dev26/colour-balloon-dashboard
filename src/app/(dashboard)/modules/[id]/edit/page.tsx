import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { ModuleEditView } from '@/components/modules/ModuleEditView';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Edit module' };

export default async function EditModulePage({ params }: PageProps<'/modules/[id]/edit'>) {
   const { id } = await params;

   return (
      <>
         <PageHeader
            title="Module"
            breadcrumbs={[{ label: 'Module', href: ROUTES.modules }, { label: 'Edit Module' }]}
         />
         <PageBody>
            <ModuleEditView moduleId={id} />
         </PageBody>
      </>
   );
}
