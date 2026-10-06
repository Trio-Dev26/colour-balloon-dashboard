import type { SelectOption, Tone } from '@/types/ui/common.types';
import type { ModuleStatus } from '@/types/api/module.types';

export const MODULE_STATUS: Record<ModuleStatus, { label: string; tone: Tone }> = {
   DRAFT: { label: 'Draft', tone: 'neutral' },
   PUBLISHED: { label: 'Published', tone: 'success' },
   UNPUBLISHED: { label: 'Unpublished', tone: 'warning' },
};

/** URL query keys the module list filters by (besides page). */
export const MODULE_FILTER_KEYS = ['search', 'level', 'category', 'status'] as const;

export const MODULE_STATUS_OPTIONS: SelectOption[] = Object.entries(MODULE_STATUS).map(([value, { label }]) => ({
   value,
   label,
}));

// TODO(api): levels and categories are fixed system values (PRD D11) but the final list is still
// open (PRD Q17). Replace these with the seeded values from the API once the backend provides them.
export const MODULE_LEVEL_OPTIONS: SelectOption[] = [
   { value: 'FOUNDATION', label: 'Foundation' },
   { value: 'BEGINNER', label: 'Beginner' },
   { value: 'ELEMENTARY', label: 'Elementary' },
   { value: 'INTERMEDIATE', label: 'Intermediate' },
   { value: 'PROFESSIONAL', label: 'Professional' },
];

export const MODULE_CATEGORY_OPTIONS: SelectOption[] = [
   { value: 'MAIN_LESSON', label: 'Main Lesson' },
   { value: 'READING', label: 'Reading' },
   { value: 'WRITING', label: 'Writing' },
   { value: 'SPEAKING', label: 'Speaking' },
   { value: 'GRAMMAR', label: 'Grammar' },
   { value: 'POETRY', label: 'Poetry' },
];

const MEGABYTE = 1024 * 1024;

// BR-16: module images are JPG/PNG, max 20 MB.
export const MODULE_IMAGE = {
   mimeTypes: ['image/jpeg', 'image/png'],
   accept: 'image/jpeg,image/png',
   maxSizeBytes: 20 * MEGABYTE,
   dropzoneHint: 'Supported formats: JPG, PNG (Max 20 MB)',
   previewHint: 'JPG, PNG | Max 20 MB',
} as const;
