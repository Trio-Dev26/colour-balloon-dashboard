import type { QuestionDetail } from '@/types/api/question.types';

/** What the learner preview needs: a saved question, or the create/edit form while it's being filled in. */
export type QuestionPreviewData = Pick<
   QuestionDetail,
   'id' | 'type' | 'promptMediaIds' | 'answers' | 'points' | 'mediaUrls'
> & {
   /** HTML of the prompt in the language being shown. */
   prompt: string;
};
