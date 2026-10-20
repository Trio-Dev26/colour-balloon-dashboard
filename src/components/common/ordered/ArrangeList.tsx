'use client';

import { useState, type ReactNode } from 'react';
import { SortableList } from '@/components/common/sortable/SortableList';
import { LoadingButton } from '@/components/common/LoadingButton';
import { Button } from '@/components/ui/button';

export interface ArrangeListProps<T> {
   items: T[];
   getId: (item: T) => string;
   /** Row content; `index` is the position in the new order (0-based). */
   renderItem: (item: T, index: number) => ReactNode;
   getHandleLabel: (item: T, index: number) => string;
   /** Instruction shown above the rows. */
   hint: string;
   isSaving: boolean;
   onSave: (ids: string[]) => void;
   onCancel: () => void;
}

// Drag rows into a new order, then Save order / Cancel (FR-CUR-006).
export function ArrangeList<T>({
   items,
   getId,
   renderItem,
   getHandleLabel,
   hint,
   isSaving,
   onSave,
   onCancel,
}: ArrangeListProps<T>) {
   const [ordered, setOrdered] = useState(items);
   const orderedIds = ordered.map(getId);
   const hasChanges = orderedIds.join() !== items.map(getId).join();

   return (
      <>
         <p className="border-b bg-muted px-3 py-2.5 text-xs text-muted-foreground">{hint}</p>
         <SortableList
            items={ordered}
            getId={getId}
            onReorder={setOrdered}
            getHandleLabel={getHandleLabel}
            renderItem={renderItem}
         />
         <div className="flex justify-end gap-3 border-t p-3">
            <Button variant="secondary" size="lg" onClick={onCancel} disabled={isSaving}>
               Cancel
            </Button>
            <LoadingButton size="lg" onClick={() => onSave(orderedIds)} disabled={!hasChanges} loading={isSaving}>
               Save order
            </LoadingButton>
         </div>
      </>
   );
}
