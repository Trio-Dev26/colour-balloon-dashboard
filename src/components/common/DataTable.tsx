import type { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

export interface DataTableColumn<TRow> {
   id: string;
   header: string;
   cell: (row: TRow, index: number) => ReactNode;
   /** Width and alignment classes applied to both header and cells, e.g. 'w-[300px]'. */
   className?: string;
}

interface DataTableProps<TRow> {
   columns: DataTableColumn<TRow>[];
   rows: TRow[];
   getRowId: (row: TRow) => string;
   emptyMessage: string;
   /** Shows placeholder rows on the first load. */
   isLoading?: boolean;
}

const LOADING_ROW_COUNT = 5;

// ponytail: plain mapped table; switch to @tanstack/react-table when client-side sorting/selection is needed.
export function DataTable<TRow>({ columns, rows, getRowId, emptyMessage, isLoading }: DataTableProps<TRow>) {
   return (
      <Table className="table-fixed">
         <TableHeader>
            <TableRow className="border-b bg-muted hover:bg-muted">
               {columns.map((column) => (
                  <TableHead
                     key={column.id}
                     className={cn(
                        'h-10 px-3 text-xs font-semibold text-tertiary-foreground uppercase',
                        column.className
                     )}
                  >
                     {column.header}
                  </TableHead>
               ))}
            </TableRow>
         </TableHeader>
         <TableBody>
            {isLoading ? (
               Array.from({ length: LOADING_ROW_COUNT }, (_, rowIndex) => (
                  <TableRow key={rowIndex}>
                     {columns.map((column) => (
                        <TableCell key={column.id} className={cn('h-15 px-3', column.className)}>
                           <Skeleton className="h-4 w-3/4" />
                        </TableCell>
                     ))}
                  </TableRow>
               ))
            ) : rows.length === 0 ? (
               <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-sm text-muted-foreground">
                     {emptyMessage}
                  </TableCell>
               </TableRow>
            ) : (
               rows.map((row, index) => (
                  <TableRow key={getRowId(row)}>
                     {columns.map((column) => (
                        <TableCell key={column.id} className={cn('h-15 px-3 text-sm', column.className)}>
                           {column.cell(row, index)}
                        </TableCell>
                     ))}
                  </TableRow>
               ))
            )}
         </TableBody>
      </Table>
   );
}
