import type { ReactNode } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
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
      <header className="flex flex-wrap items-center justify-between gap-4 border-b px-4 py-5 sm:px-6">
         {/* Only page action buttons may wrap below; the small bell + avatar stay on the right. */}
         <div className={cn('flex min-w-0 items-start gap-2', actions ? 'flex-auto' : 'flex-1')}>
            <SidebarTrigger className="mt-0.5 md:hidden" />
            <div className="flex min-w-0 flex-col gap-2">
               <h1 className="text-xl leading-6 font-bold tracking-[-0.5px]">{title}</h1>
               {breadcrumbs && <PageBreadcrumb items={breadcrumbs} />}
               {description && <p className="text-base font-medium text-muted-foreground">{description}</p>}
            </div>
         </div>
         <div className="flex flex-wrap items-center gap-2">{actions ?? <HeaderUserActions />}</div>
      </header>
   );
}
