import { useState } from 'react';

const emptySlots = (count: number): (number | null)[] => Array.from({ length: count }, () => null);

/**
 * State of a sequence preview board (FR-QB-007): numbered slots (First … Last) filled with step cards. Cards are
 * identified by their step index; a card not in a slot is in the tray. Starts over when the number of steps
 * changes (the tray is reshuffled then).
 */
export function useSequenceBoard(count: number) {
   const [slots, setSlots] = useState(() => emptySlots(count));
   const [boardSize, setBoardSize] = useState(count);

   // React's "adjust state when a prop changes" pattern: reset during render, no effect needed.
   if (boardSize !== count) {
      setBoardSize(count);
      setSlots(emptySlots(count));
   }

   /**
    * Puts a card in `slot`, or the first empty slot when none is given. A card already in a slot swaps places
    * with whatever is there; a card from the tray sends the one it replaces back to the tray.
    */
   const place = (card: number, slot?: number) =>
      setSlots((current) => {
         const target = slot ?? current.indexOf(null);
         if (target < 0 || current[target] === card) return current;
         const next = [...current];
         const from = current.indexOf(card);
         if (from >= 0) next[from] = current[target];
         next[target] = card;
         return next;
      });

   /** Sends a card back to the tray. */
   const takeOut = (card: number) => setSlots((current) => current.map((placed) => (placed === card ? null : placed)));

   return {
      slots,
      placedCount: slots.filter((card) => card !== null).length,
      isPlaced: (card: number) => slots.includes(card),
      place,
      takeOut,
      reset: () => setSlots(emptySlots(count)),
   };
}
