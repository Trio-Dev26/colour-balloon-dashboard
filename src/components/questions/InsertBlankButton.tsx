'use client';

import type { Editor } from '@tiptap/react';
import { RectangleEllipsisIcon } from 'lucide-react';
import { ToolbarButton } from '@/components/common/rich-text/ToolbarButton';
import { insertBlank } from '@/lib/blankChips';

// "Insert blank" at the end of the question toolbar (fill in the blank, D23): adds ___ at the cursor.
export function InsertBlankButton({ editor }: { editor: Editor }) {
   return (
      <ToolbarButton
         className="gap-1.5 bg-accent px-2 text-xs font-medium text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground [&_svg]:size-4"
         onClick={() => insertBlank(editor.view)}
      >
         <RectangleEllipsisIcon />
         Insert blank
      </ToolbarButton>
   );
}
