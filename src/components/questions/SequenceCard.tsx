import type { PointerEvent } from 'react';
import { cn } from '@/lib/utils';
import type { AnswerItem } from '@/types/api/question.types';
import { PreviewItem } from './PreviewItem';

interface SequenceCardProps {
   item: AnswerItem;
   mediaUrls: Record<string, string>;
   /** Screen-reader name, e.g. "Step card: wash hands. Tap to put it in the next slot". */
   label: string;
   onTap: () => void;
   onDragStart: (event: PointerEvent<HTMLButtonElement>) => void;
   /** The copy that follows the pointer while dragging. */
   ghost?: boolean;
}

// A step card of the sequence preview, in the tray or in a slot. Pictures lead (whole picture, text under it).
// touch-none keeps a finger drag from scrolling the page; images can't be dragged on their own.
export function SequenceCard({ item, mediaUrls, label, onTap, onDragStart, ghost }: SequenceCardProps) {
   const hasImage = Boolean(item.mediaId && mediaUrls[item.mediaId]);

   return (
      <button
         type="button"
         aria-label={label}
         onClick={onTap}
         onPointerDown={onDragStart}
         className={cn(
            'flex size-full min-h-14 touch-none items-center rounded-xl border-2 bg-card p-3 text-left shadow-xs transition-colors select-none [&_img]:pointer-events-none',
            'hover:border-accent-border hover:bg-accent/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
            hasImage && 'p-2',
            ghost && 'pointer-events-none w-36 rotate-2 border-primary shadow-lg'
         )}
      >
         <span className="min-w-0 flex-1">
            <PreviewItem item={item} mediaUrls={mediaUrls} stacked={hasImage} />
         </span>
      </button>
   );
}
