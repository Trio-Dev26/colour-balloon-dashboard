import type { ReactNode } from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Tone } from '@/types/ui/common.types';
import { IconTile } from './IconTile';

interface StatCardProps {
   label: string;
   value: number | string;
   icon: LucideIcon;
   tone?: Tone;
   /** Small line under the number, e.g. "3 published". */
   hint?: ReactNode;
   /** Makes the whole card a link to the matching list. */
   href?: string;
}

// One headline number with its icon (dashboard stat row).
export function StatCard({ label, value, icon, tone, hint, href }: StatCardProps) {
   const body = (
      <>
         <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <IconTile icon={icon} tone={tone} />
         </div>
         <p className="text-3xl leading-9 font-bold tracking-tight tabular-nums">{value}</p>
         {hint && <p className="text-xs text-tertiary-foreground">{hint}</p>}
      </>
   );
   const className = 'flex flex-col gap-1 rounded-xl border bg-card p-5 shadow-xs';

   return href ? (
      <Link
         href={href}
         className={cn(
            className,
            'transition-all outline-none hover:-translate-y-0.5 hover:border-accent-border hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50'
         )}
      >
         {body}
      </Link>
   ) : (
      <div className={className}>{body}</div>
   );
}
