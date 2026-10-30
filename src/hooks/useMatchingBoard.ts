import { useState } from 'react';

export type MatchSide = 'left' | 'right';

export interface MatchCardRef {
   side: MatchSide;
   /** Left: the item's position; right: its (shuffled) slot. */
   index: number;
}

/** left index → right slot, one to one. */
type Links = Record<number, number>;

/**
 * State of a matching preview board (FR-QB-006): which cards are joined and which one is waiting for a partner.
 * Tap a card, then a card on the other side, to join them; tap a joined card to undo. Starts over when the
 * number of pairs changes (the right side is reshuffled then).
 */
export function useMatchingBoard(count: number) {
   const [links, setLinks] = useState<Links>({});
   const [selected, setSelected] = useState<MatchCardRef | null>(null);
   const [boardSize, setBoardSize] = useState(count);

   // React's "adjust state when a prop changes" pattern: reset during render, no effect needed.
   if (boardSize !== count) {
      setBoardSize(count);
      setLinks({});
      setSelected(null);
   }

   const rightOf = (left: number): number | undefined => links[left];
   const leftOf = (right: number): number | undefined => {
      const entry = Object.entries(links).find(([, slot]) => slot === right);
      return entry ? Number(entry[0]) : undefined;
   };
   const isLinked = ({ side, index }: MatchCardRef) =>
      side === 'left' ? rightOf(index) !== undefined : leftOf(index) !== undefined;

   const connect = (a: MatchCardRef, b: MatchCardRef) => {
      if (a.side === b.side) return;
      const [left, right] = a.side === 'left' ? [a.index, b.index] : [b.index, a.index];
      setLinks((current) => {
         // One to one: drop any line either card already had.
         const next = Object.fromEntries(
            Object.entries(current).filter(([l, r]) => Number(l) !== left && r !== right)
         ) as Links;
         next[left] = right;
         return next;
      });
      setSelected(null);
   };

   const unlink = (card: MatchCardRef) => {
      const left = card.side === 'left' ? card.index : leftOf(card.index);
      if (left === undefined) return;
      setLinks((current) => Object.fromEntries(Object.entries(current).filter(([l]) => Number(l) !== left)));
   };

   /** A tap (or Enter / Space) on a card. */
   const pick = (card: MatchCardRef) => {
      if (selected && selected.side !== card.side) return connect(selected, card);
      if (selected && selected.index === card.index) return setSelected(null);
      if (!selected && isLinked(card)) return unlink(card);
      setSelected(card);
   };

   const reset = () => {
      setLinks({});
      setSelected(null);
   };

   return {
      links: Object.entries(links).map(([left, right]) => ({ left: Number(left), right })),
      selected,
      rightOf,
      leftOf,
      pick,
      connect,
      reset,
   };
}
