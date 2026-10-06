import { Skeleton } from '@/components/ui/skeleton';

const BLOCK_HEIGHTS = ['h-8 w-1/3', 'h-9', 'h-38', 'h-9', 'h-47'];

// Generic page-body placeholder while a detail record loads.
export function ContentSkeleton() {
   return (
      <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading">
         {BLOCK_HEIGHTS.map((size, index) => (
            <Skeleton key={index} className={`w-full ${size}`} />
         ))}
      </div>
   );
}
