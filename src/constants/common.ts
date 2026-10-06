import type { LanguageCode } from '@/types/ui/common.types';

/** Shown wherever a value is missing. */
export const EMPTY_VALUE = '—';

export const DEFAULT_PAGE = 1;

/** Rows per page in admin tables. */
export const DEFAULT_PAGE_SIZE = 10;

export const LANGUAGES: { value: LanguageCode; label: string; className?: string }[] = [
   { value: 'en', label: 'English' },
   { value: 'my', label: 'မြန်မာ', className: 'font-myanmar' },
];
