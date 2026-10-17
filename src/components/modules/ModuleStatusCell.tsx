'use client';

import { HintTooltip } from '@/components/common/HintTooltip';
import { ToneBadge } from '@/components/common/ToneBadge';
import { Switch } from '@/components/ui/switch';
import { MODULE_STATUS } from '@/constants/module';
import type { ModuleStatus } from '@/types/api/module.types';

interface ModuleStatusCellProps {
   status: ModuleStatus;
   onToggle: (published: boolean) => void;
   /** When set, the switch is disabled and this explains why on hover. */
   disabledReason?: string;
}

// Publish switch + status badge (FR-CUR-001 "status toggle").
export function ModuleStatusCell({ status, onToggle, disabledReason }: ModuleStatusCellProps) {
   const { label, tone } = MODULE_STATUS[status];

   return (
      <div className="flex items-center gap-1">
         <HintTooltip hint={disabledReason}>
            <Switch
               checked={status === 'PUBLISHED'}
               onCheckedChange={onToggle}
               disabled={Boolean(disabledReason)}
               aria-label="Published"
            />
         </HintTooltip>
         <ToneBadge tone={tone} className="min-w-18">
            {label}
         </ToneBadge>
      </div>
   );
}
