import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/PagePlaceholder';

export const metadata: Metadata = { title: 'Quizzes' };

export default function QuizzesPage() {
   return (
      <PagePlaceholder title="Quizzes" description="Build unit quizzes and Chapter End Tests from the question bank." />
   );
}
