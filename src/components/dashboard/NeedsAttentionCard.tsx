import Link from 'next/link';
import { CircleCheckIcon, FileWarningIcon } from 'lucide-react';
import { IconTile } from '@/components/common/IconTile';
import { SectionCard } from '@/components/common/SectionCard';
import { ATTENTION_LIMIT } from '@/constants/dashboard';
import { ROUTES } from '@/constants/routes';
import type { LessonListItem } from '@/types/api/lesson.types';
import { ViewAllLink } from './ViewAllLink';

// Lessons with no student files yet: learners would open them to an empty page.
export function NeedsAttentionCard({ lessons }: { lessons: LessonListItem[] }) {
   const hidden = lessons.length - ATTENTION_LIMIT;

   return (
      <SectionCard
         title="Needs attention"
         description="Lessons without student materials."
         action={hidden > 0 ? <ViewAllLink href={ROUTES.lessons} label={`${hidden} more`} /> : undefined}
      >
         {lessons.length > 0 ? (
            <ul className="-mx-2 flex flex-col">
               {lessons.slice(0, ATTENTION_LIMIT).map((lesson) => (
                  <li key={lesson.id}>
                     <Link
                        href={ROUTES.lessonDetail(lesson.id)}
                        className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors outline-none hover:bg-sidebar focus-visible:ring-3 focus-visible:ring-ring/50"
                     >
                        <IconTile icon={FileWarningIcon} tone="warning" size="sm" />
                        <div className="flex min-w-0 flex-col">
                           <p className="truncate text-sm font-medium">{lesson.titleEn}</p>
                           <p className="truncate text-xs text-tertiary-foreground">
                              {lesson.moduleCode} · {lesson.unitCode} · {lesson.code}
                           </p>
                        </div>
                     </Link>
                  </li>
               ))}
            </ul>
         ) : (
            <div className="flex items-center gap-3 rounded-lg bg-success px-3 py-3 text-sm text-success-foreground">
               <CircleCheckIcon className="size-5 shrink-0" aria-hidden />
               Every lesson has student materials.
            </div>
         )}
      </SectionCard>
   );
}
