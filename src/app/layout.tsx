import type { Metadata } from 'next';
import { Inter, Noto_Sans_Myanmar } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const notoSansMyanmar = Noto_Sans_Myanmar({
   subsets: ['myanmar'],
   weight: ['400', '500', '600', '700'],
   variable: '--font-myanmar',
});

export const metadata: Metadata = {
   title: {
      default: 'Colour Balloons Admin',
      template: '%s · Colour Balloons Admin',
   },
   description: 'Admin dashboard for the MyanmarSar Hub learning platform',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
   return (
      <html lang="en" className={cn('h-full antialiased font-sans', inter.variable, notoSansMyanmar.variable)}>
         {/* Extensions like Grammarly add attributes to <body> before hydration. */}
         <body className="min-h-full flex flex-col" suppressHydrationWarning>
            <ReactQueryProvider>
               <TooltipProvider>{children}</TooltipProvider>
               {/* Light like the rest of the dashboard (no dark mode yet), whatever the OS theme is. */}
               <Toaster theme="light" richColors position="top-right" />
            </ReactQueryProvider>
         </body>
      </html>
   );
}
