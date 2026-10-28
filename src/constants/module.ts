import type { SelectOption, Tone } from '@/types/ui/common.types';
import type { ModuleStatus } from '@/types/api/module.types';

export const MODULE_STATUS: Record<ModuleStatus, { label: string; tone: Tone }> = {
   DRAFT: { label: 'Draft', tone: 'neutral' },
   PUBLISHED: { label: 'Published', tone: 'success' },
   UNPUBLISHED: { label: 'Unpublished', tone: 'warning' },
};

/** Colour of each curriculum code pill in breadcrumbs (M001, U001, L001). */
export const CURRICULUM_CODE_TONES = {
   module: 'warning',
   unit: 'primary',
   lesson: 'primary',
} as const satisfies Record<string, Tone>;

// Decision Log D17 (publishing), D18 (deleting) and D28 (moving, reordering); the API enforces the same rules.
export const MODULE_RULE_HINTS = {
   publishNeedsUnit: 'Add at least one unit before publishing this module.',
   publishNeedsLesson: 'Add at least one lesson to a unit before publishing this module.',
   deletePublished: 'This module has been published and can’t be deleted. Unpublish it instead.',
   // D28: units move between, and are reordered in, Draft modules only.
   unitMoveLocked: 'This unit’s module has been published, so the unit can’t move to another module.',
   reorderLocked: 'This module has been published, so its unit order is locked. New units are added at the end.',
   lessonMoveLocked: 'This lesson’s module has been published, so the lesson can’t move to another unit.',
   lessonReorderLocked:
      'This lesson’s module has been published, so the lesson order is locked. New lessons are added at the end.',
} as const;

/** Delete popup for a Draft module: everything in it is hidden too (D18). Deleted records are hidden, not erased (FR-CUR-012). */
export const moduleDeleteDescription = (unitCount: number, lessonCount: number) => {
   const count = (n: number, noun: string) => `${n} ${n === 1 ? noun : `${noun}s`}`;
   const what = unitCount
      ? `The module and its ${count(unitCount, 'unit')} and ${count(lessonCount, 'lesson')}`
      : 'The module';
   return `${what} will be hidden from admins and learners. This can’t be undone from the dashboard.`;
};

/** URL query keys the module list filters by (besides page); same names as the API query params. */
export const MODULE_FILTER_KEYS = ['search', 'levelId', 'categoryId', 'status'] as const;

export const MODULE_STATUS_OPTIONS: SelectOption[] = Object.entries(MODULE_STATUS).map(([value, { label }]) => ({
   value,
   label,
}));

const MEGABYTE = 1024 * 1024;

// BR-16: module images are JPG/PNG, max 20 MB.
export const MODULE_IMAGE = {
   /** Multipart field name the API reads the file from (PUT /admin/modules/:id/thumbnail). */
   uploadField: 'file',
   mimeTypes: ['image/jpeg', 'image/png'],
   accept: 'image/jpeg,image/png',
   maxSizeBytes: 20 * MEGABYTE,
   dropzoneHint: 'Supported formats: JPG, PNG (Max 20 MB)',
   previewHint: 'JPG, PNG | Max 20 MB',
} as const;
