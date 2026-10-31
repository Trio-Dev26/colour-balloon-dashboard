'use client';

import Link from 'next/link';
import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ICON_ON_PHONE } from '@/constants/layout';
import { cn } from '@/lib/utils';

// Primary "Edit … info" link in a detail page header (module, unit, lesson, quiz, question).
// A pencil icon only on phones; the label stays for screen readers and as a tooltip.
export function EditPageButton({ href, label }: { href: string; label: string }) {
   return (
      <Button
         size="lg"
         className={cn('font-semibold', ICON_ON_PHONE.button)}
         title={label}
         nativeButton={false}
         render={<Link href={href} />}
      >
         <PencilIcon />
         <span className={ICON_ON_PHONE.label}>{label}</span>
      </Button>
   );
}
