import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/PagePlaceholder';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
   return <PagePlaceholder title="Dashboard" description="Usage, subscriptions and enrollment at a glance." />;
}
