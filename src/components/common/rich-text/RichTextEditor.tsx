'use client';

import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { Placeholder } from '@tiptap/extensions';
import { RICH_TEXT_EXTENSIONS } from '@/lib/richText';
import { cn } from '@/lib/utils';
import { RichTextToolbar } from './RichTextToolbar';

interface RichTextEditorProps {
   /** HTML content. */
   value: string;
   onChange: (html: string) => void;
   placeholder?: string;
   invalid?: boolean;
   id?: string;
}

export function RichTextEditor({ value, onChange, placeholder, invalid, id }: RichTextEditorProps) {
   const editor = useEditor({
      immediatelyRender: false, // Next.js SSR: render the editor on the client only
      shouldRerenderOnTransaction: true, // keep toolbar active states in sync
      extensions: [...RICH_TEXT_EXTENSIONS, Placeholder.configure({ placeholder })],
      content: value,
      editorProps: {
         attributes: {
            ...(id && { id }),
            'aria-invalid': String(Boolean(invalid)),
            class: 'tiptap-content min-h-28 py-2 text-sm outline-none',
         },
      },
      onUpdate: ({ editor: current }) => onChange(current.isEmpty ? '' : current.getHTML()),
   });

   // Keep the editor in sync when the form value changes from outside (e.g. form reset).
   useEffect(() => {
      if (!editor || editor.isFocused) return;
      const current = editor.isEmpty ? '' : editor.getHTML();
      if (current !== value) editor.commands.setContent(value, { emitUpdate: false });
   }, [editor, value]);

   return (
      <div
         className={cn(
            'flex h-47 min-h-36 resize-y flex-col overflow-hidden rounded-lg border px-4 py-1 shadow-xs focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
            invalid && 'border-destructive ring-3 ring-destructive/20'
         )}
      >
         {editor && <RichTextToolbar editor={editor} />}
         <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
      </div>
   );
}
