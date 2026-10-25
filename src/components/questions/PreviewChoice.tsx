import type { ReactNode } from 'react';

interface PreviewChoiceProps {
   /** Radio group name: one per previewed question. */
   name: string;
   children: ReactNode;
}

// A pickable answer card (multiple choice option, True / False). Nothing is marked correct.
export function PreviewChoice({ name, children }: PreviewChoiceProps) {
   return (
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-muted has-checked:border-primary has-checked:bg-accent">
         <input type="radio" name={name} className="size-4 shrink-0 accent-primary" />
         {children}
      </label>
   );
}
