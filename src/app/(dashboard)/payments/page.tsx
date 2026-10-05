import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/page-placeholder';

export const metadata: Metadata = { title: 'Payments' };

export default function PaymentsPage() {
   return <PagePlaceholder title="Payments" description="View payments and subscriptions." />;
}
