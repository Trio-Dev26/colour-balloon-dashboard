import Link from 'next/link';
import { ChevronRightIcon, FolderOpenIcon } from 'lucide-react';
import { IconTile } from '@/components/common/IconTile';
import { ToneBadge } from '@/components/common/ToneBadge';
import { MODULE_STATUS } from '@/constants/module';
import { ROUTES } from '@/constants/routes';
import { formatRelativeTime } from '@/lib/format';
import type { ModuleListItem } from '@/types/api/module.types';

const plural = (count: number, noun: string) => `${count} ${noun}${count === 1 ? '' : 's'}`;

// Thumbnail, titles, contents, status and last edit of one module; opens the module.
export function RecentModuleRow({ module }: { module: ModuleListItem }) {
   const status = MODULE_STATUS[module.status];

   return (
      <li>
         <Link
            href={ROUTES.moduleDetail(module.id)}
            className="group flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors outline-none hover:bg-sidebar focus-visible:ring-3 focus-visible:ring-ring/50"
         >
            {module.thumbnailUrl ? (
               // Plain <img>: short-lived signed URLs can't go through next/image.
               // eslint-disable-next-line @next/next/no-img-element
               <img src={module.thumbnailUrl} alt="" className="size-10 shrink-0 rounded-xl border object-cover" />
            ) : (
               <IconTile icon={FolderOpenIcon} />
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
               <p className="truncate text-sm font-medium">
                  {module.titleEn}
                  <span className="ml-2 font-myanmar text-xs font-normal text-muted-foreground">{module.titleMy}</span>
               </p>
               <p className="truncate text-xs text-tertiary-foreground">
                  <span className="font-medium text-accent-foreground">{module.code}</span>
                  {` · ${module.level.titleEn} · ${plural(module.unitCount, 'unit')} · ${plural(module.lessonCount, 'lesson')}`}
               </p>
            </div>
            <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
               <ToneBadge tone={status.tone}>{status.label}</ToneBadge>
               <span className="text-xs text-placeholder">{formatRelativeTime(module.updatedAt)}</span>
            </div>
            <ChevronRightIcon
               className="size-4 shrink-0 text-placeholder transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
               aria-hidden
            />
         </Link>
      </li>
   );
}
