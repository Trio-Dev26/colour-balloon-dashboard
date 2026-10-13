'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { HttpStatusCode, isAxiosError } from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { TextField } from '@/components/common/form/TextField';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useLogin } from '@/hooks/useAuth';
import { loginSchema, type LoginValues } from '@/schemas/auth.schema';

function loginErrorMessage(error: Error): string {
   return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
      ? 'Wrong email or password.'
      : 'Couldn’t log in. Please try again.';
}

export function LoginForm() {
   const form = useForm<LoginValues>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: '', password: '' },
   });
   const login = useLogin();

   const onSubmit = form.handleSubmit((values) =>
      login.mutate(values, { onError: (error) => toast.error(loginErrorMessage(error)) })
   );

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
               <Button type="submit" size="lg" disabled={login.isPending} className="w-full">
                  Log in
               </Button>
            </FieldGroup>
         </form>
      </FormProvider>
   );
}
