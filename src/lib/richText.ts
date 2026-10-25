import { generateHTML, generateJSON, type Extensions, type JSONContent } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { htmlToText } from './form';

/** Content extensions of the rich-text editor; the HTML ⇄ JSON conversion must use the same ones. */
export const RICH_TEXT_EXTENSIONS: Extensions = [
   // No horizontal rule: its "___ " shortcut would swallow fill-in-the-blank markers (D23); the toolbar never offers it.
   StarterKit.configure({ link: false, horizontalRule: false }),
   TextAlign.configure({ types: ['heading', 'paragraph'] }),
   TextStyleKit,
];

/** Editor HTML → TipTap JSON document (the format the API stores). Browser only. */
export const htmlToDoc = (html: string): JSONContent => generateJSON(html, RICH_TEXT_EXTENSIONS);

/** TipTap JSON document → editor HTML; an empty document becomes '' like an empty editor. */
export function docToHtml(doc: JSONContent): string {
   const html = generateHTML(doc, RICH_TEXT_EXTENSIONS);
   return htmlToText(html) ? html : '';
}
