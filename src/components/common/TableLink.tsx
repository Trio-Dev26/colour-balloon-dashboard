import Link from 'next/link';
import type { ReactNode } from 'react';

// A table cell value that opens the related record, e.g. a code linking to its detail page.
export function TableLink({ href, children }: { href: string; children: ReactNode }) {
   return (
      <Link href={href} className="font-medium text-primary hover:underline">
         {children}
      </Link>
   );
}
