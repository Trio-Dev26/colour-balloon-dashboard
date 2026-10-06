import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { Tone } from '@/types/ui/common.types';

const TONE_CLASSES: Record<Tone, string> = {
   success: 'border-success-border bg-success text-success-foreground',
   info: 'border-transparent bg-info text-info-foreground',
   warning: 'border-transparent bg-warning text-warning-foreground',
   neutral: 'border-border bg-muted text-muted-foreground',
   primary: 'border-transparent bg-info text-accent-foreground',
};

// Small rounded status label (e.g. "Published", "First unit").
export function ToneBadge({ tone, children, className }: { tone: Tone; children: ReactNode; className?: string }) {
   return (
      <span
         className={cn(
            'inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap',
            TONE_CLASSES[tone],
            className
         )}
      >
         {children}
      </span>
   );
}
