import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

// "View all →" in a dashboard card's title row.
export function ViewAllLink({ href, label = 'View all' }: { href: string; label?: string }) {
   return (
      <Link
         href={href}
         className="group inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary hover:underline"
      >
         {label}
         <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
   );
}
