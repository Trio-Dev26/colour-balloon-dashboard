import Link from 'next/link';
import { SearchXIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from './EmptyState';

interface NotFoundStateProps {
   /** Lower-case entity name, e.g. "module". */
   entityName: string;
   backHref: string;
}

// Shown on detail/edit pages when the record doesn't exist (API 404).
export function NotFoundState({ entityName, backHref }: NotFoundStateProps) {
   const title = `${entityName.charAt(0).toUpperCase()}${entityName.slice(1)} not found`;
   return (
      <EmptyState
         icon={<SearchXIcon className="size-10 text-tertiary-foreground" />}
         title={title}
         description={`This ${entityName} doesn’t exist or has been deleted.`}
         action={
            <Button variant="outline" size="lg" nativeButton={false} render={<Link href={backHref} />}>
               Back to {entityName}s
            </Button>
         }
      />
   );
}
