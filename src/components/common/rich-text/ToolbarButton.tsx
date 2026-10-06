import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

// Compact 24px toolbar button (Figma editor toolbar). `active` highlights toggled formats.
export function ToolbarButton({ active, className, ...props }: ComponentProps<'button'> & { active?: boolean }) {
   return (
      <button
         type="button"
         aria-pressed={active}
         className={cn(
            'flex h-6 min-w-6 items-center justify-center gap-0.5 rounded text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-5',
            active && 'bg-accent text-accent-foreground',
            className
         )}
         {...props}
      />
   );
}
