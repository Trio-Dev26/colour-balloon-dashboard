import type { ReactNode } from 'react';
import { EmptyIllustration } from '@/components/common/EmptyIllustration';
import { EmptyState } from '@/components/common/EmptyState';

// Figma: "No unit yet!" on the unit list, "No units yet!" inside a module's Units section.
export function UnitEmptyState({ title, action }: { title: string; action: ReactNode }) {
   return (
      <EmptyState
         icon={<EmptyIllustration />}
         title={title}
         description="It looks like you haven’t created any units. Let’s build some amazing for your students."
         action={action}
      />
   );
}
