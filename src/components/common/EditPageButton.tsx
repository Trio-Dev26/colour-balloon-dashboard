'use client';

import Link from 'next/link';
import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Primary "Edit … info" link in a detail page header (module, unit, lesson).
export function EditPageButton({ href, label }: { href: string; label: string }) {
   return (
      <Button size="lg" className="font-semibold" nativeButton={false} render={<Link href={href} />}>
         <PencilIcon />
         {label}
      </Button>
   );
}
