import type { ReactNode } from 'react';
import { EmptyIllustration } from '@/components/common/EmptyIllustration';
import { EmptyState } from '@/components/common/EmptyState';

// "No quizzes yet!" on the quiz list.
export function QuizEmptyState({ action }: { action: ReactNode }) {
   return (
      <EmptyState
         icon={<EmptyIllustration />}
         title="No quizzes yet!"
         description="It looks like you haven’t created any quizzes. Build unit quizzes and Chapter End Tests from the question bank."
         action={action}
      />
   );
}
