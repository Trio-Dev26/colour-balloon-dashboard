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
/** "1 lesson", "0 lessons". */
export const countLabel = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`;

export function formatDateTime(iso: string): string {
   const date = new Date(iso);
   const time = timeFormatter.format(date).replace(' ', '');
   return `${dateFormatter.format(date)} ${time}`.toUpperCase();
}

const relativeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const RELATIVE_STEPS: [unit: Intl.RelativeTimeFormatUnit, seconds: number][] = [
   ['year', 31_536_000],
   ['month', 2_592_000],
   ['week', 604_800],
   ['day', 86_400],
   ['hour', 3_600],
   ['minute', 60],
];

/** ISO date → "3 hours ago", "yesterday", "now". */
export function formatRelativeTime(iso: string): string {
   const seconds = (new Date(iso).getTime() - Date.now()) / 1000;
   const step = RELATIVE_STEPS.find(([, size]) => Math.abs(seconds) >= size);
   return step
      ? relativeFormatter.format(Math.round(seconds / step[1]), step[0])
      : relativeFormatter.format(0, 'second');
}

/** 1 → "01" (unit number badge). */
export const padNumber = (value: number) => String(value).padStart(2, '0');
