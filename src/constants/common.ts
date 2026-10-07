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

/** Bilingual form fields are named <field>En / <field>My (e.g. titleEn, titleMy). */
export const LANGUAGE_FIELD_SUFFIX: Record<LanguageCode, 'En' | 'My'> = { en: 'En', my: 'My' };

/** Lower-case language names used in placeholders ("Module name in english"). */
export const LANGUAGE_NAME: Record<LanguageCode, string> = { en: 'english', my: 'myanmar' };
