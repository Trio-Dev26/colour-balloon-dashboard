'use client';

import { useRef, useState, type DragEvent } from 'react';
import { CloudUploadIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconTile } from './IconTile';

interface FileDropzoneProps {
   /** Value for the file input's accept attribute, e.g. "image/jpeg,image/png". */
   accept: string;
   /** Shown under the instructions, e.g. "Supported formats: JPG, PNG (Max 20 MB)". */
   hint: string;
   /** Gets one file, or every picked file when `multiple` is set. */
   onFilesSelect: (files: File[]) => void;
   multiple?: boolean;
   invalid?: boolean;
   /** One slim row instead of the tall box, e.g. under a list that already has files. */
   compact?: boolean;
}

export function FileDropzone({ accept, hint, onFilesSelect, multiple, invalid, compact }: FileDropzoneProps) {
   const inputRef = useRef<HTMLInputElement>(null);
   const [isDragging, setIsDragging] = useState(false);

   const select = (list: FileList | null) => {
      const files = Array.from(list ?? []).slice(0, multiple ? undefined : 1);
      if (files.length > 0) onFilesSelect(files);
   };

   const handleDrop = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      select(event.dataTransfer.files);
   };

   return (
      <div
         role="button"
         tabIndex={0}
         onClick={() => inputRef.current?.click()}
         onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && inputRef.current?.click()}
         onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
         }}
         onDragLeave={() => setIsDragging(false)}
         onDrop={handleDrop}
         className={cn(
            'group flex cursor-pointer rounded-lg border border-dashed border-accent-border bg-sidebar text-xs transition-colors outline-none hover:border-primary/60 hover:bg-accent/50 focus-visible:ring-3 focus-visible:ring-ring/50',
            compact
               ? 'items-center gap-3 px-4 py-3'
               : 'h-38 flex-col items-center justify-center gap-2 p-3 text-center',
            isDragging && 'border-primary bg-accent',
            invalid && 'border-destructive'
         )}
      >
         <IconTile
            icon={CloudUploadIcon}
            size={compact ? 'sm' : 'md'}
            className="transition-transform group-hover:-translate-y-0.5"
         />
         <div className={cn('flex min-w-0 flex-col', compact ? 'flex-1 gap-0.5' : 'items-center gap-1')}>
            <p className="font-medium text-foreground">
               Drag and drop {multiple ? 'files' : 'file'} here
               <span className="font-normal text-muted-foreground"> or click to browse</span>
            </p>
            <p className="text-placeholder">{hint}</p>
         </div>
         <span className="shrink-0 rounded-md bg-accent px-2.5 py-1 font-medium text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            Browse files
         </span>
         <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            className="hidden"
            onChange={(event) => {
               select(event.target.files);
               event.target.value = '';
            }}
         />
      </div>
   );
}
