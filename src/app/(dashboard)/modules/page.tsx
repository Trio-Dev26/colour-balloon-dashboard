import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';
import { ModuleListView } from '@/components/modules/ModuleListView';

export const metadata: Metadata = { title: 'Modules' };

export default function ModulesPage() {
   return (
      <>
         <PageHeader title="Module" description="Create and manage module here." />
         <PageBody>
            {/* Suspense: the list reads its filters from the URL (useSearchParams). */}
            <Suspense>
               <ModuleListView />
            </Suspense>
         </PageBody>
      </>
   );
}
