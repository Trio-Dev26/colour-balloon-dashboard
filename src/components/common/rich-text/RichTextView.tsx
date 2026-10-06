'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';

// Read-only render of rich-text HTML. Goes through the Tiptap schema instead of
// dangerouslySetInnerHTML, so only known, safe formatting is ever rendered.
export function RichTextView({ html, className }: { html: string; className?: string }) {
   const editor = useEditor(
      {
         immediatelyRender: false,
         editable: false,
         extensions: [
            StarterKit.configure({ link: false }),
            TextAlign.configure({ types: ['paragraph'] }),
            TextStyleKit,
         ],
         content: html,
         editorProps: { attributes: { class: `tiptap-content outline-none ${className ?? ''}` } },
      },
      [html]
   );

   return <EditorContent editor={editor} />;
}
