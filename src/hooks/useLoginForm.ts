import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HttpStatusCode, isAxiosError } from 'axios';
import { toast } from 'sonner';
import { loginSchema, type LoginValues } from '@/schemas/auth.schema';
import { useLogin } from './useAuth';

function loginErrorMessage(error: Error): string {
   return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
      ? 'Wrong email or password.'
      : 'Couldn’t log in. Please try again.';
}

/** Form state + submit for the login form; failures show as a toast. */
export function useLoginForm() {
   const form = useForm<LoginValues>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: '', password: '' },
   });
   const login = useLogin();

   return {
      form,
      onSubmit: form.handleSubmit((values) =>
         login.mutate(values, { onError: (error) => toast.error(loginErrorMessage(error)) })
      ),
      isPending: login.isPending,
   };
}
