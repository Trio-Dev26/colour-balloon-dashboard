import { AppSidebar } from '@/components/layout/AppSidebar';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({ children }: LayoutProps<'/'>) {
   return (
      <SidebarProvider>
         <AppSidebar />
         <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col p-6">{children}</div>
         </SidebarInset>
      </SidebarProvider>
   );
}
