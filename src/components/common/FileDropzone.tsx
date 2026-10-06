'use client';

import { useRef, useState, type DragEvent } from 'react';
import { CloudUploadIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileDropzoneProps {
   /** Value for the file input's accept attribute, e.g. "image/jpeg,image/png". */
   accept: string;
   /** Shown under the instructions, e.g. "Supported formats: JPG, PNG (Max 20 MB)". */
   hint: string;
   onFileSelect: (file: File) => void;
   invalid?: boolean;
}

export function FileDropzone({ accept, hint, onFileSelect, invalid }: FileDropzoneProps) {
   const inputRef = useRef<HTMLInputElement>(null);
   const [isDragging, setIsDragging] = useState(false);

   const handleDrop = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files[0];
      if (file) onFileSelect(file);
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
         <p className="font-medium text-muted-foreground">Drag and drop file here</p>
         <p className="text-muted-foreground">or click to browse</p>
         <p className="text-placeholder">{hint}</p>
         <span className="rounded-md bg-accent px-2.5 py-1 font-medium text-accent-foreground">Browse files</span>
         <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(event) => {
               const file = event.target.files?.[0];
               if (file) onFileSelect(file);
               event.target.value = '';
            }}
         />
      </div>
   );
}
