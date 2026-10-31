import { countLabel } from '@/lib/format';
import { CHOICE_LETTERS, TRUE_FALSE_CHOICES } from '@/constants/question';
import type { QuestionAnswersByType, QuestionDetail } from '@/types/api/question.types';

/** How many answer parts a question has (blanks, pairs, steps…); used for D22 partial points. */
export function answerPartCount(question: Pick<QuestionDetail, 'type' | 'answers'>): number {
   const { answers } = question;
   if ('blanks' in answers) return answers.blanks.length;
   if ('pairs' in answers) return answers.pairs.length;
   if ('steps' in answers) return answers.steps.length;
   return 1;
}

/** One line for the "Correct answer" row: "B · က", "A · True", "2 blanks", "3 pairs in order"… */
export function correctAnswerSummary(question: Pick<QuestionDetail, 'type' | 'answers'>): string {
   switch (question.type) {
      case 'MULTIPLE_CHOICE': {
         const { options } = question.answers as QuestionAnswersByType['MULTIPLE_CHOICE'];
         const index = options.findIndex((option) => option.correct);
         if (index < 0) return '—';
         return `${CHOICE_LETTERS[index]} · ${options[index].text || 'Picture'}`;
      }
      case 'TRUE_FALSE': {
         const { correct } = question.answers as QuestionAnswersByType['TRUE_FALSE'];
         const choice = TRUE_FALSE_CHOICES[correct ? 0 : 1];
         return `${choice.letter} · ${choice.label}`;
      }
      case 'FILL_BLANK':
         return countLabel(answerPartCount(question), 'blank');
      case 'MATCHING':
         return countLabel(answerPartCount(question), 'pair');
      case 'SEQUENCE':
         return `${countLabel(answerPartCount(question), 'step')} in order`;
   }
}
