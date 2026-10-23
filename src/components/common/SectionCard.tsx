import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionCardProps {
   title: string;
   description?: string;
   /** Shown on the right of the title, e.g. a "View all" link. */
   action?: ReactNode;
   children: ReactNode;
   className?: string;
}

// White rounded card with a title row (dashboard panels).
export function SectionCard({ title, description, action, children, className }: SectionCardProps) {
   return (
      <section className={cn('flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-xs', className)}>
         <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-0.5">
               <h2 className="text-base leading-5 font-semibold tracking-tight">{title}</h2>
               {description && <p className="text-xs text-muted-foreground">{description}</p>}
            </div>
            {action}
         </div>
         {children}
      </section>
   );
}
