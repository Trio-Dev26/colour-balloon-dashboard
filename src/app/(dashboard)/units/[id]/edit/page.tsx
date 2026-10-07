import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { UnitEditView } from '@/components/units/UnitEditView';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Edit unit' };

export default async function EditUnitPage({ params }: PageProps<'/units/[id]/edit'>) {
   const { id } = await params;

   return (
      <>
         <PageHeader title="Unit" breadcrumbs={[{ label: 'Unit', href: ROUTES.units }, { label: 'Edit Unit' }]} />
         <PageBody>
            <UnitEditView unitId={id} />
         </PageBody>
      </>
   );
}
