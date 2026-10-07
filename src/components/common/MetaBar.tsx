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
      <div className="flex flex-wrap items-center gap-6 py-0.5">
         {items.map((item, index) => (
            <Fragment key={item.label}>
               {index > 0 && <Separator orientation="vertical" className="h-7" />}
               <MetaChip label={item.label} value={item.value ?? EMPTY_VALUE} tone={item.tone} />
            </Fragment>
         ))}
      </div>
   );
}
