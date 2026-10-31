import { CardSection } from '@/components/common/CardSection';
import { hasEnglishVersion } from '@/constants/question';
import { formatDateTime } from '@/lib/format';
import { correctAnswerSummary } from '@/lib/questionAnswers';
import type { QuestionDetail } from '@/types/api/question.types';

// ANSWER card on the question detail page: the correct answer in one line, whether there's an explanation,
// and when the question was last changed.
const explanationLanguages = ({ explanationMy, explanationEn }: QuestionDetail) => {
   if (explanationMy && explanationEn) return 'Myanmar + English';
   if (explanationMy) return 'Myanmar';
   return explanationEn ? 'English' : 'None';
};

// Q24: English is an optional translation; fill in the blank is Myanmar only.
const englishStatus = ({ type, promptEn }: QuestionDetail) => {
   if (!hasEnglishVersion(type)) return 'Myanmar only';
   return promptEn ? 'Added' : 'Not added';
};

export function QuestionAnswerCard({ question }: { question: QuestionDetail }) {
   const rows = [
      { label: 'Correct answer', value: correctAnswerSummary(question) },
      { label: 'English translation', value: englishStatus(question) },
      { label: 'Explanation', value: explanationLanguages(question) },
      { label: 'Last updated', value: formatDateTime(question.updatedAt) },
   ];

   return (
      <CardSection title="Answer">
         <dl className="flex flex-col divide-y">
            {rows.map((row) => (
               <div key={row.label} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                  <dt className="text-sm text-muted-foreground">{row.label}</dt>
                  <dd className="min-w-0 truncate text-right text-sm font-semibold">{row.value}</dd>
               </div>
            ))}
         </dl>
      </CardSection>
   );
}
