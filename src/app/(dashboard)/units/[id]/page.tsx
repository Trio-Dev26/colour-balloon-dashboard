import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { UnitDetailView } from '@/components/units/UnitDetailView';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Unit detail' };

export default async function UnitDetailPage({ params }: PageProps<'/units/[id]'>) {
   const { id } = await params;

   return (
      <>
         <PageHeader title="Unit" breadcrumbs={[{ label: 'Unit', href: ROUTES.units }, { label: 'Unit Details' }]} />
         <PageBody>
            <UnitDetailView unitId={id} />
         </PageBody>
      </>
   );
}
