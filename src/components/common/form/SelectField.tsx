'use client';

import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getFieldError } from '@/lib/form';
import type { SelectOption } from '@/types/ui/common.types';
import { FormField } from './FormField';

interface SelectFieldProps<T extends FieldValues> {
   name: Path<T>;
   label: string;
   placeholder: string;
   options: readonly SelectOption[];
   className?: string;
   /** Read-only: shows the value but can't be changed (the value is still submitted). */
   disabled?: boolean;
}

export function SelectField<T extends FieldValues>({
   name,
   label,
   placeholder,
   options,
   className,
   disabled,
}: SelectFieldProps<T>) {
   const { control, formState } = useFormContext<T>();
   const error = getFieldError(formState.errors, name);

   return (
      <FormField id={name} label={label} error={error} className={className}>
         <Controller
            control={control}
            name={name}
            render={({ field }) => (
               <Select
                  items={options}
                  disabled={disabled}
                  value={field.value || null}
                  onValueChange={(value) => field.onChange(value ?? '')}
               >
                  <SelectTrigger id={name} aria-invalid={!!error} className="h-9 w-full pl-3" onBlur={field.onBlur}>
                     <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                     {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                           {option.label}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            )}
         />
      </FormField>
   );
}
