'use client';

import { FormProvider } from 'react-hook-form';
import { TextField } from '@/components/common/form/TextField';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useLoginForm } from '@/hooks/useLoginForm';
import type { LoginValues } from '@/schemas/auth.schema';

export function LoginForm() {
   const { form, onSubmit, isPending } = useLoginForm();

   return (
      <FormProvider {...form}>
         <form onSubmit={onSubmit} noValidate>
            <FieldGroup>
               <TextField<LoginValues> name="email" label="Email" type="email" autoComplete="email" />
               <TextField<LoginValues>
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
               />
               <Button type="submit" size="lg" disabled={isPending} className="w-full">
                  Log in
               </Button>
            </FieldGroup>
         </form>
      </FormProvider>
   );
}
