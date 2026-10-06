import type { ReactNode } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbEntry } from '@/types/ui/navigation.types';
import { HeaderUserActions } from './HeaderUserActions';
import { PageBreadcrumb } from './PageBreadcrumb';

interface PageHeaderProps {
   title: string;
   description?: string;
   breadcrumbs?: BreadcrumbEntry[];
   /** Replaces the default bell + avatar on the right (e.g. page buttons on detail screens). */
   actions?: ReactNode;
}

export function PageHeader({ title, description, breadcrumbs, actions }: PageHeaderProps) {
   return (
      <header className="flex items-center justify-between gap-4 border-b px-6 py-5">
         <div className="flex min-w-0 flex-1 items-start gap-2">
            <SidebarTrigger className="mt-0.5 md:hidden" />
            <div className="flex min-w-0 flex-col gap-2">
               <h1 className="text-xl leading-6 font-bold tracking-[-0.5px]">{title}</h1>
               {breadcrumbs && <PageBreadcrumb items={breadcrumbs} />}
               {description && <p className="text-base font-medium text-muted-foreground">{description}</p>}
            </div>
         </div>
         <div className="flex shrink-0 items-center gap-2">{actions ?? <HeaderUserActions />}</div>
      </header>
   );
}
