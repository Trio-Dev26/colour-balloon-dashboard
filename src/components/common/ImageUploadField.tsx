'use client';

import { useRef } from 'react';
import { useObjectUrl } from '@/hooks/useObjectUrl';
import { formatFileSize } from '@/lib/format';
import { FileDropzone } from './FileDropzone';
import { ImagePreviewCard } from './ImagePreviewCard';

interface ImageUploadFieldProps {
   /** A newly picked file, the URL of the current image, or nothing. */
   value: File | string | null | undefined;
   onChange: (file: File | null) => void;
   accept: string;
   /** Full hint for the dropzone, e.g. "Supported formats: JPG, PNG (Max 20 MB)". */
   dropzoneHint: string;
   /** Short hint under the preview, e.g. "JPG, PNG | Max 20 MB". */
   previewHint: string;
   invalid?: boolean;
}

// Dropzone when empty (create), preview card with replace/delete when an image exists (edit).
export function ImageUploadField({
   value,
   onChange,
   accept,
   dropzoneHint,
   previewHint,
   invalid,
}: ImageUploadFieldProps) {
   const replaceInputRef = useRef<HTMLInputElement>(null);
   const src = useObjectUrl(value);

   if (!value || !src) {
      return <FileDropzone accept={accept} hint={dropzoneHint} onFileSelect={onChange} invalid={invalid} />;
   }

   const isFile = value instanceof File;
   return (
      <>
         <ImagePreviewCard
            src={src}
            name={isFile ? value.name : (value.split('/').pop() ?? value)}
            sizeLabel={isFile ? formatFileSize(value.size) : undefined}
            hint={previewHint}
            onReplace={() => replaceInputRef.current?.click()}
            onRemove={() => onChange(null)}
         />
         <input
            ref={replaceInputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(event) => {
               const file = event.target.files?.[0];
               if (file) onChange(file);
               event.target.value = '';
            }}
         />
      </>
   );
}
