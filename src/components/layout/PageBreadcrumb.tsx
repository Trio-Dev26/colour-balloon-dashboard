import { Fragment } from 'react';
import Link from 'next/link';
import { ToneBadge } from '@/components/common/ToneBadge';
import { TruncatedText } from '@/components/common/TruncatedText';
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import type { BreadcrumbEntry } from '@/types/ui/navigation.types';

// "[Code pill] Title" crumb. Long titles get "…" with the full title on hover; on phones an
// ancestor shows only its code so the trail fits.
function CrumbLabel({ item, isCurrent }: { item: BreadcrumbEntry; isCurrent: boolean }) {
   if (!item.code) return item.label;

   return (
      <span className="flex min-w-0 items-center gap-1.5">
         <ToneBadge tone={item.codeTone ?? 'neutral'} className="shrink-0 font-semibold">
            {item.code}
         </ToneBadge>
         <TruncatedText text={item.label} className={cn('max-w-40 lg:max-w-56', !isCurrent && 'hidden sm:block')} />
      </span>
   );
}

export function PageBreadcrumb({ items }: { items: BreadcrumbEntry[] }) {
   return (
      <Breadcrumb>
         <BreadcrumbList className="gap-1 text-sm sm:gap-1">
            {items.map((item, index) => (
               <Fragment key={item.href ?? item.label}>
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem className="min-w-0">
                     {item.href ? (
                        <BreadcrumbLink render={<Link href={item.href} />} className="min-w-0 text-muted-foreground">
                           <CrumbLabel item={item} isCurrent={false} />
                        </BreadcrumbLink>
                     ) : (
                        <BreadcrumbPage className="min-w-0 text-accent-foreground">
                           <CrumbLabel item={item} isCurrent />
                        </BreadcrumbPage>
                     )}
                  </BreadcrumbItem>
               </Fragment>
            ))}
         </BreadcrumbList>
      </Breadcrumb>
   );
}
