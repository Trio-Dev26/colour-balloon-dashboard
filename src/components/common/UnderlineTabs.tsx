'use client';

import type { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export interface UnderlineTab<V extends string> {
   value: V;
   label: ReactNode;
   className?: string;
}

interface UnderlineTabsProps<V extends string> {
   tabs: UnderlineTab<V>[];
   /** Renders the panel for one tab. Panels stay mounted, so hidden tabs keep their state. */
   children: (value: V) => ReactNode;
   value?: V;
   onValueChange?: (value: V) => void;
   className?: string;
   panelClassName?: string;
}

// Tabs with a primary underline on the active one (language tabs, lesson file audiences).
export function UnderlineTabs<V extends string>({
   tabs,
   children,
   value,
   onValueChange,
   className,
   panelClassName,
}: UnderlineTabsProps<V>) {
   return (
      <Tabs
         defaultValue={tabs[0].value}
         value={value}
         onValueChange={(next: V) => onValueChange?.(next)}
         className={cn('gap-3', className)}
      >
         <TabsList variant="line" className="h-auto w-full justify-start gap-0 rounded-none border-b p-0">
            {tabs.map((tab) => (
               <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                     'min-w-20 flex-none px-3 py-2 text-sm font-normal text-muted-foreground data-active:font-medium data-active:text-accent-foreground',
                     'group-data-horizontal/tabs:after:bottom-[-1px] after:h-0.5 after:rounded-t-xs after:bg-primary',
                     tab.className
                  )}
               >
                  {tab.label}
               </TabsTrigger>
            ))}
         </TabsList>
         {tabs.map((tab) => (
            <TabsContent
               key={tab.value}
               value={tab.value}
               keepMounted
               className={cn('data-hidden:hidden', panelClassName)}
            >
               {children(tab.value)}
            </TabsContent>
         ))}
      </Tabs>
   );
}
