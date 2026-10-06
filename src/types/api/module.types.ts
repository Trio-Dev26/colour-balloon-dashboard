// Shapes the admin screens need. Align with the NestJS DTOs (or generated Swagger types) when the API exists.

export type ModuleStatus = 'DRAFT' | 'PUBLISHED' | 'UNPUBLISHED';

/** Fixed system values (PRD D11): levels and categories. */
export interface Taxonomy {
   id: string;
   code: string;
   titleEn: string;
   titleMy: string;
}

export interface ModuleListItem {
   id: string;
   code: string;
   titleEn: string;
   titleMy: string;
   unitCount: number;
   level: Taxonomy;
   category: Taxonomy;
   status: ModuleStatus;
   updatedAt: string;
}

export interface ModuleDetail extends ModuleListItem {
   imageUrl: string | null;
   descriptionEn: string;
   descriptionMy: string;
   learningGoalEn: string;
   learningGoalMy: string;
   learningOutcomeEn: string;
   learningOutcomeMy: string;
}

export interface UnitSummary {
   id: string;
   order: number;
   code: string;
   titleEn: string;
   titleMy: string;
   lessonCount: number;
   updatedAt: string;
}

export interface ModuleFilters {
   search?: string;
   level?: string;
   category?: string;
   status?: string;
   page: number;
}
