'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { SelectOption } from '@/types/ui/common.types';
import { cn } from '@/lib/utils';

const ALL_VALUE = '__all__';

interface FilterSelectProps {
   placeholder: string;
   options: readonly SelectOption[];
   value: string | undefined;
   onValueChange: (value: string | undefined) => void;
   className?: string;
}

// Toolbar filter: shows the placeholder when nothing is chosen and offers an "All" option to clear it.
export function FilterSelect({ placeholder, options, value, onValueChange, className }: FilterSelectProps) {
   return (
      <Select
         items={options}
         value={value ?? null}
         onValueChange={(next) => onValueChange(!next || next === ALL_VALUE ? undefined : String(next))}
      >
         <SelectTrigger className={cn('h-9 w-40 data-placeholder:text-muted-foreground', className)}>
            <SelectValue placeholder={placeholder} />
         </SelectTrigger>
         <SelectContent>
            <SelectItem value={ALL_VALUE}>All</SelectItem>
            {options.map((option) => (
               <SelectItem key={option.value} value={option.value}>
                  {option.label}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
}
