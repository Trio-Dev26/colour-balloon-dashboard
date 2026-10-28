'use client';

import { useState } from 'react';
import { FolderOpenIcon } from 'lucide-react';
import { IconTile } from '@/components/common/IconTile';
import { UnderlineTabs } from '@/components/common/UnderlineTabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LESSON_FILE_AUDIENCES, LESSON_FILE_GROUPS } from '@/constants/lessonFile';
import { useLessonFiles } from '@/hooks/useLessonFiles';
import type { LessonFile, LessonFileAudience } from '@/types/api/lessonFile.types';
import { LessonFileCaptionDialog } from './LessonFileCaptionDialog';
import { LessonFileGroupPanel } from './LessonFileGroupPanel';

// "Lesson Files" on the lesson detail page: Learner side / Teacher side tabs, two file groups each
// (FR-FILE-001). Files can be changed in any module status (D28: editing files is always allowed).
export function LessonFilesSection({ lessonId }: { lessonId: string }) {
   const { data: files = [], isPending, isError, refetch } = useLessonFiles(lessonId);
   const [captionFile, setCaptionFile] = useState<LessonFile | null>(null);

   const tabs = LESSON_FILE_AUDIENCES.map((audience) => ({
      value: audience.value,
      label: (
         <>
            {audience.label}
            <span className="min-w-5 rounded-full bg-muted px-1.5 text-xs font-medium text-muted-foreground in-data-active:bg-primary in-data-active:text-primary-foreground">
               {files.filter((file) => file.group.startsWith(audience.value)).length}
            </span>
         </>
      ),
   }));

   // Panels stay mounted, so uploads in progress keep their rows when switching tabs.
   const renderAudience = (audience: LessonFileAudience) =>
      LESSON_FILE_GROUPS.filter((config) => config.audience === audience).map((config) => (
         <LessonFileGroupPanel
            key={config.group}
            lessonId={lessonId}
            config={config}
            files={files.filter((file) => file.group === config.group)}
            onEditCaption={setCaptionFile}
         />
      ));

   return (
      <section className="flex flex-col gap-4 border-t pt-6">
         <div className="flex items-center gap-3">
            <IconTile icon={FolderOpenIcon} />
            <div className="flex flex-col gap-0.5">
               <h3 className="text-base leading-5 font-semibold tracking-tight">Lesson Files</h3>
               <p className="text-xs text-muted-foreground">
                  Students only see student files; teachers only see teacher files.
               </p>
            </div>
         </div>
         {isError ? (
            <div className="flex flex-col items-center gap-3 rounded-xl border p-6 text-sm text-muted-foreground">
               Couldn&apos;t load the lesson files.
               <Button variant="outline" onClick={() => refetch()}>
                  Try again
               </Button>
            </div>
         ) : isPending ? (
            <Skeleton className="h-40 w-full rounded-xl" />
         ) : (
            <UnderlineTabs tabs={tabs} className="gap-5" panelClassName="flex flex-col gap-4">
               {renderAudience}
            </UnderlineTabs>
         )}
         <LessonFileCaptionDialog file={captionFile} onClose={() => setCaptionFile(null)} />
      </section>
   );
}
