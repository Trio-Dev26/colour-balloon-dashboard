import type { ComponentProps } from 'react';
import { LoaderCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoadingButtonProps extends ComponentProps<typeof Button> {
   /** While true the button is disabled and shows a spinner before its label. */
   loading?: boolean;
}

// A Button for actions that wait on the API (submit, save): shows progress instead of just greying out.
export function LoadingButton({ loading, disabled, children, ...props }: LoadingButtonProps) {
   return (
      <Button disabled={disabled || loading} aria-busy={loading} {...props}>
         {loading && <LoaderCircleIcon className="animate-spin" aria-hidden />}
         {children}
      </Button>
   );
}
