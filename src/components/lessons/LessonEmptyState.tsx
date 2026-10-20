import type { ReactNode } from 'react';
import { EmptyIllustration } from '@/components/common/EmptyIllustration';
import { EmptyState } from '@/components/common/EmptyState';

// "No lessons yet!" on the lesson list and inside a unit's Lessons section.
export function LessonEmptyState({ action }: { action: ReactNode }) {
   return (
      <EmptyState
         icon={<EmptyIllustration />}
         title="No lessons yet!"
         description="It looks like you haven’t created any lessons. Let’s build some amazing for your students."
         action={action}
      />
   );
}
