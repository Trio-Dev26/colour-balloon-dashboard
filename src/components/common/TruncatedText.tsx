'use client';

import { useRef, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// One line cut with "…"; hovering or focusing shows the full text, but only when it is actually cut off.
export function TruncatedText({ text, className }: { text: string; className?: string }) {
   const ref = useRef<HTMLSpanElement>(null);
   const [open, setOpen] = useState(false);

   return (
      <Tooltip
         open={open}
         onOpenChange={(next) => {
            const element = ref.current;
            setOpen(next && element !== null && element.scrollWidth > element.clientWidth);
         }}
      >
         <TooltipTrigger render={<span ref={ref} className={cn('block truncate', className)} />}>{text}</TooltipTrigger>
         <TooltipContent className="break-words">{text}</TooltipContent>
      </Tooltip>
   );
}
