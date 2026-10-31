import type { FormEventHandler, ReactNode } from 'react';
import { LoadingButton } from '@/components/common/LoadingButton';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DialogFormProps {
   title: string;
   submitLabel: string;
   isSubmitting?: boolean;
   onSubmit: FormEventHandler<HTMLFormElement>;
   onCancel: () => void;
   children: ReactNode;
}

// Inside a DialogContent: title bar, scrolling fields, then Cancel + submit (Figma "Create Unit" / "Create Lesson").
export function DialogForm({ title, submitLabel, isSubmitting, onSubmit, onCancel, children }: DialogFormProps) {
   return (
      // min-w-0: a wide table scrolls sideways inside its own wrapper instead of stretching the dialog.
      <form onSubmit={onSubmit} noValidate className="min-w-0">
         <DialogHeader className="border-b px-6 py-5">
            <DialogTitle className="text-2xl leading-7.5 font-bold tracking-[-0.5px]">{title}</DialogTitle>
         </DialogHeader>
         {/* Children keep their height (shrink-0), so tall content scrolls here instead of being squeezed and clipped. */}
         <div className="flex max-h-[65vh] flex-col gap-6 overflow-y-auto px-6 py-5 *:shrink-0">{children}</div>
         <DialogFooter className="m-0 flex-row justify-end gap-3 rounded-b-xl border-t bg-transparent px-6 py-4">
            <Button type="button" variant="secondary" size="lg" className="font-semibold" onClick={onCancel}>
               Cancel
            </Button>
            <LoadingButton type="submit" size="lg" className="px-3 font-semibold" loading={isSubmitting}>
               {submitLabel}
            </LoadingButton>
         </DialogFooter>
      </form>
   );
}
