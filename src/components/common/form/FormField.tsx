import type { ReactNode } from 'react';
import type { FieldError as RhfFieldError } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';

interface FormFieldProps {
   id: string;
   label: ReactNode;
   error?: RhfFieldError;
   className?: string;
   /** Keeps the label for screen readers only (e.g. option rows whose placeholder says what they are). */
   hideLabel?: boolean;
   children: ReactNode;
}

// Label + control + error message: the shared layout behind every form field.
export function FormField({ id, label, error, className, hideLabel, children }: FormFieldProps) {
   return (
      <Field data-invalid={!!error} className={cn('gap-2', className)}>
         <FieldLabel htmlFor={id} className={cn('text-sm font-medium', hideLabel && 'sr-only')}>
            {label}
         </FieldLabel>
         {children}
         <FieldError errors={[error]} />
      </Field>
   );
}
