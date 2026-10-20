import Link from 'next/link';
import { LoadingButton } from '@/components/common/LoadingButton';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
   cancelHref: string;
   submitLabel: string;
   isSubmitting?: boolean;
}

// Right-aligned Cancel + primary submit buttons at the bottom of a form.
export function FormActions({ cancelHref, submitLabel, isSubmitting }: FormActionsProps) {
   return (
      <div className="flex items-center justify-end gap-3">
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
