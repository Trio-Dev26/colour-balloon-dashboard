import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardSectionProps {
   /** Small uppercase heading, e.g. "Settings". */
   title: string;
   /** Shown on the right of the heading, e.g. the language switch. */
   action?: ReactNode;
   children: ReactNode;
   className?: string;
}

// Bordered card with a "SETTINGS"-style heading row (quiz form, quiz detail content).
export function CardSection({ title, action, children, className }: CardSectionProps) {
   return (
      <section className={cn('rounded-xl border bg-card', className)}>
         <div className="flex min-h-14 items-center justify-between gap-3 border-b px-5 py-2">
            <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{title}</h3>
            {action}
         </div>
         <div className="p-5">{children}</div>
      </section>
   );
}
