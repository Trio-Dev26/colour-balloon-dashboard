import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function PageBody({ children, className }: { children: ReactNode; className?: string }) {
   return <div className={cn('flex min-w-0 flex-1 flex-col gap-6 p-4 sm:p-6', className)}>{children}</div>;
}
