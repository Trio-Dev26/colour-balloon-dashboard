// Shapes of the NestJS lesson API (/admin/lessons), plus the HTML form the screens work with.
import type { JSONContent } from '@tiptap/core';
import type { ModuleStatus, Taxonomy } from './module.types';

/** A lesson as the API sends it: descriptions are TipTap JSON documents. */
export interface LessonResponse {
   id: string;
   code: string;
   /** Unlock position within the unit, starting at 1. */
   sequence: number;
   titleEn: string;
   titleMy: string;
   descriptionEn: JSONContent;
   descriptionMy: JSONContent;
   unitId: string;
   unit: {
      id: string;
      code: string;
      sequence: number;
      titleEn: string;
      titleMy: string;
      module: {
         id: string;
         code: string;
         titleEn: string;
         titleMy: string;
         status: ModuleStatus;
         level: Taxonomy;
         category: Taxonomy;
      };
   };
   createdAt: string;
   updatedAt: string;
}

/** Row in the lesson list and in a unit's Lessons table. */
export interface LessonListItem {
   id: string;
   unitId: string;
   unitCode: string;
   moduleId: string;
   moduleCode: string;
   /** Decides what the lesson allows: delete, move, reorder (D18, D28). */
   moduleStatus: ModuleStatus;
   /** System-generated (L001), never changes (Decision Log D13). */
   code: string;
   /** Unlock position within the unit, starting at 1 (FR-CUR-006). */
   order: number;
   titleEn: string;
   titleMy: string;
   updatedAt: string;
}

export interface LessonDetail extends LessonListItem {
   descriptionEn: string;
   descriptionMy: string;
   level: Taxonomy;
   category: Taxonomy;
}

/** Create / edit body (HTML rich text); the service converts it to the API body. */
export interface LessonPayload {
   unitId: string;
   titleEn: string;
   titleMy: string;
   descriptionEn: string;
   descriptionMy: string;
}

export interface LessonFilters {
   search?: string;
   moduleId?: string;
   unitId?: string;
   page: number;
}
