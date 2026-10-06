import { cn } from '@/lib/utils';
import type { Tone } from '@/types/ui/common.types';

const CHIP_TONES: Record<Tone, string> = {
   success: 'bg-success-border text-success-foreground',
   info: 'bg-info text-info-foreground',
   warning: 'bg-warning text-warning-foreground',
   neutral: 'bg-muted text-muted-foreground',
   primary: 'bg-accent text-accent-foreground',
};

// "LEVEL  Foundation" style label + coloured pill (module detail header).
export function MetaChip({ label, value, tone }: { label: string; value: string; tone: Tone }) {
   return (
      <div className="flex items-center gap-2">
         <span className="text-xs font-medium text-muted-foreground uppercase">{label}</span>
         <span className={cn('rounded-full px-2 py-1 text-sm font-semibold', CHIP_TONES[tone])}>{value}</span>
      </div>
   );
}
