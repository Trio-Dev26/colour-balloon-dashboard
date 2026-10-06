import Link from 'next/link';
import { ChevronDownIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { isActivePath, type NavGroup } from '@/config/nav';

interface SidebarNavGroupProps {
   group: NavGroup;
   pathname: string;
}

export function SidebarNavGroup({ group, pathname }: SidebarNavGroupProps) {
   return (
      <Collapsible defaultOpen render={<SidebarMenuItem />}>
         <CollapsibleTrigger render={<SidebarMenuButton className="group/trigger px-3 text-xs font-medium" />}>
            <group.icon />
            <span className="truncate">{group.title}</span>
            <ChevronDownIcon className="ml-auto -rotate-90 transition-transform group-data-panel-open/trigger:rotate-0" />
         </CollapsibleTrigger>
         <CollapsibleContent>
            <SidebarMenuSub className="mr-0 gap-0 pr-0">
               {group.children.map((child) => (
                  <SidebarMenuSubItem key={child.href} className="py-1">
                     <SidebarMenuSubButton
                        size="sm"
                        isActive={isActivePath(pathname, child.href)}
                        className="h-6 gap-1 rounded-md px-1 font-medium [&>svg]:text-current"
                        render={<Link href={child.href} />}
                     >
                        <child.icon />
                        <span>{child.title}</span>
                     </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
               ))}
            </SidebarMenuSub>
         </CollapsibleContent>
      </Collapsible>
   );
}
