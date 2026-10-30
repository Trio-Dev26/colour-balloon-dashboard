import { EMPTY_VALUE } from '@/constants/common';
import type { Tone } from '@/types/ui/common.types';
import { MetaChip } from './MetaChip';

export interface MetaBarItem {
   label: string;
   value?: string;
   /** Shows the value as a coloured pill; plain bold text when omitted. */
   tone?: Tone;
}

// Card of "LABEL / value" cells at the top of detail pages. A grid on phones and tablets.
// From desktop width it is one row as wide as its content; when the cells don't fit they wrap
// and stretch to fill each line. Every cell draws its own top and left divider, pulled 1px out
// so the card's edge clips the ones on the outside.
export function MetaBar({ items }: { items: MetaBarItem[] }) {
   return (
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg border bg-card p-3 sm:grid-cols-3 lg:flex lg:w-fit lg:max-w-full lg:flex-wrap lg:gap-0 lg:overflow-hidden lg:p-0">
         {items.map((item) => (
            <MetaChip
               key={item.label}
               label={item.label}
               value={item.value ?? EMPTY_VALUE}
               tone={item.tone}
               className="lg:-mt-px lg:-ml-px lg:flex-auto lg:border-t lg:border-l lg:px-4 lg:py-3"
            />
         ))}
      </dl>
   );
}
