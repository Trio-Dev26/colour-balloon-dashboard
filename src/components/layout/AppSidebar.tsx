'use client';

import { usePathname } from 'next/navigation';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu } from '@/components/ui/sidebar';
import { NAV_ENTRIES, isNavGroup } from '@/config/nav';
import { BrandLogo } from './BrandLogo';
import { SidebarNavGroup } from './SidebarNavGroup';
import { SidebarNavLink } from './SidebarNavLink';

export function AppSidebar() {
   const pathname = usePathname();

   return (
      <Sidebar className="border-r border-sidebar-border">
         <SidebarHeader className="p-4 pb-0">
            <BrandLogo />
         </SidebarHeader>
         <SidebarContent className="p-4">
            <SidebarMenu className="gap-0">
               {NAV_ENTRIES.map((entry) =>
                  isNavGroup(entry) ? (
                     <SidebarNavGroup key={entry.title} group={entry} pathname={pathname} />
                  ) : (
                     <SidebarNavLink key={entry.href} link={entry} pathname={pathname} />
                  )
               )}
            </SidebarMenu>
         </SidebarContent>
      </Sidebar>
   );
}
