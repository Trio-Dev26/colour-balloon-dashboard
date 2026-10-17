import type { SelectOption, Tone } from '@/types/ui/common.types';
import type { ModuleStatus } from '@/types/api/module.types';

export const MODULE_STATUS: Record<ModuleStatus, { label: string; tone: Tone }> = {
   DRAFT: { label: 'Draft', tone: 'neutral' },
   PUBLISHED: { label: 'Published', tone: 'success' },
   UNPUBLISHED: { label: 'Unpublished', tone: 'warning' },
};

// Decision Log D17 (publishing) and D18 (deleting); the API enforces the same rules.
export const MODULE_RULE_HINTS = {
   publishNeedsUnit: 'Add at least one unit before publishing this module.',
   deletePublished: 'This module has been published and can’t be deleted. Unpublish it instead.',
} as const;

/** Delete popup for a Draft module: everything in it is hidden too (D18). Deleted records are hidden, not erased (FR-CUR-012). */
export const moduleDeleteDescription = (unitCount: number) => {
   const what = unitCount
      ? `The module and its ${unitCount} ${unitCount === 1 ? 'unit' : 'units'}, with all their lessons,`
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
   mimeTypes: ['image/jpeg', 'image/png'],
   accept: 'image/jpeg,image/png',
   maxSizeBytes: 20 * MEGABYTE,
   dropzoneHint: 'Supported formats: JPG, PNG (Max 20 MB)',
   previewHint: 'JPG, PNG | Max 20 MB',
} as const;
