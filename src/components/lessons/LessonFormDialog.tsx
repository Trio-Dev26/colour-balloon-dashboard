'use client';

import { DialogLoadState } from '@/components/common/DialogLoadState';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useLesson } from '@/hooks/useLessons';
import { EMPTY_LESSON_FORM, lessonToFormValues } from '@/schemas/lesson.schema';
import { LessonDialogForm } from './LessonDialogForm';

interface LessonFormDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   /** Create: the unit the new lesson goes into (the unit detail page's) and its module. */
   unit: { moduleId: string; unitId: string };
   /** Edit this lesson instead of creating one. */
   lessonId?: string;
}

// Create / Edit Lesson dialog on the unit detail page.
export function LessonFormDialog({ open, onOpenChange, unit, lessonId }: LessonFormDialogProps) {
   const close = () => onOpenChange(false);

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent showCloseButton={false} className="gap-0 p-0 sm:max-w-175">
            {/* Remounting on open gives a fresh form each time. */}
            {open &&
               (lessonId ? (
                  <EditLessonDialogBody lessonId={lessonId} onClose={close} />
               ) : (
                  <LessonDialogForm defaultValues={{ ...EMPTY_LESSON_FORM, ...unit }} onClose={close} />
               ))}
         </DialogContent>
      </Dialog>
   );
}

// Loads the lesson, then opens the form pre-filled with its values.
function EditLessonDialogBody({ lessonId, onClose }: { lessonId: string; onClose: () => void }) {
   const { data: lesson, isPending } = useLesson(lessonId);

   if (!lesson) {
      return (
         <DialogLoadState title="Edit Lesson" isLoading={isPending} missingMessage="This lesson no longer exists." />
      );
   }
   return <LessonDialogForm lessonId={lessonId} defaultValues={lessonToFormValues(lesson)} onClose={onClose} />;
}
