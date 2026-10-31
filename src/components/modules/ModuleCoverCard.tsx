'use client';

import { useState } from 'react';
import { ImageIcon, ZoomInIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

// Cover image beside the module's content card; a click opens it full size.
export function ModuleCoverCard({ src, alt }: { src?: string | null; alt: string }) {
   const [open, setOpen] = useState(false);

   if (!src) {
      return (
         <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-muted text-xs text-muted-foreground">
            <ImageIcon className="size-6 text-tertiary-foreground" aria-hidden />
            No cover image
         </div>
      );
   }

   return (
      <div className="flex flex-col items-center gap-2">
         <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open the cover image full size"
            className="group relative aspect-video w-full overflow-hidden rounded-xl border bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
         >
            {/* Plain <img>: short-lived signed URLs can't go through next/image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="size-full object-cover transition-transform group-hover:scale-105" />
            <span className="absolute right-2 bottom-2 flex items-center gap-1 rounded-md bg-card px-2 py-1 text-xs font-semibold shadow-sm">
               <ZoomInIcon className="size-3.5" aria-hidden />
               Preview
            </span>
         </button>
         <p className="text-xs text-muted-foreground">Click to open full size</p>
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="p-2 sm:max-w-3xl">
               <DialogTitle className="sr-only">{alt}</DialogTitle>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src={src} alt={alt} className="max-h-[80vh] w-full rounded-lg object-contain" />
            </DialogContent>
         </Dialog>
      </div>
   );
}
