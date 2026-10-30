'use client';

import { useState } from 'react';
import { RotateCcwIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CHOICE_LETTERS, MATCH_LINE_COLORS } from '@/constants/question';
import { useMatchingBoard, type MatchCardRef } from '@/hooks/useMatchingBoard';
import { usePointerDrag } from '@/hooks/usePointerDrag';
import { useShuffledOrder } from '@/hooks/useShuffledOrder';
import type { AnswerItem, QuestionAnswersByType } from '@/types/api/question.types';
import { MatchCard } from './MatchCard';
import { MatchingLines } from './MatchingLines';
import { PreviewItem } from './PreviewItem';

const anchorOf = ({ side, index }: MatchCardRef) => `${side}-${index}`;
const cardFromAnchor = (anchor: string): MatchCardRef => {
   const [side, index] = anchor.split('-');
   return { side: side as MatchCardRef['side'], index: Number(index) };
};
const lineColor = (left: number) => MATCH_LINE_COLORS[left % MATCH_LINE_COLORS.length];

interface MatchingPreviewProps {
   answers: QuestionAnswersByType['MATCHING'];
   mediaUrls: Record<string, string>;
}

// FR-QB-006 as the learner sees it: left items in order (1, 2…), right ones shuffled (A, B…). Draw a line from
// a card to its match, or tap one card and then the other; tap a joined card to undo. Nothing is marked.
export function MatchingPreview({ answers, mediaUrls }: MatchingPreviewProps) {
   const { pairs } = answers;
   const order = useShuffledOrder(pairs.length);
   const board = useMatchingBoard(pairs.length);
   const [container, setContainer] = useState<HTMLDivElement | null>(null);
   const { drag, startDrag, onTap } = usePointerDrag<MatchCardRef>((card, target) => {
      const anchor = target?.closest('[data-anchor]');
      const id = anchor?.getAttribute('data-anchor');
      if (id && container?.contains(anchor ?? null)) board.connect(card, cardFromAnchor(id));
   });

   const isSelected = (card: MatchCardRef) => board.selected?.side === card.side && board.selected.index === card.index;
   const lines = board.links.map(({ left, right }) => ({
      from: anchorOf({ side: 'left', index: left }),
      to: anchorOf({ side: 'right', index: right }),
      color: lineColor(left),
   }));
   const draftCard = drag?.payload ?? null;
   const draftColor = lineColor(
      draftCard?.side === 'left' ? draftCard.index : (board.leftOf(draftCard?.index ?? -1) ?? 0)
   );

   const renderCard = (card: MatchCardRef, item: AnswerItem, marker: string) => {
      const partner = card.side === 'left' ? board.rightOf(card.index) : board.leftOf(card.index);
      const hasImage = Boolean(item.mediaId && mediaUrls[item.mediaId]);
      const name = card.side === 'left' ? `Item ${marker}` : `Match ${marker}`;
      const joined =
         partner === undefined
            ? ''
            : `, joined to ${card.side === 'left' ? CHOICE_LETTERS[partner] : `item ${partner + 1}`}`;
      return (
         <MatchCard
            key={anchorOf(card)}
            side={card.side}
            marker={marker}
            anchorId={anchorOf(card)}
            selected={isSelected(card)}
            hasImage={hasImage}
            lineColor={partner === undefined ? undefined : lineColor(card.side === 'left' ? card.index : partner)}
            label={`${name}${hasImage ? ', picture' : ''}${item.text ? `: ${item.text}` : ''}${joined}`}
            onPick={onTap(() => board.pick(card))}
            onDragStart={startDrag(card)}
         >
            <PreviewItem item={item} mediaUrls={mediaUrls} stacked={hasImage} />
         </MatchCard>
      );
   };

   return (
      <div className="flex flex-col gap-3">
         <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <span aria-live="polite">
               {board.links.length} of {pairs.length} matched
            </span>
            <Button type="button" variant="ghost" size="sm" onClick={board.reset} disabled={!board.links.length}>
               <RotateCcwIcon />
               Start again
            </Button>
         </div>
         {/* One grid, row by row (left i, then right slot i), so both cards of a row share its height. */}
         <div ref={setContainer} className="relative grid grid-cols-2 gap-x-10 gap-y-3">
            {pairs.map((pair, row) => [
               renderCard({ side: 'left', index: row }, pair.left, String(row + 1)),
               renderCard({ side: 'right', index: row }, pairs[order[row]].right, CHOICE_LETTERS[row]),
            ])}
            <MatchingLines
               container={container}
               lines={lines}
               draft={drag && { from: anchorOf(drag.payload), clientX: drag.clientX, clientY: drag.clientY }}
               draftColor={draftColor}
            />
         </div>
         <p className="text-xs text-muted-foreground">
            Draw a line from an item to its match, or tap one and then the other. Tap a joined card to undo.
         </p>
      </div>
   );
}
