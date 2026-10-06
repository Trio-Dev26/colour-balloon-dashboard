'use client';

import type { HTMLInputTypeAttribute } from 'react';
import { useFormContext, type FieldValues, type Path } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { getFieldError } from '@/lib/form';
import { FormField } from './FormField';

interface TextFieldProps<T extends FieldValues> {
   name: Path<T>;
   label: string;
   placeholder?: string;
   type?: HTMLInputTypeAttribute;
   autoComplete?: string;
   className?: string;
   inputClassName?: string;
}

export function TextField<T extends FieldValues>({
   name,
   label,
   placeholder,
   type,
   autoComplete,
   className,
   inputClassName,
}: TextFieldProps<T>) {
   const { register, formState } = useFormContext<T>();
   const error = getFieldError(formState.errors, name);

   return (
      <FormField id={name} label={label} error={error} className={className}>
         <Input
            id={name}
            type={type}
            autoComplete={autoComplete}
            placeholder={placeholder}
            aria-invalid={!!error}
            className={inputClassName ?? 'h-9'}
            {...register(name)}
         />
      </FormField>
   );
}
