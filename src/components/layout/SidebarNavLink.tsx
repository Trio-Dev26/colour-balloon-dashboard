import Link from 'next/link';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { isActivePath, type NavLink } from '@/config/nav';

interface SidebarNavLinkProps {
   link: NavLink;
   pathname: string;
}

export function SidebarNavLink({ link, pathname }: SidebarNavLinkProps) {
   return (
      <SidebarMenuItem>
         <SidebarMenuButton
            isActive={isActivePath(pathname, link.href)}
            className="px-3 text-xs font-medium"
            render={<Link href={link.href} />}
         >
            <link.icon />
            <span>{link.title}</span>
         </SidebarMenuButton>
      </SidebarMenuItem>
   );
}
