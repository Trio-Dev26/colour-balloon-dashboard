'use client';

import { useRef } from 'react';
import { ImagePlusIcon } from 'lucide-react';
import { toast } from 'sonner';
import { LoadingButton } from '@/components/common/LoadingButton';
import { QUESTION_IMAGE } from '@/constants/question';
import { useUploadQuestionMedia } from '@/hooks/useQuestions';
import { apiErrorMessage } from '@/lib/form';
import type { QuestionMedia } from '@/types/api/question.types';

interface QuestionImageUploadButtonProps {
   onUploaded: (media: QuestionMedia) => void;
   label?: string;
   /** Square icon button; `label` becomes its accessible name and tooltip. */
   iconOnly?: boolean;
}

// Picks a JPG/PNG and uploads it straight away (POST /admin/questions/media); the form keeps its id.
export function QuestionImageUploadButton({
   onUploaded,
   label = 'Add image',
   iconOnly,
}: QuestionImageUploadButtonProps) {
   const inputRef = useRef<HTMLInputElement>(null);
   const upload = useUploadQuestionMedia();

   const handleFile = (file: File) => {
      if (!(QUESTION_IMAGE.mimeTypes as readonly string[]).includes(file.type)) {
         toast.error('Use a JPG or PNG image.');
         return;
      }
      if (file.size > QUESTION_IMAGE.maxSizeBytes) {
         toast.error('Image must be 20 MB or smaller.');
         return;
      }
      upload.mutate(file, {
         onSuccess: onUploaded,
         onError: (error) => toast.error(apiErrorMessage(error, 'Couldn’t upload the image. Please try again.')),
      });
   };

   return (
      <>
         <LoadingButton
            type="button"
            variant="outline"
            size={iconOnly ? 'icon' : 'sm'}
            aria-label={iconOnly ? label : undefined}
            title={iconOnly ? label : undefined}
            loading={upload.isPending}
            onClick={() => inputRef.current?.click()}
         >
            {!upload.isPending && <ImagePlusIcon />}
            {!iconOnly && label}
         </LoadingButton>
         <input
            ref={inputRef}
            type="file"
            accept={QUESTION_IMAGE.accept}
            className="hidden"
            onChange={(event) => {
               const file = event.target.files?.[0];
               if (file) handleFile(file);
               event.target.value = '';
            }}
         />
      </>
   );
}
