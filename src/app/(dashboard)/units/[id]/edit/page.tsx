import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { UnitBreadcrumb } from '@/components/units/UnitBreadcrumb';
import { UnitEditView } from '@/components/units/UnitEditView';

export const metadata: Metadata = { title: 'Edit unit' };

export default async function EditUnitPage({ params }: PageProps<'/units/[id]/edit'>) {
   const { id } = await params;

   return (
      <>
         <PageHeader title="Unit" breadcrumb={<UnitBreadcrumb unitId={id} current="Edit" />} />
         <PageBody>
            <UnitEditView unitId={id} />
         </PageBody>
      </>
   );
}
