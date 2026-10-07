import { padNumber } from '@/lib/format';

// "01" square badge showing an item's position in an unlock order (units, lessons).
export function OrderBadge({ order }: { order: number }) {
   return (
      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-info text-xs font-medium text-primary">
         {padNumber(order)}
      </span>
   );
}
