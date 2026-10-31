import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { ModuleBreadcrumb } from '@/components/modules/ModuleBreadcrumb';
import { ModuleEditView } from '@/components/modules/ModuleEditView';

export const metadata: Metadata = { title: 'Edit module' };

export default async function EditModulePage({ params }: PageProps<'/modules/[id]/edit'>) {
   const { id } = await params;

   return (
      <>
         <PageHeader title="Module" breadcrumb={<ModuleBreadcrumb moduleId={id} current="Edit" />} />
         <PageBody>
            <ModuleEditView moduleId={id} />
         </PageBody>
      </>
   );
}
