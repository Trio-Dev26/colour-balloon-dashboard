'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { FormField } from '@/components/common/form/FormField';
import { ImageUploadField } from '@/components/common/ImageUploadField';
import { MODULE_IMAGE } from '@/constants/module';
import { getFieldError } from '@/lib/form';
import type { ModuleFormValues } from '@/schemas/module.schema';

export function ModuleImageField() {
   const { control, formState } = useFormContext<ModuleFormValues>();
   const error = getFieldError(formState.errors, 'image');

   return (
      <FormField id="image" label="Cover image (optional)" error={error}>
         <Controller
            control={control}
            name="image"
            render={({ field }) => (
               <ImageUploadField
                  value={field.value}
                  onChange={field.onChange}
                  accept={MODULE_IMAGE.accept}
                  dropzoneHint={MODULE_IMAGE.dropzoneHint}
                  previewHint={MODULE_IMAGE.previewHint}
                  invalid={!!error}
               />
            )}
         />
      </FormField>
   );
}
