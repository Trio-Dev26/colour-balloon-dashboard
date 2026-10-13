// Shapes of the NestJS module API (/admin/modules), plus the HTML form the screens work with.
import type { JSONContent } from '@tiptap/core';

// TODO(api): image (BR-16) and unit count (FR-CUR-001) are in the PRD but not in the API yet.
// Add them back here, then re-enable the hidden UI marked TODO(api).
export type ModuleStatus = 'DRAFT' | 'PUBLISHED' | 'UNPUBLISHED';

/** Fixed system values (PRD D11): levels and categories (GET /levels, GET /categories). */
export interface Taxonomy {
   id: string;
   code: string;
   titleEn: string;
   titleMy: string;
}

export interface ModuleListItem {
   id: string;
   /** Full code built by the API: LEVEL-CATEGORY-<suffix>, e.g. BEGINNER-READING-M01. */
   code: string;
   status: ModuleStatus;
   titleEn: string;
   titleMy: string;
   level: Taxonomy;
   category: Taxonomy;
   updatedAt: string;
}

/** Bilingual content. Rich-text fields are HTML here; the API stores them as TipTap JSON. */
export interface ModuleContent {
   titleEn: string;
   titleMy: string;
   descriptionEn: string;
   descriptionMy: string;
   learningGoalEn: string;
   learningGoalMy: string;
   learningOutcomeEn: string;
   learningOutcomeMy: string;
}

export type ModuleRichTextField = 'descriptionEn' | 'descriptionMy' | 'learningOutcomeEn' | 'learningOutcomeMy';

export interface ModuleDetail extends ModuleListItem, ModuleContent {}

/** A module as the API sends it: rich-text fields are TipTap JSON documents. */
export type ModuleResponse = Omit<ModuleDetail, ModuleRichTextField> & Record<ModuleRichTextField, JSONContent>;

/** GET /admin/modules */
export interface ModulePage {
   items: ModuleResponse[];
   total: number;
   page: number;
   limit: number;
}

/** Create / edit form data (HTML rich text); the service converts it to the API body. */
export interface ModulePayload extends ModuleContent {
   levelId: string;
   categoryId: string;
   /** Only the suffix ("M01"); the API adds the level and category prefix. */
   code: string;
}

export interface ModuleFilters {
   search?: string;
   status?: ModuleStatus;
   levelId?: string;
   categoryId?: string;
   page: number;
}

/** Lightweight module reference for pickers. */
export interface ModuleOption {
   id: string;
   code: string;
   titleEn: string;
}
