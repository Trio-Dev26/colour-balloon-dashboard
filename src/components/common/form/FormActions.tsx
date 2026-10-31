import Link from 'next/link';
import { LoadingButton } from '@/components/common/LoadingButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FormActionsProps {
   cancelHref: string;
   submitLabel: string;
   isSubmitting?: boolean;
   /** Keeps the buttons on screen at the bottom while a long form scrolls. */
   sticky?: boolean;
}

// Right-aligned Cancel + primary submit buttons at the bottom of a form.
export function FormActions({ cancelHref, submitLabel, isSubmitting, sticky }: FormActionsProps) {
   return (
      <div
         className={cn(
            'flex items-center justify-end gap-3',
            sticky && 'sticky bottom-0 z-10 -mx-1 border-t bg-background/95 px-1 py-3 backdrop-blur'
         )}
      >
         <Button
            variant="secondary"
            size="lg"
            className="font-semibold"
            nativeButton={false}
            render={<Link href={cancelHref} />}
         >
            Cancel
         </Button>
         <LoadingButton type="submit" size="lg" className="px-3 font-semibold" loading={isSubmitting}>
            {submitLabel}
         </LoadingButton>
      </div>
   );
}
