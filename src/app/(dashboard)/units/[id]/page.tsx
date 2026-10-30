import type { Metadata } from 'next';
import { UnitDetailActions } from '@/components/units/UnitDetailActions';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { UnitBreadcrumb } from '@/components/units/UnitBreadcrumb';
import { UnitDetailView } from '@/components/units/UnitDetailView';

export const metadata: Metadata = { title: 'Unit detail' };

export default async function UnitDetailPage({ params }: PageProps<'/units/[id]'>) {
   const { id } = await params;

   return (
      <>
         <PageHeader
            title="Unit"
            breadcrumb={<UnitBreadcrumb unitId={id} />}
            actions={<UnitDetailActions unitId={id} />}
         />
         <PageBody>
            <UnitDetailView unitId={id} />
         </PageBody>
      </>
   );
}
