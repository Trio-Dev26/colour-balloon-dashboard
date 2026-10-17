// Shapes of the NestJS unit API (/admin/units), plus the HTML form the screens work with.
import type { JSONContent } from '@tiptap/core';
import type { ModuleOption, Taxonomy } from './module.types';

/** A unit as the API sends it: descriptions are TipTap JSON documents. */
export interface UnitResponse {
   id: string;
   code: string;
   /** Unlock position within the module, starting at 1. */
   sequence: number;
   titleEn: string;
   titleMy: string;
   descriptionEn: JSONContent;
   descriptionMy: JSONContent;
   moduleId: string;
   module: ModuleOption & { titleMy: string };
   createdAt: string;
   updatedAt: string;
}

/** Row in the unit list and in a module's Units table. */
export interface UnitListItem {
   id: string;
   moduleId: string;
   moduleCode: string;
   /** System-generated (U001), never changes (Decision Log D13). */
   code: string;
   /** Unlock position within the module, starting at 1 (FR-CUR-006). */
   order: number;
   titleEn: string;
   titleMy: string;
   lessonCount: number;
   updatedAt: string;
}

export interface UnitDetail extends UnitListItem {
   descriptionEn: string;
   descriptionMy: string;
   module: {
      id: string;
      code: string;
      titleEn: string;
      level: Taxonomy;
      category: Taxonomy;
   };
}

/** Create / edit form data (HTML rich text); the service converts it to the API body. */
export interface UnitPayload {
   moduleId: string;
   titleEn: string;
   titleMy: string;
   descriptionEn: string;
   descriptionMy: string;
}

export interface UnitFilters {
   search?: string;
   moduleId?: string;
   page: number;
}
