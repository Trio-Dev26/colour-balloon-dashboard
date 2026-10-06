'use client';

import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form';
import { RichTextEditor } from '@/components/common/rich-text/RichTextEditor';
import { getFieldError } from '@/lib/form';
import { FormField } from './FormField';

interface RichTextFieldProps<T extends FieldValues> {
   name: Path<T>;
   label: string;
   placeholder?: string;
}

export function RichTextField<T extends FieldValues>({ name, label, placeholder }: RichTextFieldProps<T>) {
   const { control, formState } = useFormContext<T>();
   const error = getFieldError(formState.errors, name);

   return (
      <FormField id={name} label={label} error={error}>
         <Controller
            control={control}
            name={name}
            render={({ field }) => (
               <RichTextEditor
                  id={name}
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  placeholder={placeholder}
                  invalid={!!error}
               />
            )}
         />
      </FormField>
   );
}
