import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';

export function CreateModuleButton() {
   return (
      <Button size="lg" nativeButton={false} render={<Link href={ROUTES.newModule} />}>
         <PlusIcon />
         Create module
      </Button>
   );
}
