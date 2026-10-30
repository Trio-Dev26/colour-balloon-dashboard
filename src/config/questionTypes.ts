import {
   GitCompareArrowsIcon,
   LetterTextIcon,
   ListOrderedIcon,
   SplitIcon,
   SquareCheckBigIcon,
   type LucideIcon,
} from 'lucide-react';
import type { QuestionType } from '@/types/api/question.types';

export interface QuestionTypeCard {
   type: QuestionType;
   /** Short card title (the design's wording; lists keep QUESTION_TYPE_LABELS). */
   label: string;
   icon: LucideIcon;
   /** What the learner does, in one line. */
   description: string;
}

// The question type picker on the question form (FR-QB-002), in the same order as the type list.
export const QUESTION_TYPE_CARDS: QuestionTypeCard[] = [
   {
      type: 'MULTIPLE_CHOICE',
      label: 'Multiple choice',
      icon: SplitIcon,
      description: 'One correct answer from several options.',
   },
   {
      type: 'TRUE_FALSE',
      label: 'True or False',
      icon: SquareCheckBigIcon,
      description: 'A single statement to judge.',
   },
   { type: 'FILL_BLANK', label: 'Fill blank', icon: LetterTextIcon, description: 'Type the missing word.' },
   {
      type: 'MATCHING',
      label: 'Matching',
      icon: GitCompareArrowsIcon,
      description: 'Pair items across two columns.',
   },
   {
      type: 'SEQUENCE',
      label: 'Sequence',
      icon: ListOrderedIcon,
      description: 'Arrange the items in the right order.',
   },
];
