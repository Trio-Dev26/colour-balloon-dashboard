'use client';

import { RotateCcwIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sequenceSlotWord } from '@/constants/question';
import { usePointerDrag } from '@/hooks/usePointerDrag';
import { useSequenceBoard } from '@/hooks/useSequenceBoard';
import { useShuffledOrder } from '@/hooks/useShuffledOrder';
import type { QuestionAnswersByType } from '@/types/api/question.types';
import { SequenceCard } from './SequenceCard';
import { SequenceSlot } from './SequenceSlot';

const GRID = 'grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-3';

interface SequencePreviewProps {
   answers: QuestionAnswersByType['SEQUENCE'];
   mediaUrls: Record<string, string>;
}

/** The slot under the pointer while a card is dragged, if any. */
const slotAt = (x: number, y: number) => {
   const slot = document.elementFromPoint(x, y)?.closest('[data-sequence-slot]');
   return slot ? Number(slot.getAttribute('data-sequence-slot')) : null;
};

// FR-QB-007 as the learner sees it: numbered slots (1 First … Last) above a tray of shuffled step cards. Tap a card
// to put it in the next empty slot, or drag it onto any slot; tap a placed card (or drag it back) to return it.
// Tap-to-place is there for young children, who find dragging hard. Nothing is marked.
export function SequencePreview({ answers, mediaUrls }: SequencePreviewProps) {
   const { steps } = answers;
   const order = useShuffledOrder(steps.length);
   const board = useSequenceBoard(steps.length);
   const { drag, startDrag, onTap } = usePointerDrag<number>((card, target) => {
      const slot = target?.closest('[data-sequence-slot]');
      if (slot) board.place(card, Number(slot.getAttribute('data-sequence-slot')));
      else if (target?.closest('[data-tray]')) board.takeOut(card);
   });
   const hoveredSlot = drag ? slotAt(drag.clientX, drag.clientY) : null;
   const tray = order.filter((card) => !board.isPlaced(card));

   const card = (step: number, placed: boolean) => (
      <SequenceCard
         key={step}
         item={steps[step]}
         mediaUrls={mediaUrls}
         label={`Step card${steps[step].text ? `: ${steps[step].text}` : ''}. ${
            placed ? 'Tap to take it out' : 'Tap to put it in the next slot'
         }`}
         onTap={onTap(() => (placed ? board.takeOut(step) : board.place(step)))}
         onDragStart={startDrag(step)}
      />
   );

   return (
      <div className="flex flex-col gap-4">
         <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <span aria-live="polite">
               {board.placedCount} of {steps.length} placed
            </span>
            <Button type="button" variant="ghost" size="sm" onClick={board.reset} disabled={!board.placedCount}>
               <RotateCcwIcon />
               Start again
            </Button>
         </div>
         <ol className={GRID} aria-label="Order">
            {board.slots.map((step, index) => (
               <li key={index}>
                  <SequenceSlot
                     index={index}
                     word={sequenceSlotWord(index, steps.length)}
                     highlighted={hoveredSlot === index}
                  >
                     {step === null ? undefined : card(step, true)}
                  </SequenceSlot>
               </li>
            ))}
         </ol>
         <div data-tray className="flex flex-col gap-2 rounded-xl bg-muted/60 p-3">
            <span className="text-xs font-medium text-muted-foreground">Cards</span>
            {tray.length ? (
               <div className={GRID}>{tray.map((step) => card(step, false))}</div>
            ) : (
               <p className="py-2 text-center text-xs text-muted-foreground">All cards are placed.</p>
            )}
         </div>
         <p className="text-xs text-muted-foreground">
            Tap a card to put it in the next slot, or drag it to any slot. Tap a placed card to take it out.
         </p>
         {drag && (
            // The card follows the pointer while it's dragged.
            <div
               className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2"
               style={{ left: drag.clientX, top: drag.clientY }}
               aria-hidden
            >
               <SequenceCard
                  item={steps[drag.payload]}
                  mediaUrls={mediaUrls}
                  label=""
                  ghost
                  onTap={() => {}}
                  onDragStart={() => {}}
               />
            </div>
         )}
      </div>
   );
}
