'use client';

import { useState, type HTMLInputTypeAttribute, type ReactNode } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useFormContext, type FieldValues, type Path } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getFieldError } from '@/lib/form';
import { cn } from '@/lib/utils';
import { FormField } from './FormField';

// Every number field in the dashboard is a whole number ≥ 0, so these keys are never valid in one.
const NON_WHOLE_NUMBER_KEYS = ['-', '+', 'e', 'E', '.', ','];
const WHOLE_NUMBER = /^\d+$/;

interface TextFieldProps<T extends FieldValues> {
   name: Path<T>;
   label: ReactNode;
   placeholder?: string;
   type?: HTMLInputTypeAttribute;
   autoComplete?: string;
   className?: string;
   inputClassName?: string;
   /** Number fields: the arrow buttons stay within this range. */
   min?: number;
   max?: number;
   hideLabel?: boolean;
   /** Shown inside the input on the right, e.g. a "Correct" badge. Hidden on phones, where it would cover the text. */
   endAdornment?: ReactNode;
}

export function TextField<T extends FieldValues>({
   name,
   label,
   placeholder,
   type,
   autoComplete,
   className,
   inputClassName,
   min,
   max,
   hideLabel,
   endAdornment,
}: TextFieldProps<T>) {
   const { register, formState } = useFormContext<T>();
   const error = getFieldError(formState.errors, name);
   // Password fields get a show/hide toggle.
   const isPassword = type === 'password';
   const isNumber = type === 'number';
   const [visible, setVisible] = useState(false);

   return (
      <FormField id={name} label={label} error={error} className={className} hideLabel={hideLabel}>
         <div className="relative">
            <Input
               id={name}
               type={isPassword && visible ? 'text' : type}
               autoComplete={autoComplete}
               placeholder={placeholder}
               min={min}
               max={max}
               onKeyDown={
                  isNumber ? (event) => NON_WHOLE_NUMBER_KEYS.includes(event.key) && event.preventDefault() : undefined
               }
               onPaste={
                  isNumber
                     ? (event) => !WHOLE_NUMBER.test(event.clipboardData.getData('text')) && event.preventDefault()
                     : undefined
               }
               aria-invalid={!!error}
               className={cn(inputClassName ?? 'h-9', isPassword && 'pr-9', endAdornment && 'sm:pr-24')}
               {...register(name)}
            />
            {endAdornment && (
               <span className="pointer-events-none absolute inset-y-0 right-3 hidden items-center sm:flex">
                  {endAdornment}
               </span>
            )}
            {isPassword && (
               <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  // inset-y-0 + my-auto centers without translate, which Button's press effect would override
                  className="absolute inset-y-0 right-1 my-auto size-7 text-muted-foreground"
                  aria-label={visible ? 'Hide password' : 'Show password'}
                  aria-pressed={visible}
                  onClick={() => setVisible((v) => !v)}
               >
                  {visible ? <EyeOffIcon /> : <EyeIcon />}
               </Button>
            )}
         </div>
      </FormField>
   );
}
