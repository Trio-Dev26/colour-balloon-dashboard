import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/page-placeholder';

export const metadata: Metadata = { title: 'Lessons' };

export default function LessonsPage() {
   return <PagePlaceholder title="Lessons" description="Manage lessons and their student and teacher files." />;
}
