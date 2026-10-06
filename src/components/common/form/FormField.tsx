import type { ReactNode } from 'react';
import type { FieldError as RhfFieldError } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';

interface FormFieldProps {
   id: string;
   label: string;
   error?: RhfFieldError;
   className?: string;
   children: ReactNode;
}

// Label + control + error message: the shared layout behind every form field.
export function FormField({ id, label, error, className, children }: FormFieldProps) {
   return (
      <Field data-invalid={!!error} className={cn('gap-2', className)}>
         <FieldLabel htmlFor={id} className="text-sm font-medium">
            {label}
         </FieldLabel>
         {children}
         <FieldError errors={[error]} />
      </Field>
   );
}
