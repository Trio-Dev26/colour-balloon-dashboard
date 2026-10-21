'use client';

import { useRef, useState, type DragEvent } from 'react';
import { CloudUploadIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileDropzoneProps {
   /** Value for the file input's accept attribute, e.g. "image/jpeg,image/png". */
   accept: string;
   /** Shown under the instructions, e.g. "Supported formats: JPG, PNG (Max 20 MB)". */
   hint: string;
   /** Gets one file, or every picked file when `multiple` is set. */
   onFilesSelect: (files: File[]) => void;
   multiple?: boolean;
   invalid?: boolean;
}

export function FileDropzone({ accept, hint, onFilesSelect, multiple, invalid }: FileDropzoneProps) {
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
            'flex h-38 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-accent-border bg-sidebar p-3 text-xs outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
            isDragging && 'border-primary bg-accent',
            invalid && 'border-destructive'
         )}
      >
         <CloudUploadIcon className="size-6 text-primary" />
         <p className="font-medium text-muted-foreground">Drag and drop {multiple ? 'files' : 'file'} here</p>
         <p className="text-muted-foreground">or click to browse</p>
         <p className="text-placeholder">{hint}</p>
         <span className="rounded-md bg-accent px-2.5 py-1 font-medium text-accent-foreground">Browse files</span>
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
