'use client';

import type { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Explains why a control is disabled. Disabled elements get no hover events, so the tooltip sits on a wrapper.
// Without a hint it renders the children as they are.
export function HintTooltip({ hint, children }: { hint?: string; children: ReactNode }) {
   if (!hint) return children;

   return (
      <Tooltip>
         <TooltipTrigger render={<span className="inline-flex" tabIndex={0} />}>{children}</TooltipTrigger>
         <TooltipContent className="max-w-64">{hint}</TooltipContent>
      </Tooltip>
   );
}
