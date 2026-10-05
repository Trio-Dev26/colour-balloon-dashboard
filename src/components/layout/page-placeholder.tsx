import { ConstructionIcon } from 'lucide-react';

// Temporary body for routes whose screens are not built yet. Delete once every page is real.
export function PagePlaceholder({ title, description }: { title: string; description: string }) {
   return (
      <div className="flex flex-1 flex-col gap-6">
         <div>
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
         </div>
         <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-12 text-center">
            <ConstructionIcon className="size-8 text-muted-foreground" />
            <p className="text-sm font-medium">Screen not built yet</p>
            <p className="text-sm text-muted-foreground">This page will be implemented from the Figma design.</p>
         </div>
      </div>
   );
}
