import type { SelectOption, Tone } from '@/types/ui/common.types';
import type { ModuleStatus } from '@/types/api/module.types';

export const MODULE_STATUS: Record<ModuleStatus, { label: string; tone: Tone }> = {
   DRAFT: { label: 'Draft', tone: 'neutral' },
   PUBLISHED: { label: 'Published', tone: 'success' },
   UNPUBLISHED: { label: 'Unpublished', tone: 'warning' },
};

/** URL query keys the module list filters by (besides page); same names as the API query params. */
export const MODULE_FILTER_KEYS = ['search', 'levelId', 'categoryId', 'status'] as const;

/** Same rule as the API: the suffix of LEVEL-CATEGORY-<suffix>. */
export const MODULE_CODE_PATTERN = /^[A-Z0-9_]{1,10}$/;

export const MODULE_STATUS_OPTIONS: SelectOption[] = Object.entries(MODULE_STATUS).map(([value, { label }]) => ({
   value,
   label,
}));

const MEGABYTE = 1024 * 1024;

// BR-16: module images are JPG/PNG, max 20 MB.
export const MODULE_IMAGE = {
   mimeTypes: ['image/jpeg', 'image/png'],
   accept: 'image/jpeg,image/png',
   maxSizeBytes: 20 * MEGABYTE,
   dropzoneHint: 'Supported formats: JPG, PNG (Max 20 MB)',
   previewHint: 'JPG, PNG | Max 20 MB',
} as const;
