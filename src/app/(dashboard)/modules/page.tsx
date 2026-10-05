import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/page-placeholder';

export const metadata: Metadata = { title: 'Modules' };

export default function ModulesPage() {
   return <PagePlaceholder title="Modules" description="Create, order and publish curriculum modules." />;
}
