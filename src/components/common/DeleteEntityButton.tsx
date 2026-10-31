'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ICON_ON_PHONE } from '@/constants/layout';
import { apiErrorMessage } from '@/lib/form';
import { cn } from '@/lib/utils';
import { ConfirmDialog } from './ConfirmDialog';
import { HintTooltip } from './HintTooltip';

interface DeleteEntityButtonProps {
   /** Used in the button and dialog labels, e.g. "quiz". */
   entityName: string;
   /** Shown in the toasts and the dialog title, e.g. "QZ003" or "QZ003 · Unit 4 Quiz". */
   name: string;
   /** Dialog body; defaults to the generic "will be hidden" message. */
   description?: string;
   /** When set, the button is disabled and this explains why on hover (D18). */
   disabledReason?: string;
   /** Deletes the record; usually a mutation's `mutateAsync`. */
   onDelete: () => Promise<unknown>;
   /** Where to go once it's deleted (the list page). */
   redirectTo: string;
}

// "Delete …" button in a detail page header (FR-CUR-012): asks first, then goes back to the list.
export function DeleteEntityButton({
   entityName,
   name,
   description = `The ${entityName} will be hidden from admins and learners. This can’t be undone from the dashboard.`,
   disabledReason,
   onDelete,
   redirectTo,
}: DeleteEntityButtonProps) {
   const router = useRouter();
   const [isDeleting, setIsDeleting] = useState(false);

   const button = (
      <Button
         variant="secondary"
         size="lg"
         className={cn('font-semibold', ICON_ON_PHONE.button)}
         title={disabledReason ? undefined : `Delete ${entityName}`}
         disabled={Boolean(disabledReason) || isDeleting}
      >
         <Trash2Icon />
         {/* A bin icon only on phones; the text stays for screen readers. */}
         <span className={ICON_ON_PHONE.label}>Delete {entityName}</span>
      </Button>
   );

   if (disabledReason) return <HintTooltip hint={disabledReason}>{button}</HintTooltip>;

   const confirm = () => {
      setIsDeleting(true);
      onDelete().then(
         () => {
            toast.success(`${name} deleted`);
            router.replace(redirectTo);
         },
         (error: unknown) => {
            toast.error(apiErrorMessage(error, `Couldn’t delete ${name}.`));
            setIsDeleting(false);
         }
      );
   };

   return (
      <ConfirmDialog
         trigger={button}
         title={`Delete ${name}?`}
         description={description}
         confirmLabel={`Delete ${entityName}`}
         onConfirm={confirm}
         destructive
      />
   );
}
