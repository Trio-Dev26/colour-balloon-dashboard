import { Skeleton } from '@/components/ui/skeleton';

const STAT_CARDS = 4;

// Same shape as the loaded dashboard: banner, stat row, then the two-column cards.
export function DashboardSkeleton() {
   return (
      <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading">
         <Skeleton className="h-36 w-full rounded-2xl" />
         <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: STAT_CARDS }, (_, index) => (
               <Skeleton key={index} className="h-32 rounded-xl" />
            ))}
         </div>
         <div className="grid gap-6 lg:grid-cols-3">
            <Skeleton className="h-80 rounded-xl lg:col-span-2" />
            <Skeleton className="h-80 rounded-xl" />
         </div>
      </div>
   );
}
