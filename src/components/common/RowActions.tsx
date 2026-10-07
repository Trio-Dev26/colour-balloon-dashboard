'use client';

import Link from 'next/link';
import { EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from './ConfirmDialog';

interface RowActionsProps {
   /** Used in labels and the delete confirmation, e.g. "module". */
   entityName: string;
   /** Omit to hide the view (eye) button. */
   viewHref?: string;
   editHref: string;
   onDelete: () => void;
}

// Edit / delete / view icon buttons at the end of a table row (Figma order).
export function RowActions({ entityName, viewHref, editHref, onDelete }: RowActionsProps) {
   return (
      <div className="flex items-center justify-end gap-2">
         <Button
            variant="ghost"
            size="icon"
            aria-label={`Edit ${entityName}`}
            nativeButton={false}
            render={<Link href={editHref} />}
         >
            <PencilIcon />
         </Button>
         <ConfirmDialog
            trigger={
               <Button variant="ghost" size="icon" aria-label={`Delete ${entityName}`}>
                  <Trash2Icon />
               </Button>
            }
            title={`Delete this ${entityName}?`}
            description={`The ${entityName} will be hidden from admins and learners. This can't be undone from the dashboard.`}
            confirmLabel="Delete"
            onConfirm={onDelete}
            destructive
         />
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
