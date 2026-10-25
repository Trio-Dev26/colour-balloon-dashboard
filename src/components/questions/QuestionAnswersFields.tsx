'use client';

import type { ComponentType } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { QuestionFormValues } from '@/schemas/question.schema';
import type { QuestionType } from '@/types/api/question.types';
import { FillBlankAnswers } from './FillBlankAnswers';
import { MatchingAnswers } from './MatchingAnswers';
import { MultipleChoiceAnswers } from './MultipleChoiceAnswers';
import { SequenceAnswers } from './SequenceAnswers';
import { TrueFalseAnswer } from './TrueFalseAnswer';

const ANSWER_FIELDS: Record<QuestionType, ComponentType> = {
   MULTIPLE_CHOICE: MultipleChoiceAnswers,
   TRUE_FALSE: TrueFalseAnswer,
   FILL_BLANK: FillBlankAnswers,
   MATCHING: MatchingAnswers,
   SEQUENCE: SequenceAnswers,
};

// The answers editor for the chosen question type (Decision Log D22, D23).
export function QuestionAnswersFields() {
   const { control } = useFormContext<QuestionFormValues>();
   const type = useWatch({ control, name: 'type' });
   const Fields = ANSWER_FIELDS[type];

   return <Fields />;
}
