import { Fragment } from 'react';
import { Separator } from '@/components/ui/separator';
import { EMPTY_VALUE } from '@/constants/common';
import type { Tone } from '@/types/ui/common.types';
import { MetaChip } from './MetaChip';

export interface MetaBarItem {
   label: string;
   value?: string;
   tone: Tone;
}

// Row of "LABEL value" pills separated by vertical lines (top of detail pages).
export function MetaBar({ items }: { items: MetaBarItem[] }) {
   return (
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-0.5">
         {items.map((item, index) => (
            <Fragment key={item.label}>
               {/* Hidden below desktop width, where the chips wrap and a divider would dangle at a line edge. */}
               {index > 0 && <Separator orientation="vertical" className="hidden h-7 lg:block" />}
               <MetaChip label={item.label} value={item.value ?? EMPTY_VALUE} tone={item.tone} />
            </Fragment>
         ))}
      </div>
   );
}
