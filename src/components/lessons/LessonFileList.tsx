'use client';

import { useState } from 'react';
import { ArrowUpDownIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ArrangeList } from '@/components/common/ordered/ArrangeList';
import { RowActions } from '@/components/common/RowActions';
import { Button } from '@/components/ui/button';
import { useDeleteLessonFile, useReorderLessonFiles } from '@/hooks/useLessonFiles';
import { apiErrorMessage } from '@/lib/form';
import type { LessonFile, LessonFileGroup } from '@/types/api/lessonFile.types';
import { LessonFileSummary } from './LessonFileSummary';

const MIN_FILES_TO_ARRANGE = 2;

interface LessonFileListProps {
   lessonId: string;
   group: LessonFileGroup;
   /** The group's files in their saved order. */
   files: LessonFile[];
   onEditCaption: (file: LessonFile) => void;
}

// Saved files of one group with preview / caption / delete, and an "Arrange files" mode (FR-FILE-003, D12).
export function LessonFileList({ lessonId, group, files, onEditCaption }: LessonFileListProps) {
   const [isArranging, setIsArranging] = useState(false);
   const reorder = useReorderLessonFiles(lessonId, group);
   const { mutate: deleteFile } = useDeleteLessonFile(lessonId);

   const saveOrder = (ids: string[]) =>
      reorder.mutate(ids, {
         onSuccess: () => {
            setIsArranging(false);
            toast.success('File order saved');
         },
         onError: (error) => toast.error(apiErrorMessage(error, 'Couldn’t save the file order. Please try again.')),
      });

   const remove = (file: LessonFile) =>
      deleteFile(file.id, {
         onSuccess: () => toast.success(`${file.fileName} deleted`),
         onError: (error) => toast.error(apiErrorMessage(error, `Couldn’t delete ${file.fileName}.`)),
      });

   if (isArranging) {
      return (
         <ArrangeList
            items={files}
            getId={(file) => file.id}
            renderItem={(file, index) => <LessonFileSummary file={file} order={index + 1} />}
            getHandleLabel={(file, index) => `Move file ${index + 1}: ${file.fileName}`}
            hint="Drag files by the handle to change the order learners see them in."
            isSaving={reorder.isPending}
            onSave={saveOrder}
            onCancel={() => setIsArranging(false)}
         />
      );
   }

   return (
      <>
         <ul className="divide-y">
            {files.map((file) => (
               <li key={file.id} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-sidebar">
                  <LessonFileSummary file={file} order={file.sequence} />
                  <RowActions
                     entityName="file"
                     viewHref={file.url}
                     viewInNewTab
                     edit={() => onEditCaption(file)}
                     onDelete={() => remove(file)}
                     deleteDescription={`${file.fileName} will be deleted for good. Learners won’t see it any more.`}
                  />
               </li>
            ))}
         </ul>
         {files.length >= MIN_FILES_TO_ARRANGE && (
            <div className="flex justify-end border-t bg-sidebar px-4 py-2">
               <Button variant="ghost" size="sm" onClick={() => setIsArranging(true)}>
                  <ArrowUpDownIcon />
                  Arrange files
               </Button>
            </div>
         )}
      </>
   );
}
