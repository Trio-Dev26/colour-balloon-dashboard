'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { DialogForm } from '@/components/common/form/DialogForm';
import type { CaptionedFile } from '@/hooks/useLessonFileUploads';
import { lessonFileUploadSchema, type LessonFileUploadValues } from '@/schemas/lessonFile.schema';
import { LessonFileCaptionFields } from './LessonFileCaptionFields';
import { LessonFileHeading } from './LessonFileHeading';

interface LessonFileUploadFormProps {
   files: File[];
   /** Group title, e.g. "Lesson materials". */
   groupTitle: string;
   onUpload: (items: CaptionedFile[]) => void;
   onCancel: () => void;
}

// Captions for every picked file before anything uploads, so no file is ever saved without them.
export function LessonFileUploadForm({ files, groupTitle, onUpload, onCancel }: LessonFileUploadFormProps) {
   const form = useForm<LessonFileUploadValues>({
      resolver: zodResolver(lessonFileUploadSchema),
      defaultValues: { files: files.map(() => ({ captionEn: '', captionMy: '' })) },
   });

   const onSubmit = form.handleSubmit((values) =>
      onUpload(files.map((file, index) => ({ file, captions: values.files[index] })))
   );

   return (
      <FormProvider {...form}>
         <DialogForm
            title={`Add captions · ${groupTitle}`}
            submitLabel={files.length === 1 ? 'Upload file' : `Upload ${files.length} files`}
            onSubmit={onSubmit}
            onCancel={onCancel}
         >
            <p className="-mb-2 text-sm text-muted-foreground">
               Students and teachers see these captions next to each file. Both languages are required.
            </p>
            {files.map((file, index) => (
               <div key={`${file.name}-${index}`} className="flex flex-col gap-4 rounded-xl border bg-sidebar p-4">
                  <LessonFileHeading name={file.name} contentType={file.type} sizeBytes={file.size} />
                  <LessonFileCaptionFields<LessonFileUploadValues> prefix={`files.${index}.`} />
               </div>
            ))}
         </DialogForm>
      </FormProvider>
   );
}
