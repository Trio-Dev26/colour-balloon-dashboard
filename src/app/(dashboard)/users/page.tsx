import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/PagePlaceholder';

export const metadata: Metadata = { title: 'Users' };

export default function UsersPage() {
   return <PagePlaceholder title="Users" description="Search, view and suspend student and teacher accounts." />;
}
