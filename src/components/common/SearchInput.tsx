import type { ComponentProps } from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function SearchInput({ className, ...props }: Omit<ComponentProps<'input'>, 'type'>) {
   return (
      <div className={cn('relative w-80', className)}>
         <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-tertiary-foreground" />
         <Input type="search" className="h-9 pl-9" {...props} />
      </div>
   );
}
