import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/page-placeholder';

export const metadata: Metadata = { title: 'Units' };

export default function UnitsPage() {
   return <PagePlaceholder title="Units" description="Manage units inside each module." />;
}
