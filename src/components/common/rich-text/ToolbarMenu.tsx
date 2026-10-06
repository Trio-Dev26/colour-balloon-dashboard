'use client';

import type { ReactNode } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ToolbarButton } from './ToolbarButton';

export interface ToolbarMenuOption {
   label: string;
   onSelect: () => void;
   active?: boolean;
}

interface ToolbarMenuProps {
   label: string;
   icon: ReactNode;
   options: ToolbarMenuOption[];
   /** Show the small caret next to the icon (Figma list button). */
   caret?: boolean;
}

// Toolbar button that opens a small option list (list type, line spacing).
export function ToolbarMenu({ label, icon, options, caret }: ToolbarMenuProps) {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger render={<ToolbarButton aria-label={label} active={options.some((o) => o.active)} />}>
            {icon}
            {caret && <ChevronDownIcon className="size-3!" />}
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-40">
            {options.map((option) => (
               <DropdownMenuItem
                  key={option.label}
                  onClick={option.onSelect}
                  className={option.active ? 'text-accent-foreground' : undefined}
               >
                  {option.label}
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
