'use client';

import type { ReactNode } from 'react';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { EditorColor } from '@/constants/editor';
import { ToolbarButton } from './ToolbarButton';

interface ToolbarColorPickerProps {
   label: string;
   /** Trigger content (icon or swatch). */
   icon: ReactNode;
   colors: readonly EditorColor[];
   onSelect: (color: string | null) => void;
}

export function ToolbarColorPicker({ label, icon, colors, onSelect }: ToolbarColorPickerProps) {
   return (
      <Popover>
         <PopoverTrigger render={<ToolbarButton aria-label={label} />}>
            {icon}
            <ChevronDownIcon className="size-3!" />
         </PopoverTrigger>
         <PopoverContent className="flex w-auto gap-1.5 p-2">
            {colors.map((color) => (
               <button
                  key={color.label}
                  type="button"
                  title={color.label}
                  aria-label={color.label}
                  onClick={() => onSelect(color.value)}
                  className="flex size-6 items-center justify-center rounded-md border"
                  style={color.value ? { backgroundColor: color.value } : undefined}
               >
                  {!color.value && <XIcon className="size-3.5 text-muted-foreground" />}
               </button>
            ))}
         </PopoverContent>
      </Popover>
   );
}
