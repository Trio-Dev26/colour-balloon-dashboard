'use client';

import type { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Explains why a control is disabled. Disabled elements get no hover events, so the tooltip sits on a wrapper.
// Without a hint it renders the children as they are.
export function HintTooltip({ hint, children }: { hint?: string; children: ReactNode }) {
   if (!hint) return children;

   return (
      <Tooltip>
         {/* data-no-row-click: clicking a disabled control in a clickable table row must not open the row. */}
         <TooltipTrigger render={<span className="inline-flex" tabIndex={0} data-no-row-click />}>
            {children}
         </TooltipTrigger>
         <TooltipContent className="max-w-64">{hint}</TooltipContent>
      </Tooltip>
   );
}
