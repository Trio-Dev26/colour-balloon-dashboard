import { Skeleton } from '@/components/ui/skeleton';
import { DialogTitle } from '@/components/ui/dialog';

interface DialogLoadStateProps {
   /** Accessible dialog title while there is no form yet, e.g. "Edit Unit". */
   title: string;
   isLoading: boolean;
   /** Shown when the record is gone (deleted meanwhile). */
   missingMessage: string;
}

// Body of an edit dialog while its record loads, or when the record no longer exists.
export function DialogLoadState({ title, isLoading, missingMessage }: DialogLoadStateProps) {
   return (
      <div className="flex flex-col gap-4 p-6" aria-busy={isLoading}>
         <DialogTitle className="text-2xl leading-7.5 font-bold tracking-[-0.5px]">{title}</DialogTitle>
         {isLoading ? (
            <>
               <Skeleton className="h-9 w-full" />
               <Skeleton className="h-9 w-full" />
               <Skeleton className="h-38 w-full" />
            </>
         ) : (
            <p className="text-sm text-muted-foreground">{missingMessage}</p>
         )}
      </div>
   );
}
