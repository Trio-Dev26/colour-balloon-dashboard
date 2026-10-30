import { cn } from '@/lib/utils';
import type { Tone } from '@/types/ui/common.types';

const CHIP_TONES: Record<Tone, string> = {
   success: 'bg-success-border text-success-foreground',
   info: 'bg-info text-info-foreground',
   warning: 'bg-warning text-warning-foreground',
   neutral: 'bg-muted text-muted-foreground',
   primary: 'bg-accent text-accent-foreground',
};

interface MetaChipProps {
   label: string;
   value: string;
   /** Coloured pill; plain bold text when omitted. */
   tone?: Tone;
   className?: string;
}

// One MetaBar cell: small "LEVEL" label above a coloured "Foundation" pill (or plain "3 per 24 h").
export function MetaChip({ label, value, tone, className }: MetaChipProps) {
   return (
      <div className={cn('flex min-w-0 flex-col items-start gap-1.5', className)}>
         <dt className="text-xs font-medium text-muted-foreground uppercase">{label}</dt>
         <dd
            className={cn(
               'max-w-full truncate py-0.5 text-sm font-semibold',
               tone && ['rounded-full px-2', CHIP_TONES[tone]]
            )}
         >
            {value}
         </dd>
      </div>
   );
}
