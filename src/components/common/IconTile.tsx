import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Tone } from '@/types/ui/common.types';

const TONE_CLASSES: Record<Tone, string> = {
   success: 'bg-success text-success-foreground',
   info: 'bg-info text-info-foreground',
   warning: 'bg-warning text-warning-foreground',
   neutral: 'bg-muted text-muted-foreground',
   primary: 'bg-accent text-primary',
};

const SIZE_CLASSES = {
   sm: 'size-8 rounded-lg [&_svg]:size-4',
   md: 'size-10 rounded-xl [&_svg]:size-5',
};

interface IconTileProps {
   icon: LucideIcon;
   tone?: Tone;
   size?: keyof typeof SIZE_CLASSES;
   className?: string;
}

// Icon on a soft tinted square (section headers, file rows).
export function IconTile({ icon: Icon, tone = 'primary', size = 'md', className }: IconTileProps) {
   return (
      <span
         className={cn(
            'inline-flex shrink-0 items-center justify-center',
            TONE_CLASSES[tone],
            SIZE_CLASSES[size],
            className
         )}
      >
         <Icon aria-hidden />
      </span>
   );
}
