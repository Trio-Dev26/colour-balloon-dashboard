import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/PagePlaceholder';

export const metadata: Metadata = { title: 'Question Bank' };

export default function QuestionBankPage() {
   return <PagePlaceholder title="Question Bank" description="Create questions for quizzes and Chapter End Tests." />;
}
