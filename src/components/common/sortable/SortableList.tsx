'use client';

import type { ReactNode } from 'react';
import {
   closestCenter,
   DndContext,
   KeyboardSensor,
   PointerSensor,
   useSensor,
   useSensors,
   type DragEndEvent,
   type Modifier,
} from '@dnd-kit/core';
import {
   arrayMove,
   SortableContext,
   sortableKeyboardCoordinates,
   verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

// Rows only move up and down.
const lockToVerticalAxis: Modifier = ({ transform }) => ({ ...transform, x: 0 });

// Small movement threshold so a click on the handle doesn't start a drag.
const POINTER_ACTIVATION_DISTANCE = 4;

interface SortableListProps<T> {
   items: T[];
   getId: (item: T) => string;
   onReorder: (items: T[]) => void;
   renderItem: (item: T, index: number) => ReactNode;
   /** Accessible name for each drag handle, e.g. "Drag Unit 1". */
   getHandleLabel: (item: T, index: number) => string;
}

// Vertical drag-and-drop list (mouse, touch and keyboard: focus a handle, Space, arrows, Space).
// Used for the unlock order of units now, and lessons / modules later (FR-CUR-006, FR-CUR-010).
export function SortableList<T>({ items, getId, onReorder, renderItem, getHandleLabel }: SortableListProps<T>) {
   const sensors = useSensors(
      useSensor(PointerSensor, { activationConstraint: { distance: POINTER_ACTIVATION_DISTANCE } }),
      useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
   );

   const handleDragEnd = ({ active, over }: DragEndEvent) => {
      if (!over || active.id === over.id) return;
      const from = items.findIndex((item) => getId(item) === active.id);
      const to = items.findIndex((item) => getId(item) === over.id);
      onReorder(arrayMove(items, from, to));
   };

   return (
      <DndContext
         sensors={sensors}
         collisionDetection={closestCenter}
         modifiers={[lockToVerticalAxis]}
         onDragEnd={handleDragEnd}
      >
         <SortableContext items={items.map(getId)} strategy={verticalListSortingStrategy}>
            <ul className="flex flex-col">
               {items.map((item, index) => (
                  <SortableItem key={getId(item)} id={getId(item)} handleLabel={getHandleLabel(item, index)}>
                     {renderItem(item, index)}
                  </SortableItem>
               ))}
            </ul>
         </SortableContext>
      </DndContext>
   );
}
