'use client';

import { useState, type ComponentProps } from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function SearchInput({ className, defaultValue, ...props }: Omit<ComponentProps<'input'>, 'type'>) {
   // Uncontrolled input: keep the first defaultValue. Callers pass the URL value, which changes on every
   // keystroke, and Base UI warns when an uncontrolled field's default changes after mount.
   const [initialValue] = useState(defaultValue);

   return (
      <div className={cn('relative w-80', className)}>
         <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-tertiary-foreground" />
         <Input type="search" className="h-9 pl-9" defaultValue={initialValue} {...props} />
      </div>
   );
}
