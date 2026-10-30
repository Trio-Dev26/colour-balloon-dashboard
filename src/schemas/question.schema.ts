import { z } from 'zod';
import { ACCEPTED_ANSWER_SEPARATOR, BLANK_MARKER, QUESTION_LIMITS, QUESTION_TYPE_LABELS } from '@/constants/question';
import { htmlToText } from '@/lib/form';
import type { AnswerItem, QuestionDetail, QuestionPayload, QuestionType } from '@/types/api/question.types';
import type { QuestionPreviewData } from '@/types/ui/question.types';

const required = (message: string) => z.string().trim().min(1, message);
const ITEM_EMPTY = 'Add text or an image';

const mediaSchema = z.object({ id: z.string(), url: z.string() });
const itemSchema = z.object({ id: z.string().optional(), text: z.string(), image: mediaSchema.nullable() });
const QUESTION_TYPES = Object.keys(QUESTION_TYPE_LABELS) as [QuestionType, ...QuestionType[]];

export type AnswerItemValues = z.infer<typeof itemSchema>;

/** Blanks in a fill-in-the-blank prompt (D23). */
export const countBlanks = (promptHtml: string) => (htmlToText(promptHtml).match(BLANK_MARKER) ?? []).length;

/** Accepted answers of one blank, from the comma-separated form value (D23). */
export const splitAccepted = (value: string) =>
   value
      .split(ACCEPTED_ANSWER_SEPARATOR)
      .map((answer) => answer.trim())
      .filter(Boolean);

// FR-QB-002..007. The form keeps every type's answers, so switching type and back loses nothing;
// only the chosen type's answers are checked and sent.
export const questionFormSchema = z
   .object({
      moduleId: required('Choose a module'),
      unitId: required('Choose a unit'),
      type: z.enum(QUESTION_TYPES, 'Choose a question type'),
      prompt: z.string().refine((html) => htmlToText(html), 'Type the question'),
      promptImages: z.array(mediaSchema),
      points: z.string().refine((value) => {
         const points = Number(value);
         return Number.isInteger(points) && points >= QUESTION_LIMITS.minPoints && points <= QUESTION_LIMITS.maxPoints;
      }, `Points must be a whole number from ${QUESTION_LIMITS.minPoints} to ${QUESTION_LIMITS.maxPoints}`),
      explanation: z.string(),
      options: z.array(itemSchema.extend({ correct: z.boolean() })),
      trueFalse: z.enum(['true', 'false']).or(z.literal('')),
      blanks: z.array(z.object({ accepted: z.string() })),
      pairs: z.array(z.object({ id: z.string().optional(), left: itemSchema, right: itemSchema })),
      steps: z.array(itemSchema),
   })
   .superRefine((values, ctx) => {
      const issue = (path: (string | number)[], message: string) => ctx.addIssue({ code: 'custom', path, message });
      const isEmpty = (item: AnswerItemValues) => !item.text.trim() && !item.image;

      switch (values.type) {
         case 'MULTIPLE_CHOICE':
            values.options.forEach((option, i) => isEmpty(option) && issue(['options', i, 'text'], ITEM_EMPTY));
            if (values.options.filter((option) => option.correct).length !== 1) {
               issue(['options', 'root'], 'Mark exactly one option as correct');
            }
            break;
         case 'TRUE_FALSE':
            if (!values.trueFalse) issue(['trueFalse'], 'Choose the correct answer');
            break;
         case 'FILL_BLANK': {
            const count = countBlanks(values.prompt);
            if (count === 0) issue(['prompt'], 'Type ___ (three underscores) where each blank goes');
            values.blanks.slice(0, count).forEach((blank, i) => {
               if (splitAccepted(blank.accepted).length === 0)
                  issue(['blanks', i, 'accepted'], 'Add an accepted answer');
            });
            break;
         }
         case 'MATCHING':
            values.pairs.forEach((pair, i) => {
               if (isEmpty(pair.left)) issue(['pairs', i, 'left', 'text'], ITEM_EMPTY);
               if (isEmpty(pair.right)) issue(['pairs', i, 'right', 'text'], ITEM_EMPTY);
            });
            break;
         case 'SEQUENCE':
            values.steps.forEach((step, i) => isEmpty(step) && issue(['steps', i, 'text'], ITEM_EMPTY));
            break;
      }
   });

export type QuestionFormValues = z.infer<typeof questionFormSchema>;

const emptyItem = (): AnswerItemValues => ({ text: '', image: null });
export const emptyOption = () => ({ ...emptyItem(), correct: false });
export const emptyPair = () => ({ left: emptyItem(), right: emptyItem() });
export { emptyItem as emptyStep };

const minItems = <T>(make: () => T) => Array.from({ length: QUESTION_LIMITS.minItems }, make);

