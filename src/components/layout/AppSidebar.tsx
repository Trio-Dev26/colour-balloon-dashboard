'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarRail,
} from '@/components/ui/sidebar';
import { NAV_GROUPS, findNavItem } from '@/config/nav';

export function AppSidebar() {
   const pathname = usePathname();
   const activeHref = findNavItem(pathname)?.href;

   return (
      <Sidebar collapsible="icon">
         <SidebarHeader>
            <SidebarMenu>
               <SidebarMenuItem>
                  <SidebarMenuButton size="lg" render={<Link href="/" />}>
                     <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
                        CB
                     </div>
                     <div className="grid flex-1 text-left leading-tight">
                        <span className="truncate font-semibold">Colour Balloons</span>
                        <span className="truncate text-xs text-muted-foreground">MyanmarSar Hub Admin</span>
                     </div>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarHeader>

         <SidebarContent>
            {NAV_GROUPS.map((group) => (
               <SidebarGroup key={group.label}>
                  <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                  <SidebarGroupContent>
                     <SidebarMenu>
                        {group.items.map((item) => (
                           <SidebarMenuItem key={item.href}>
                              <SidebarMenuButton
                                 isActive={item.href === activeHref}
                                 tooltip={item.title}
                                 render={<Link href={item.href} />}
                              >
                                 <item.icon />
                                 <span>{item.title}</span>
                              </SidebarMenuButton>
                           </SidebarMenuItem>
                        ))}
                     </SidebarMenu>
                  </SidebarGroupContent>
               </SidebarGroup>
            ))}
         </SidebarContent>

         <SidebarRail />
      </Sidebar>
   );
}
