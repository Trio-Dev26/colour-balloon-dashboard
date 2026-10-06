'use client';

import type { ReactElement } from 'react';
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ConfirmDialogProps {
   /** The element that opens the dialog (rendered as the trigger). */
   trigger: ReactElement;
   title: string;
   description: string;
   confirmLabel: string;
   onConfirm: () => void;
   destructive?: boolean;
}

// FR-CUR-012: every delete asks for confirmation first.
export function ConfirmDialog({
   trigger,
   title,
   description,
   confirmLabel,
   onConfirm,
   destructive,
}: ConfirmDialogProps) {
   return (
      <AlertDialog>
         <AlertDialogTrigger render={trigger} />
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>{title}</AlertDialogTitle>
               <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction variant={destructive ? 'destructive' : 'default'} onClick={onConfirm}>
                  {confirmLabel}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
