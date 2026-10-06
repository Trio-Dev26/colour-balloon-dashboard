'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@/components/common/form/TextField';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { ROUTES } from '@/constants/routes';
import { loginSchema, type LoginValues } from '@/schemas/auth.schema';

export function LoginForm() {
   const router = useRouter();
   const form = useForm<LoginValues>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: '', password: '' },
   });

   // TODO(auth): replace with a useMutation that calls POST /api/auth/login once the backend endpoint exists.
   const onSubmit = () => router.push(ROUTES.dashboard);

   return (
      <FormProvider {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
               <TextField<LoginValues> name="email" label="Email" type="email" autoComplete="email" />
               <TextField<LoginValues>
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
               />
               <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="w-full">
                  Log in
               </Button>
            </FieldGroup>
         </form>
      </FormProvider>
   );
}
