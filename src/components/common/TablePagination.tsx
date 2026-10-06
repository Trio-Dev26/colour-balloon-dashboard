import { EllipsisIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPageItems } from '@/lib/pagination';
import { cn } from '@/lib/utils';

interface TablePaginationProps {
   page: number;
   pageCount: number;
   onPageChange: (page: number) => void;
}

export function TablePagination({ page, pageCount, onPageChange }: TablePaginationProps) {
   if (pageCount <= 1) return null;

   return (
      <nav aria-label="Pagination" className="flex items-center gap-2">
         <Button variant="ghost" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            Previous
         </Button>
         {getPageItems(page, pageCount).map((item, index) =>
            item === 'ellipsis' ? (
               <span key={`ellipsis-${index}`} className="flex size-8 items-center justify-center" aria-hidden>
                  <EllipsisIcon className="size-4" />
               </span>
            ) : (
               <Button
                  key={item}
                  variant="ghost"
                  aria-current={item === page ? 'page' : undefined}
                  className={cn('min-w-8 px-2.5', item === page && 'border-border bg-muted')}
                  onClick={() => onPageChange(item)}
               >
                  {item}
               </Button>
            )
         )}
         <Button variant="ghost" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
            Next
         </Button>
      </nav>
   );
}
