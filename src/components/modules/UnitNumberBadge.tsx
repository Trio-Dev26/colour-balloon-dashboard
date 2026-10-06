import { padNumber } from '@/lib/format';

// "01" square badge showing a unit's position in the unlock order.
export function UnitNumberBadge({ order }: { order: number }) {
   return (
      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-info text-xs font-medium text-primary">
         {padNumber(order)}
      </span>
   );
}
