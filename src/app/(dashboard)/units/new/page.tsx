import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { UnitForm } from '@/components/units/UnitForm';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Create unit' };

export default function CreateUnitPage() {
   return (
      <>
         <PageHeader title="Unit" breadcrumbs={[{ label: 'Unit', href: ROUTES.units }, { label: 'Create Unit' }]} />
         <PageBody>
            <UnitForm title="Create New Unit" />
         </PageBody>
      </>
   );
}
