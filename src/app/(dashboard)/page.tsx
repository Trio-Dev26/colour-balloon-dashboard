import type { Metadata } from 'next';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { PageBody } from '@/components/layout/PageBody';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
   return (
      <>
         <PageHeader title="Dashboard" description="Your curriculum at a glance." />
         <PageBody>
            <DashboardView />
         </PageBody>
      </>
   );
}
