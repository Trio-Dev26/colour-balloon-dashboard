import type { ReactNode } from 'react';
import { InfoIcon, TriangleAlertIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ALERT_TONES = {
   info: { icon: InfoIcon, className: 'bg-info text-info-foreground' },
   warning: { icon: TriangleAlertIcon, className: 'bg-warning text-warning-foreground' },
} as const;

interface InfoAlertProps {
   children: ReactNode;
   /** Blue note (default) or yellow warning. */
   tone?: keyof typeof ALERT_TONES;
}

export function InfoAlert({ children, tone = 'info' }: InfoAlertProps) {
   const { icon: Icon, className } = ALERT_TONES[tone];
   return (
      <div role="note" className={cn('flex items-start gap-3 rounded-lg px-3 py-2 text-sm font-medium', className)}>
         <Icon className="mt-0.5 size-4 shrink-0" />
         <p>{children}</p>
      </div>
   );
}
