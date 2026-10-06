import type { ReactNode } from 'react';

interface EmptyStateProps {
   icon: ReactNode;
   title: string;
   description: string;
   action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
   return (
      <div className="flex flex-col items-center justify-center gap-5 p-5 text-center">
         {icon}
         <h2 className="w-full max-w-84 text-xl leading-6 font-bold tracking-[-0.5px]">{title}</h2>
         <p className="w-full max-w-84 text-sm text-muted-foreground">{description}</p>
         {action}
      </div>
   );
}
