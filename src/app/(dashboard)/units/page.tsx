import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { UnitListView } from '@/components/units/UnitListView';

export const metadata: Metadata = { title: 'Units' };

export default function UnitsPage() {
   return (
      <>
         <PageHeader title="Unit" description="Create units and assign to a module." />
         <PageBody>
            {/* Suspense: the list reads its filters from the URL (useSearchParams). */}
            <Suspense>
               <UnitListView />
            </Suspense>
         </PageBody>
      </>
   );
}
