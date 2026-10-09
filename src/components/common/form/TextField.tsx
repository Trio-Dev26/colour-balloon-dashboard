'use client';

import { useState, type HTMLInputTypeAttribute } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useFormContext, type FieldValues, type Path } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getFieldError } from '@/lib/form';
import { cn } from '@/lib/utils';
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
   // Password fields get a show/hide toggle.
   const isPassword = type === 'password';
   const [visible, setVisible] = useState(false);

   return (
      <FormField id={name} label={label} error={error} className={className}>
         <div className="relative">
            <Input
               id={name}
               type={isPassword && visible ? 'text' : type}
               autoComplete={autoComplete}
               placeholder={placeholder}
               aria-invalid={!!error}
               className={cn(inputClassName ?? 'h-9', isPassword && 'pr-9')}
               {...register(name)}
            />
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
