import Link from 'next/link';
import { SearchXIcon } from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';

export function ModuleNotFound() {
   return (
      <EmptyState
         icon={<SearchXIcon className="size-10 text-tertiary-foreground" />}
         title="Module not found"
         description="This module doesn’t exist or has been deleted."
         action={
            <Button variant="outline" size="lg" nativeButton={false} render={<Link href={ROUTES.modules} />}>
               Back to modules
            </Button>
         }
      />
   );
}
