'use client';

import Link from 'next/link';
import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useQuestion } from '@/hooks/useQuestions';

// Header button on the question preview page; hidden while loading or when the question doesn't exist.
export function QuestionPreviewActions({ questionId }: { questionId: string }) {
   const { data: question } = useQuestion(questionId);
   if (!question) return null;

   return (
      <Button
         size="lg"
         className="font-semibold"
         nativeButton={false}
         render={<Link href={ROUTES.editQuestion(questionId)} />}
      >
         <PencilIcon />
         Edit question
      </Button>
   );
}
