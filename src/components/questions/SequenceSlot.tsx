import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChoiceLetter } from './ChoiceLetter';

interface SequenceSlotProps {
   /** Position, from 0. */
   index: number;
   /** "First", "Next" or "Last". */
   word: string;
   /** A card is being dragged over this slot. */
   highlighted: boolean;
   /** The card placed here, if any. */
   children?: ReactNode;
}

// A numbered place in the sequence ("1 First"). Empty slots are dashed drop targets; data-sequence-slot lets the
// preview find the slot under the pointer when a card is dropped.
export function SequenceSlot({ index, word, highlighted, children }: SequenceSlotProps) {
   return (
      <div data-sequence-slot={index} className="flex flex-col gap-1.5">
         <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <ChoiceLetter letter={String(index + 1)} />
            {word}
         </span>
         <div
            className={cn(
               'flex min-h-16 flex-1 rounded-xl transition-colors',
               !children && 'items-center justify-center border-2 border-dashed text-xs text-placeholder',
               highlighted && 'border-primary bg-accent ring-3 ring-ring/30'
            )}
         >
            {children ?? 'Empty'}
         </div>
      </div>
   );
}
