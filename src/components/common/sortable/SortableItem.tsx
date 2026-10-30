'use client';

import type { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SortableItemProps {
   id: string;
   handleLabel: string;
   className?: string;
   children: ReactNode;
}

// One draggable row: grip handle on the left, row content on the right.
export function SortableItem({ id, handleLabel, className, children }: SortableItemProps) {
   const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
      id,
   });

   return (
      <li
         ref={setNodeRef}
         style={{ transform: CSS.Transform.toString(transform), transition }}
         className={cn(
            'relative flex h-15 items-center gap-3 border-b bg-background px-3 last:border-b-0',
            isDragging && 'z-10 rounded-lg border shadow-md',
            className
         )}
      >
         <button
            ref={setActivatorNodeRef}
            type="button"
            aria-label={handleLabel}
            className="flex size-8 shrink-0 cursor-grab touch-none items-center justify-center rounded-md text-tertiary-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 active:cursor-grabbing"
            {...attributes}
            {...listeners}
         >
            <GripVerticalIcon className="size-4" />
         </button>
         {children}
      </li>
   );
}
