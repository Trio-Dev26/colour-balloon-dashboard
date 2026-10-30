import { useState } from 'react';
import { shuffle } from '@/lib/shuffle';

const indexes = (count: number) => Array.from({ length: count }, (_, index) => index);

/**
 * A shuffled order of `count` indexes (e.g. matching right sides, sequence steps). It stays the same while
 * the items are edited and is shuffled again only when items are added or removed, so a live preview
 * doesn't jump around on every keystroke.
 */
export function useShuffledOrder(count: number): number[] {
   const [order, setOrder] = useState(() => shuffle(indexes(count)));

   // React's "adjust state when a prop changes" pattern: update during render, no effect needed.
   if (order.length !== count) {
      const next = shuffle(indexes(count));
      setOrder(next);
      return next;
   }
   return order;
}
