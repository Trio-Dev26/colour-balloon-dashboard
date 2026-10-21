'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DialogForm } from '@/components/common/form/DialogForm';
import { TextField } from '@/components/common/form/TextField';
import { useUpdateLessonFileCaptions } from '@/hooks/useLessonFiles';
import { apiErrorMessage } from '@/lib/form';
import {
   fileToCaptionValues,
   lessonFileCaptionSchema,
   toCaptions,
   type LessonFileCaptionValues,
} from '@/schemas/lessonFile.schema';
import type { LessonFile } from '@/types/api/lessonFile.types';

interface LessonFileCaptionFormProps {
   file: LessonFile;
   onClose: () => void;
}

// English and Myanmar caption of one lesson file (FR-FILE-003); empty clears the caption.
export function LessonFileCaptionForm({ file, onClose }: LessonFileCaptionFormProps) {
   const form = useForm<LessonFileCaptionValues>({
      resolver: zodResolver(lessonFileCaptionSchema),
      defaultValues: fileToCaptionValues(file),
   });
   const updateCaptions = useUpdateLessonFileCaptions(file.lessonId);

   const onSubmit = form.handleSubmit(async (values) => {
      try {
         await updateCaptions.mutateAsync({ fileId: file.id, captions: toCaptions(values) });
         toast.success('Caption saved');
         onClose();
      } catch (error) {
         toast.error(apiErrorMessage(error, 'Couldn’t save the caption. Please try again.'));
      }
   });

   return (
      <FormProvider {...form}>
         <DialogForm
            title="Edit caption"
            submitLabel="Save caption"
            isSubmitting={updateCaptions.isPending}
            onSubmit={onSubmit}
            onCancel={onClose}
         >
            <p className="truncate text-sm text-muted-foreground">{file.fileName}</p>
            <TextField<LessonFileCaptionValues>
               name="captionEn"
               label="Caption in English (Optional)"
               placeholder="e.g. Listen and repeat"
            />
            <TextField<LessonFileCaptionValues>
               name="captionMy"
               label="Caption in Myanmar (Optional)"
               inputClassName="h-9 font-myanmar"
            />
         </DialogForm>
      </FormProvider>
   );
}
