'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { loginSchema, type LoginValues } from '@/schemas/auth.schema';

export function LoginForm() {
   const router = useRouter();
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<LoginValues>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: '', password: '' },
   });

   // TODO(auth): replace with a useMutation that calls POST /api/auth/login once the backend endpoint exists.
   const onSubmit = () => router.push('/');

   return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
         <FieldGroup>
            <Field data-invalid={!!errors.email}>
               <FieldLabel htmlFor="email">Email</FieldLabel>
               <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  {...register('email')}
               />
               <FieldError errors={[errors.email]} />
            </Field>
            <Field data-invalid={!!errors.password}>
               <FieldLabel htmlFor="password">Password</FieldLabel>
               <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  {...register('password')}
               />
               <FieldError errors={[errors.password]} />
            </Field>
            <Button type="submit" disabled={isSubmitting} className="w-full">
               Log in
            </Button>
         </FieldGroup>
      </form>
   );
}
