// Shapes of the NestJS module API (/admin/modules), plus the HTML form the screens work with.
import type { JSONContent } from '@tiptap/core';

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
   /** System-generated (M001), never changes (Decision Log D13). */
   code: string;
   status: ModuleStatus;
   unitCount: number;
   titleEn: string;
   titleMy: string;
   level: Taxonomy;
   category: Taxonomy;
   /** Signed URL of the thumbnail (valid 1 hour), or null when the module has none. */
   thumbnailUrl: string | null;
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

/** Create / edit form data (HTML rich text); the service converts it to the API body. */
export interface ModulePayload extends ModuleContent {
   levelId: string;
   categoryId: string;
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
   status: ModuleStatus;
}
