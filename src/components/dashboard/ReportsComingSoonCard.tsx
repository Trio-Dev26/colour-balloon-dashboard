import { CreditCardIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';
import { IconTile } from '@/components/common/IconTile';
import { SectionCard } from '@/components/common/SectionCard';
import { ToneBadge } from '@/components/common/ToneBadge';

// PRD FR-RPT-001: which learner and revenue numbers to show is still open (Q25), so only the slots are shown.
const UPCOMING = [
   { icon: UsersIcon, label: 'Learners & teachers' },
   { icon: TrendingUpIcon, label: 'Trials & subscriptions' },
   { icon: CreditCardIcon, label: 'Revenue' },
];

export function ReportsComingSoonCard() {
   return (
      <SectionCard
         title="Learners & subscriptions"
         description="These reports appear here once users and payments go live."
         action={<ToneBadge tone="primary">Coming soon</ToneBadge>}
         className="border-dashed bg-sidebar shadow-none"
      >
         <div className="grid gap-3 sm:grid-cols-3">
            {UPCOMING.map(({ icon, label }) => (
               <div key={label} className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3">
                  <IconTile icon={icon} tone="neutral" size="sm" />
                  <div className="flex flex-col">
                     <span className="text-xs text-muted-foreground">{label}</span>
                     <span className="text-lg leading-6 font-bold text-placeholder">—</span>
                  </div>
               </div>
            ))}
         </div>
      </SectionCard>
   );
}
