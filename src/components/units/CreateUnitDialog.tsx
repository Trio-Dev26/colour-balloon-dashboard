'use client';

import { FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useUnitForm } from '@/hooks/useUnitForm';
import { UnitFields } from './UnitFields';

interface CreateUnitDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   /** Pre-selects the module (opened from a module's detail page). */
   moduleId?: string;
}

// Figma "Create Unit" dialog, opened from the module detail page.
export function CreateUnitDialog({ open, onOpenChange, moduleId }: CreateUnitDialogProps) {
   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent showCloseButton={false} className="gap-0 p-0 sm:max-w-175">
            {/* Remounting on open gives a fresh, empty form each time. */}
            {open && <CreateUnitDialogForm moduleId={moduleId} onClose={() => onOpenChange(false)} />}
         </DialogContent>
      </Dialog>
   );
}

function CreateUnitDialogForm({ moduleId, onClose }: { moduleId?: string; onClose: () => void }) {
   const { form, onSubmit, isSaving } = useUnitForm({ defaultValues: { moduleId }, onSaved: onClose });

   return (
      <FormProvider {...form}>
         <form onSubmit={onSubmit} noValidate>
            <DialogHeader className="border-b px-6 py-5">
               <DialogTitle className="text-2xl leading-7.5 font-bold tracking-[-0.5px]">Create Unit</DialogTitle>
            </DialogHeader>
            <div className="flex max-h-[65vh] flex-col gap-6 overflow-y-auto px-6 py-5">
               <UnitFields isModuleLocked={Boolean(moduleId)} />
            </div>
            <DialogFooter className="m-0 flex-row justify-end gap-3 rounded-b-xl border-t bg-transparent px-6 py-4">
               <Button type="button" variant="secondary" size="lg" className="font-semibold" onClick={onClose}>
                  Cancel
               </Button>
               <Button type="submit" size="lg" className="px-3 font-semibold" disabled={isSaving}>
                  Save unit
               </Button>
            </DialogFooter>
         </form>
      </FormProvider>
   );
}
