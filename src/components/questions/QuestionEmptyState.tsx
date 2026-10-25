import type { ReactNode } from 'react';
import { EmptyIllustration } from '@/components/common/EmptyIllustration';
import { EmptyState } from '@/components/common/EmptyState';

// "No questions yet!" on the question bank list.
export function QuestionEmptyState({ action }: { action: ReactNode }) {
   return (
      <EmptyState
         icon={<EmptyIllustration />}
         title="No questions yet!"
         description="It looks like you haven’t created any questions. Add some to build quizzes for your students."
         action={action}
      />
   );
}
