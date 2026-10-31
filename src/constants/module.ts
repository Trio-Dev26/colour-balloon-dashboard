import type { SelectOption, Tone } from '@/types/ui/common.types';
import type { ModuleListItem, ModuleStatus } from '@/types/api/module.types';

export const MODULE_STATUS: Record<ModuleStatus, { label: string; tone: Tone }> = {
   DRAFT: { label: 'Draft', tone: 'neutral' },
   PUBLISHED: { label: 'Published', tone: 'success' },
   UNPUBLISHED: { label: 'Unpublished', tone: 'warning' },
};

/** Colour of each curriculum code pill in breadcrumbs (M001, U001, L001, quiz and question codes). */
export const CURRICULUM_CODE_TONES = {
   module: 'warning',
   unit: 'primary',
   lesson: 'primary',
   quiz: 'primary',
   question: 'primary',
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

/** Shown on the edit pages of published content: there is no draft copy, so a save is live at once. */
export const LIVE_EDIT_NOTES = {
   module: 'This module is published. Saved changes show to learners straight away.',
   unit: 'This unit’s module is published. Saved changes show to learners straight away.',
   lesson: 'This lesson’s module is published. Saved changes show to learners straight away.',
} as const;

/** Delete popup for a Draft module: everything in it is hidden too (D18). Deleted records are hidden, not erased (FR-CUR-012). */
const count = (n: number, noun: string) => `${n} ${n === 1 ? noun : `${noun}s`}`;

type ModuleCounts = Pick<ModuleListItem, 'status' | 'unitCount' | 'lessonCount'>;

/** D17: publishing needs at least one unit with at least one lesson; undefined when publishing is allowed. */
export const modulePublishBlockedReason = (module: ModuleCounts) => {
   if (module.status === 'PUBLISHED') return undefined;
   if (module.unitCount === 0) return MODULE_RULE_HINTS.publishNeedsUnit;
   return module.lessonCount === 0 ? MODULE_RULE_HINTS.publishNeedsLesson : undefined;
};

/** Publish / unpublish confirmation text (D17). */
export const modulePublishDescription = (module: ModuleCounts) =>
   module.status === 'PUBLISHED'
      ? 'New students won’t be able to start this module. Students already in it keep their progress, and everything comes back when you publish it again.'
      : `Students and teachers will see this module with its ${count(module.unitCount, 'unit')} and ${count(module.lessonCount, 'lesson')}. A published module can’t go back to Draft or be deleted; you can unpublish it later.`;

/** D18: only a module that was never published can be deleted; undefined when deleting is allowed. */
export const moduleDeleteBlockedReason = (status: ModuleStatus) =>
   status === 'DRAFT' ? undefined : MODULE_RULE_HINTS.deletePublished;

export const moduleDeleteDescription = (unitCount: number, lessonCount: number) => {
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
