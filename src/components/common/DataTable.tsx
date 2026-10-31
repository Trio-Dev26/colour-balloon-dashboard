'use client';

import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { TruncatedText } from './TruncatedText';

export interface DataTableColumn<TRow> {
   id: string;
   /** Usually a label; a control such as a select-all checkbox also works. */
   header: ReactNode;
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
   /** Makes the whole row open this page (e.g. the detail page); controls inside the row keep their own clicks. */
   getRowHref?: (row: TRow) => string;
   /** Extra classes per row, e.g. to mute rows that can't be picked. */
   getRowClassName?: (row: TRow) => string | undefined;
}

const LOADING_ROW_COUNT = 5;

/** Clicks on these (row actions, switches, links, HintTooltip wrappers of disabled buttons) don't open the row. */
const ROW_CLICK_IGNORE = 'a, button, input, select, textarea, label, [role="switch"], [data-no-row-click]';

// ponytail: plain mapped table; switch to @tanstack/react-table when client-side sorting/selection is needed.
export function DataTable<TRow>({
   columns,
   rows,
   getRowId,
   emptyMessage,
   isLoading,
   getRowHref,
   getRowClassName,
}: DataTableProps<TRow>) {
   const router = useRouter();

   const openRow = (event: MouseEvent<HTMLTableRowElement>, href: string) => {
      const row = event.currentTarget;
      const target = event.target as Element;
      // React bubbles clicks out of portals (e.g. a delete dialog opened from this row): ignore those.
      if (!row.contains(target)) return;
      const control = target.closest(ROW_CLICK_IGNORE);
      if (control && control !== row && row.contains(control)) return;
      // Don't navigate when the user was selecting text.
      if (window.getSelection()?.toString()) return;
      if (event.metaKey || event.ctrlKey) window.open(href, '_blank', 'noopener');
      else router.push(href);
   };

   const openRowWithKeyboard = (event: KeyboardEvent<HTMLTableRowElement>, href: string) => {
      if (event.key === 'Enter' && event.target === event.currentTarget) router.push(href);
   };

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
               rows.map((row, index) => {
                  const href = getRowHref?.(row);
                  return (
                     <TableRow
                        key={getRowId(row)}
                        className={cn(
                           href && 'cursor-pointer focus-visible:bg-muted/50 focus-visible:outline-none',
                           getRowClassName?.(row)
                        )}
                        {...(href
                           ? {
                                tabIndex: 0,
                                onClick: (event: MouseEvent<HTMLTableRowElement>) => openRow(event, href),
                                onKeyDown: (event: KeyboardEvent<HTMLTableRowElement>) =>
                                   openRowWithKeyboard(event, href),
                             }
                           : {})}
                     >
                        {columns.map((column) => {
                           const content = column.cell(row, index);
                           return (
                              <TableCell key={column.id} className={cn('h-15 px-3 text-sm', column.className)}>
                                 {/* Plain text cells get "…" plus a tooltip when they don't fit the column. */}
                                 {typeof content === 'string' || typeof content === 'number' ? (
                                    <TruncatedText text={String(content)} />
                                 ) : (
                                    content
                                 )}
                              </TableCell>
                           );
                        })}
                     </TableRow>
                  );
               })
            )}
         </TableBody>
      </Table>
   );
}
