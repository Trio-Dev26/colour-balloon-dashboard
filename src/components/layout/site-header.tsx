'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ChevronsUpDownIcon, LogOutIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { findNavItem } from '@/config/nav';

export function SiteHeader() {
   const pathname = usePathname();
   const router = useRouter();
   const title = findNavItem(pathname)?.title ?? 'Dashboard';

   // TODO(auth): call POST /api/auth/logout once the backend endpoint exists.
   const handleLogout = () => router.push('/login');

   return (
      <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
         <SidebarTrigger className="-ml-1" />
         <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
         <h1 className="text-sm font-medium">{title}</h1>

         <div className="ml-auto">
            <DropdownMenu>
               <DropdownMenuTrigger render={<Button variant="ghost" className="h-9 gap-2 px-2" />}>
                  <Avatar className="size-7">
                     <AvatarFallback className="text-xs">AD</AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm sm:inline">Admin</span>
                  <ChevronsUpDownIcon className="size-4 text-muted-foreground" />
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuGroup>
                     <DropdownMenuLabel>Signed in as Admin</DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                     <LogOutIcon />
                     Log out
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </header>
   );
}
