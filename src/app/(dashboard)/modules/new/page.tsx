import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { ModuleForm } from '@/components/modules/ModuleForm';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Create module' };

export default function CreateModulePage() {
   return (
      <>
         <PageHeader
            title="Module"
            breadcrumbs={[{ label: 'Module', href: ROUTES.modules }, { label: 'Create Module' }]}
         />
         <PageBody>
            <ModuleForm title="Create New Module" />
         </PageBody>
      </>
   );
}
