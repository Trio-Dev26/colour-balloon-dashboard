'use client';

import { ToneBadge } from '@/components/common/ToneBadge';
import { Switch } from '@/components/ui/switch';
import { MODULE_STATUS } from '@/constants/module';
import type { ModuleStatus } from '@/types/api/module.types';

interface ModuleStatusCellProps {
   status: ModuleStatus;
   onToggle: (published: boolean) => void;
}

// Publish switch + status badge (FR-CUR-001 "status toggle").
export function ModuleStatusCell({ status, onToggle }: ModuleStatusCellProps) {
   const { label, tone } = MODULE_STATUS[status];

   return (
      <div className="flex items-center gap-1">
         <Switch checked={status === 'PUBLISHED'} onCheckedChange={onToggle} aria-label="Published" />
         <ToneBadge tone={tone} className="min-w-18">
            {label}
         </ToneBadge>
      </div>
   );
}
