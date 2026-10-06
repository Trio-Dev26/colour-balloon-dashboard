import { Fragment } from 'react';
import Link from 'next/link';
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type { BreadcrumbEntry } from '@/types/ui/navigation.types';

export function PageBreadcrumb({ items }: { items: BreadcrumbEntry[] }) {
   return (
      <Breadcrumb>
         <BreadcrumbList className="gap-1 text-sm sm:gap-1">
            {items.map((item, index) => (
               <Fragment key={item.label}>
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                     {item.href ? (
                        <BreadcrumbLink render={<Link href={item.href} />} className="text-muted-foreground">
                           {item.label}
                        </BreadcrumbLink>
                     ) : (
                        <BreadcrumbPage className="text-accent-foreground">{item.label}</BreadcrumbPage>
                     )}
                  </BreadcrumbItem>
               </Fragment>
            ))}
         </BreadcrumbList>
      </Breadcrumb>
   );
}
