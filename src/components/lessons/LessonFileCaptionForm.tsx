'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DialogForm } from '@/components/common/form/DialogForm';
import { useUpdateLessonFileCaptions } from '@/hooks/useLessonFiles';
import { apiErrorMessage } from '@/lib/form';
import {
   fileToCaptionValues,
   lessonFileCaptionSchema,
   type LessonFileCaptionValues,
} from '@/schemas/lessonFile.schema';
import type { LessonFile } from '@/types/api/lessonFile.types';
import { LessonFileCaptionFields } from './LessonFileCaptionFields';
import { LessonFileHeading } from './LessonFileHeading';

interface LessonFileCaptionFormProps {
   file: LessonFile;
   onClose: () => void;
}

// English and Myanmar caption of one lesson file (FR-FILE-003); both are required.
export function LessonFileCaptionForm({ file, onClose }: LessonFileCaptionFormProps) {
   const form = useForm<LessonFileCaptionValues>({
      resolver: zodResolver(lessonFileCaptionSchema),
      defaultValues: fileToCaptionValues(file),
   });
   const updateCaptions = useUpdateLessonFileCaptions(file.lessonId);

   const onSubmit = form.handleSubmit(async (captions) => {
      try {
         await updateCaptions.mutateAsync({ fileId: file.id, captions });
         toast.success('Captions saved');
         onClose();
      } catch (error) {
         toast.error(apiErrorMessage(error, 'Couldn’t save the captions. Please try again.'));
      }
   });

   return (
      <FormProvider {...form}>
         <DialogForm
            title="Edit captions"
            submitLabel="Save captions"
            isSubmitting={updateCaptions.isPending}
            onSubmit={onSubmit}
            onCancel={onClose}
         >
            <LessonFileHeading name={file.fileName} contentType={file.contentType} sizeBytes={file.sizeBytes} />
            <LessonFileCaptionFields<LessonFileCaptionValues> />
         </DialogForm>
      </FormProvider>
   );
}
