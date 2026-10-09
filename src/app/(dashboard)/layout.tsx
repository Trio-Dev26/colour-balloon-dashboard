import type { CSSProperties } from 'react';
import { SessionGuard } from '@/components/auth/SessionGuard';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SIDEBAR_WIDTH } from '@/constants/layout';

export default function DashboardLayout({ children }: LayoutProps<'/'>) {
   return (
      <SidebarProvider style={{ '--sidebar-width': SIDEBAR_WIDTH } as CSSProperties}>
         <SessionGuard />
         <AppSidebar />
         {/* min-w-0: let wide tables scroll inside their container instead of widening the page. */}
         <SidebarInset className="min-w-0">{children}</SidebarInset>
      </SidebarProvider>
   );
}
