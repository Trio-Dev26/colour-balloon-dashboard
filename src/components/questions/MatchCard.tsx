import type { PointerEvent, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MatchCardProps {
   /** "1" for left items, "A" for right ones. */
   marker: string;
   /** Ties the card to its line end (MatchingLines measures it). */
   anchorId: string;
   side: 'left' | 'right';
   selected: boolean;
   /** Picture card: the marker sits over the picture's corner and the content takes the full width. */
   hasImage: boolean;
   /** Colour of this card's line, when it's joined. */
   lineColor?: string;
   /** Screen-reader name, e.g. "Item 1, picture, joined to B". */
   label: string;
   onPick: () => void;
   onDragStart: (event: PointerEvent<HTMLButtonElement>) => void;
   children: ReactNode;
}

// One card of the matching preview: tap it, or drag a line from it to a card on the other side. It fills its
// grid row, so a word card stands as tall as the picture card beside it. touch-none keeps a finger drag from
// scrolling the page instead of drawing.
export function MatchCard({
   marker,
   anchorId,
   side,
   selected,
   hasImage,
   lineColor,
   label,
   onPick,
   onDragStart,
   children,
}: MatchCardProps) {
   return (
      <button
         type="button"
         data-anchor={anchorId}
         aria-label={label}
         aria-pressed={selected}
         onClick={onPick}
         onPointerDown={onDragStart}
         style={lineColor ? { borderColor: lineColor } : undefined}
         className={cn(
            'relative flex h-full min-h-14 w-full min-w-0 touch-none items-center gap-3 rounded-xl border-2 bg-card p-3 text-left transition-colors select-none',
            'hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
            // The browser's own image drag would take over the pointer and cancel drawing a line from a picture.
            '[&_img]:pointer-events-none',
            side === 'right' && 'bg-muted/60',
            hasImage && 'p-2',
            selected && 'border-primary bg-accent ring-3 ring-ring/30'
         )}
      >
         <span
            className={cn(
               'inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground',
               hasImage && 'absolute top-3 left-3 z-10 shadow-xs'
            )}
            style={lineColor ? { backgroundColor: lineColor, color: 'var(--primary-foreground)' } : undefined}
         >
            {marker}
         </span>
         <span className="min-w-0 flex-1">{children}</span>
      </button>
   );
}