export const EMPTY_QUESTION_FORM: QuestionFormValues = {
   moduleId: '',
   unitId: '',
   type: 'MULTIPLE_CHOICE',
   prompt: '',
   promptImages: [],
   points: '1',
   explanation: '',
   options: minItems(emptyOption),
   trueFalse: '',
   blanks: [],
   pairs: minItems(emptyPair),
   steps: minItems(emptyItem),
};

/** Edit form starting values from the saved question; the other types keep their empty defaults. */
export function questionToFormValues(question: QuestionDetail): QuestionFormValues {
   const toImage = (mediaId?: string) => (mediaId ? { id: mediaId, url: question.mediaUrls[mediaId] ?? '' } : null);
   const toItem = ({ id, text, mediaId }: AnswerItem & { id?: string }) => ({
      id,
      text: text ?? '',
      image: toImage(mediaId),
   });
   const values: QuestionFormValues = {
      ...EMPTY_QUESTION_FORM,
      moduleId: question.moduleId,
      unitId: question.unitId,
      type: question.type,
      prompt: question.prompt,
      promptImages: question.promptMediaIds.map((id) => ({ id, url: question.mediaUrls[id] ?? '' })),
      points: String(question.points),
      explanation: question.explanation,
   };
   const { answers } = question;
   if ('options' in answers)
      values.options = answers.options.map(({ correct, ...item }) => ({ ...toItem(item), correct }));
   if ('correct' in answers) values.trueFalse = answers.correct ? 'true' : 'false';
   if ('blanks' in answers) {
      values.blanks = answers.blanks.map(({ accepted }) => ({
         accepted: accepted.join(`${ACCEPTED_ANSWER_SEPARATOR} `),
      }));
   }
   if ('pairs' in answers) {
      values.pairs = answers.pairs.map(({ id, left, right }) => ({ id, left: toItem(left), right: toItem(right) }));
   }
   if ('steps' in answers) values.steps = answers.steps.map(toItem);
   return values;
}

const toAnswerItem = ({ id, text, image }: AnswerItemValues) => ({
   ...(id && { id }),
   ...(text.trim() && { text: text.trim() }),
   ...(image && { mediaId: image.id }),
});

const toAnswers = (values: QuestionFormValues): QuestionPayload['answers'] => {
   switch (values.type) {
      case 'MULTIPLE_CHOICE':
         return { options: values.options.map((option) => ({ ...toAnswerItem(option), correct: option.correct })) };
      case 'TRUE_FALSE':
         return { correct: values.trueFalse === 'true' };
      case 'FILL_BLANK':
         return {
            blanks: values.blanks
               .slice(0, countBlanks(values.prompt))
               .map((blank) => ({ accepted: splitAccepted(blank.accepted) })),
         };
      case 'MATCHING':
         return {
            pairs: values.pairs.map(({ id, left, right }) => ({
               ...(id && { id }),
               left: toAnswerItem(left),
               right: toAnswerItem(right),
            })),
         };
      case 'SEQUENCE':
         return { steps: values.steps.map(toAnswerItem) };
   }
};

/** Id the live preview uses for its radio group; the form has no question id yet on create. */
const PREVIEW_ID = 'live-preview';

/**
 * The learner preview of the form as it is right now (it may still be incomplete or invalid).
 * Images come from the form's uploads; a fill-in-the-blank gets one answer box per `___` already typed.
 */
export function toQuestionPreview(values: QuestionFormValues): QuestionPreviewData {
   const items = [...values.options, ...values.steps, ...values.pairs.flatMap((pair) => [pair.left, pair.right])];
   const images = [...values.promptImages, ...items.flatMap((item) => (item.image ? [item.image] : []))];
   const answers: QuestionPayload['answers'] =
      values.type === 'FILL_BLANK'
         ? { blanks: Array.from({ length: countBlanks(values.prompt) }, () => ({ accepted: [] })) }
         : toAnswers(values);

   return {
      id: PREVIEW_ID,
      type: values.type,
      prompt: values.prompt,
      promptMediaIds: values.promptImages.map((image) => image.id),
      answers,
      points: Number(values.points) || 0,
      mediaUrls: Object.fromEntries(images.map((image) => [image.id, image.url])),
   };
}

/** The API body: the chosen type's answers, points as a number, an empty explanation left out. */
export const toQuestionPayload = (values: QuestionFormValues): QuestionPayload => ({
   unitId: values.unitId,
   type: values.type,
   prompt: values.prompt,
   promptMediaIds: values.promptImages.map((image) => image.id),
   answers: toAnswers(values),
   explanation: htmlToText(values.explanation) ? values.explanation : '',
   points: Number(values.points),
});
