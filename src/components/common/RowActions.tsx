'use client';

import Link from 'next/link';
import { EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from './ConfirmDialog';
import { HintTooltip } from './HintTooltip';

interface RowActionsProps {
   /** Used in labels and the delete confirmation, e.g. "module". */
   entityName: string;
   /** Omit to hide the view (eye) button. */
   viewHref?: string;
   /** Where Edit goes: a page link, or a callback that opens an edit dialog. */
   edit: string | (() => void);
   onDelete: () => void;
   /** Body of the delete confirmation; defaults to a generic "will be hidden" message. */
   deleteDescription?: string;
   /** When set, the delete button is disabled and this explains why on hover. */
   deleteDisabledReason?: string;
}

// Edit / delete / view icon buttons at the end of a table row (Figma order).
export function RowActions({
   entityName,
   viewHref,
   edit,
   onDelete,
   deleteDescription = `The ${entityName} will be hidden from admins and learners. This can’t be undone from the dashboard.`,
   deleteDisabledReason,
}: RowActionsProps) {
   const deleteButton = (
      <Button variant="ghost" size="icon" aria-label={`Delete ${entityName}`} disabled={Boolean(deleteDisabledReason)}>
         <Trash2Icon />
      </Button>
   );

   return (
      <div className="flex items-center justify-end gap-2">
         {typeof edit === 'string' ? (
            <Button
               variant="ghost"
               size="icon"
               aria-label={`Edit ${entityName}`}
               nativeButton={false}
               render={<Link href={edit} />}
            >
               <PencilIcon />
            </Button>
         ) : (
            <Button variant="ghost" size="icon" aria-label={`Edit ${entityName}`} onClick={edit}>
               <PencilIcon />
            </Button>
         )}
         {deleteDisabledReason ? (
            <HintTooltip hint={deleteDisabledReason}>{deleteButton}</HintTooltip>
         ) : (
            <ConfirmDialog
               trigger={deleteButton}
               title={`Delete this ${entityName}?`}
               description={deleteDescription}
               confirmLabel="Delete"
               onConfirm={onDelete}
               destructive
            />
         )}
         {viewHref && (
            <Button
               variant="ghost"
               size="icon"
               aria-label={`View ${entityName}`}
               nativeButton={false}
               render={<Link href={viewHref} />}
            >
               <EyeIcon />
            </Button>
         )}
      </div>
   );
}
