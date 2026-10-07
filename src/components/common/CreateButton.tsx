import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

type CreateButtonProps = { label: string; disabled?: boolean } & (
   { href: string; onClick?: never } | { onClick: () => void; href?: never }
);

// "+ Create …" primary button: a link to a create page, or a click handler (e.g. opening a dialog).
export function CreateButton({ label, disabled, href, onClick }: CreateButtonProps) {
   if (href) {
      return (
         <Button size="lg" className="font-semibold" nativeButton={false} render={<Link href={href} />}>
            <PlusIcon />
            {label}
         </Button>
      );
   }
   return (
      <Button size="lg" className="font-semibold" disabled={disabled} onClick={onClick}>
         <PlusIcon />
         {label}
      </Button>
   );
}
