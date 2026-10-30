import { useEffect, useRef, useState, type PointerEvent } from 'react';

/** Pointer travel (px) that turns a press into a drag instead of a tap. */
const DRAG_THRESHOLD = 6;

export interface PointerDrag<T> {
   /** What's being dragged (a card, an item…). */
   payload: T;
   /** Pointer position in viewport coordinates. */
   clientX: number;
   clientY: number;
}

/**
 * Drag with the browser's pointer events (mouse, touch and pen alike), for the matching and sequence previews.
 * A press only becomes a drag after DRAG_THRESHOLD px, so a tap stays a tap; on release `onDrop` gets the element
 * under the pointer. Elements the user drags from need `touch-action: none`, or touch scrolls the page instead.
 */
export function usePointerDrag<T>(onDrop: (payload: T, target: Element | null) => void) {
   const [drag, setDrag] = useState<(PointerDrag<T> & { moved: boolean }) | null>(null);
   const start = useRef({ x: 0, y: 0 });
   // A drag that ends on its own element is followed by a click there, which mustn't count as a tap. Reset on
   // every press: a drag that ends elsewhere fires no click there, so the flag would otherwise eat the next tap.
   const skipClick = useRef(false);
   const dropRef = useRef(onDrop);

   useEffect(() => {
      dropRef.current = onDrop;
   });

   useEffect(() => {
      if (!drag) return;
      const move = (event: globalThis.PointerEvent) => {
         const moved = Math.hypot(event.clientX - start.current.x, event.clientY - start.current.y) > DRAG_THRESHOLD;
         setDrag(
            (current) =>
               current && { ...current, clientX: event.clientX, clientY: event.clientY, moved: current.moved || moved }
         );
      };
      const end = (event: globalThis.PointerEvent) => {
         if (drag.moved) {
            skipClick.current = true;
            dropRef.current(drag.payload, document.elementFromPoint(event.clientX, event.clientY));
         }
         setDrag(null);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', end);
      window.addEventListener('pointercancel', end);
      return () => {
         window.removeEventListener('pointermove', move);
         window.removeEventListener('pointerup', end);
         window.removeEventListener('pointercancel', end);
      };
   }, [drag]);

   /** Use as the element's onPointerDown. */
   const startDrag = (payload: T) => (event: PointerEvent<HTMLElement>) => {
      skipClick.current = false;
      if (event.button !== 0) return;
      start.current = { x: event.clientX, y: event.clientY };
      setDrag({ payload, clientX: event.clientX, clientY: event.clientY, moved: false });
   };

   /** Wraps a click handler so the click that ends a drag is ignored. */
   const onTap = (handler: () => void) => () => {
      if (!skipClick.current) handler();
   };

   return { drag: drag?.moved ? (drag as PointerDrag<T>) : null, startDrag, onTap };
}
