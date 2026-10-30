import type { QuestionDetail } from '@/types/api/question.types';

/** What the learner preview needs: a saved question, or the create/edit form while it's being filled in. */
export type QuestionPreviewData = Pick<
   QuestionDetail,
   'id' | 'type' | 'prompt' | 'promptMediaIds' | 'answers' | 'points' | 'mediaUrls'
>;
