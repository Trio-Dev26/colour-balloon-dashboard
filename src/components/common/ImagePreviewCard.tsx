'use client';

import { useState } from 'react';
import { CloudUploadIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImagePreviewCardProps {
   src: string;
   name: string;
   /** e.g. "2.5 MB" — omitted for images already on the server. */
   sizeLabel?: string;
   hint: string;
   onReplace: () => void;
   onRemove: () => void;
}

export function ImagePreviewCard({ src, name, sizeLabel, hint, onReplace, onRemove }: ImagePreviewCardProps) {
   const [dimensions, setDimensions] = useState<string>();
   const meta = [dimensions, sizeLabel].filter(Boolean).join(' • ');

   return (
      <div className="flex items-center gap-5">
         {/* Plain <img>: object URLs and short-lived signed URLs can't go through next/image. */}
         {/* eslint-disable-next-line @next/next/no-img-element */}
         <img
            src={src}
            alt={name}
            className="size-37.5 shrink-0 rounded-xl bg-muted object-cover"
            onLoad={(event) =>
               setDimensions(`${event.currentTarget.naturalWidth} x ${event.currentTarget.naturalHeight}`)
            }
         />
         <div className="flex min-w-0 flex-col gap-3">
            <p className="truncate text-sm font-semibold">{name}</p>
            {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
            <div className="flex items-center gap-3">
               <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary"
                  onClick={onReplace}
               >
                  <CloudUploadIcon />
                  Replace image
               </Button>
               <Button type="button" variant="destructive" size="sm" onClick={onRemove}>
                  <Trash2Icon />
                  Delete image
               </Button>
            </div>
            <p className="text-xs text-tertiary-foreground">{hint}</p>
         </div>
      </div>
   );
}
