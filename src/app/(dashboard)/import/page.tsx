import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/page-placeholder';

export const metadata: Metadata = { title: 'Bulk Import' };

export default function BulkImportPage() {
   return <PagePlaceholder title="Bulk Import" description="Import content from an Excel or CSV template." />;
}
