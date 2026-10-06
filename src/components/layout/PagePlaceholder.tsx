import { ConstructionIcon } from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';
import { PageBody } from './PageBody';
import { PageHeader } from './PageHeader';

// Temporary body for routes whose screens are not built yet. Delete once every page is real.
export function PagePlaceholder({ title, description }: { title: string; description: string }) {
   return (
      <>
         <PageHeader title={title} description={description} />
         <PageBody>
            <EmptyState
               icon={<ConstructionIcon className="size-10 text-tertiary-foreground" />}
               title="Screen not built yet"
               description="This page will be implemented from the Figma design."
            />
         </PageBody>
      </>
   );
}
