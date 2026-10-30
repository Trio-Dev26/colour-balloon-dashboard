'use client';

import { useLayoutEffect, useState } from 'react';

export interface MatchLine {
   /** data-anchor of the left card and the right card. */
   from: string;
   to: string;
   color: string;
}

/** A line being dragged: from a card to the pointer (viewport coordinates). */
export interface DraftLine {
   from: string;
   clientX: number;
   clientY: number;
}

interface Point {
   x: number;
   y: number;
}

interface MatchingLinesProps {
   /** The board the cards sit in (set by a callback ref, so it can be read while rendering). */
   container: HTMLDivElement | null;
   lines: MatchLine[];
   draft: DraftLine | null;
   draftColor: string;
}

/** Where a card's line starts: the middle of its edge that faces the other column. */
function anchorPoint(container: HTMLElement, anchorId: string): Point | null {
   const card = container.querySelector<HTMLElement>(`[data-anchor="${anchorId}"]`);
   if (!card) return null;
   const box = container.getBoundingClientRect();
   const rect = card.getBoundingClientRect();
   const isLeft = anchorId.startsWith('left');
   return { x: (isLeft ? rect.right : rect.left) - box.left, y: rect.top + rect.height / 2 - box.top };
}

/** A soft S-curve between two points, like a line drawn by hand. */
const curve = (a: Point, b: Point) => {
   const bend = (b.x - a.x) / 2;
   return `M ${a.x} ${a.y} C ${a.x + bend} ${a.y}, ${b.x - bend} ${b.y}, ${b.x} ${b.y}`;
};

// SVG layer over the matching board that draws the joined pairs and the line being dragged. Card positions
// are measured from the DOM, again whenever the board resizes or the lines change.
export function MatchingLines({ container, lines, draft, draftColor }: MatchingLinesProps) {
   const [, setLayoutVersion] = useState(0);

   useLayoutEffect(() => {
      if (!container) return;
      const observer = new ResizeObserver(() => setLayoutVersion((version) => version + 1));
      observer.observe(container);
      return () => observer.disconnect();
   }, [container]);

   if (!container) return null;

   const drawn = lines.flatMap((line) => {
      const a = anchorPoint(container, line.from);
      const b = anchorPoint(container, line.to);
      return a && b ? [{ ...line, a, b }] : [];
   });

   let draftPath: { a: Point; b: Point } | null = null;
   if (draft) {
      const a = anchorPoint(container, draft.from);
      const box = container.getBoundingClientRect();
      if (a) draftPath = { a, b: { x: draft.clientX - box.left, y: draft.clientY - box.top } };
   }

   return (
      <svg className="pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden>
         {drawn.map(({ from, to, color, a, b }) => (
            <g key={`${from}-${to}`} stroke={color} fill={color}>
               <path d={curve(a, b)} fill="none" strokeWidth={3} strokeLinecap="round" />
               <circle cx={a.x} cy={a.y} r={5} />
               <circle cx={b.x} cy={b.y} r={5} />
            </g>
         ))}
         {draftPath && (
            <g stroke={draftColor} fill={draftColor}>
               <path
                  d={curve(draftPath.a, draftPath.b)}
                  fill="none"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeDasharray="6 6"
               />
               <circle cx={draftPath.a.x} cy={draftPath.a.y} r={5} />
            </g>
         )}
      </svg>
   );
}
