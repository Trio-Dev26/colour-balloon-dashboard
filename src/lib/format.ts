const BYTES_PER_KB = 1024;
const SIZE_UNITS = ['B', 'KB', 'MB', 'GB'];

/** 2621440 → "2.5 MB" */
export function formatFileSize(bytes: number): string {
   let size = bytes;
   let unit = 0;
   while (size >= BYTES_PER_KB && unit < SIZE_UNITS.length - 1) {
      size /= BYTES_PER_KB;
      unit += 1;
   }
   return `${Number(size.toFixed(1))} ${SIZE_UNITS[unit]}`;
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

/** ISO date → "12 AUG 2027 12:22PM" (Figma table format). */
export function formatDateTime(iso: string): string {
   const date = new Date(iso);
   const time = timeFormatter.format(date).replace(' ', '');
   return `${dateFormatter.format(date)} ${time}`.toUpperCase();
}

/** 1 → "01" (unit number badge). */
export const padNumber = (value: number) => String(value).padStart(2, '0');
