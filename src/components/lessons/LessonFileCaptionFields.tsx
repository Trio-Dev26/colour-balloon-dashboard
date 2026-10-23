'use client';

import type { FieldValues, Path } from 'react-hook-form';
import { TextField } from '@/components/common/form/TextField';

interface LessonFileCaptionFieldsProps {
   /** Path before captionEn / captionMy, e.g. "files.0." in the upload form; empty in the edit form. */
   prefix?: string;
}

// English + Myanmar caption inputs of one lesson file, side by side on wider screens.
export function LessonFileCaptionFields<T extends FieldValues>({ prefix = '' }: LessonFileCaptionFieldsProps) {
   return (
      <div className="grid gap-4 sm:grid-cols-2">
         <TextField<T>
            name={`${prefix}captionEn` as Path<T>}
            label="Caption in English"
            placeholder="e.g. Listen and repeat"
         />
         <TextField<T>
            name={`${prefix}captionMy` as Path<T>}
            label="Caption in Myanmar"
            placeholder="ဥပမာ - နားထောင်ပြီး လိုက်ဆိုပါ"
            inputClassName="h-9 font-myanmar"
         />
      </div>
   );
}
