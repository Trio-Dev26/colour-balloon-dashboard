import { SectionCard } from '@/components/common/SectionCard';
import { MODULE_STATUS_ORDER } from '@/constants/dashboard';
import { MODULE_STATUS } from '@/constants/module';
import type { ModuleStatus } from '@/types/api/module.types';

const PERCENT = 100;

const STATUS_COLOR: Record<ModuleStatus, string> = {
   PUBLISHED: 'bg-primary',
   UNPUBLISHED: 'bg-warning-foreground',
   DRAFT: 'bg-accent-border',
};

interface PublishingStatusCardProps {
   total: number;
   counts: Record<ModuleStatus, number>;
}

// Share of modules learners can see, as one stacked bar with a legend.
export function PublishingStatusCard({ total, counts }: PublishingStatusCardProps) {
   const share = (count: number) => (total ? (count / total) * PERCENT : 0);

   return (
      <SectionCard title="Publishing status" description="Only published modules are visible to learners.">
         <div className="flex items-baseline gap-2">
            <span className="text-3xl leading-9 font-bold tracking-tight tabular-nums">
               {Math.round(share(counts.PUBLISHED))}%
            </span>
            <span className="text-sm text-muted-foreground">live</span>
         </div>
         <div
            className="flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-muted"
            role="img"
            aria-label="Modules by status"
         >
            {MODULE_STATUS_ORDER.map((status) =>
               counts[status] > 0 ? (
                  <span
                     key={status}
                     className={`h-full transition-[width] ${STATUS_COLOR[status]}`}
                     style={{ width: `${share(counts[status])}%` }}
                  />
               ) : null
            )}
         </div>
         <ul className="flex flex-col gap-2">
            {MODULE_STATUS_ORDER.map((status) => (
               <li key={status} className="flex items-center gap-2 text-sm">
                  <span className={`size-2.5 rounded-full ${STATUS_COLOR[status]}`} aria-hidden />
                  <span className="flex-1 text-muted-foreground">{MODULE_STATUS[status].label}</span>
                  <span className="font-semibold tabular-nums">{counts[status]}</span>
               </li>
            ))}
         </ul>
      </SectionCard>
   );
}
