import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet, type EditorView } from '@tiptap/pm/view';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { BLANK_MARKER } from '@/constants/question';

/** Class the editor CSS turns into a numbered chip (globals.css, `.blank-chip`). */
const BLANK_CHIP_CLASS = 'blank-chip';
const BLANK_TEXT = '___';

/** Marks every ___ run in the document; the text itself stays ___ (D23), only its look changes. */
function blankDecorations(doc: ProseMirrorNode): DecorationSet {
   const decorations: Decoration[] = [];
   doc.descendants((node, pos) => {
      if (!node.isText || !node.text) return;
      for (const match of node.text.matchAll(BLANK_MARKER)) {
         const from = pos + (match.index ?? 0);
         decorations.push(Decoration.inline(from, from + match[0].length, { class: BLANK_CHIP_CLASS }));
      }
   });
   return DecorationSet.create(doc, decorations);
}

/**
 * Fill-in-the-blank editor: each ___ shows as a numbered chip (1, 2, …) in reading order, matching the
 * answer rows below. Numbering is a CSS counter, so it follows edits without extra state.
 */
export const BlankChips = Extension.create({
   name: 'blankChips',
   addProseMirrorPlugins() {
      return [
         new Plugin({
            key: new PluginKey('blankChips'),
            props: { decorations: (state) => blankDecorations(state.doc) },
         }),
      ];
   },
});

/**
 * Inserts a blank at the cursor. Spaces are added only next to other underscores, which would otherwise
 * merge into one longer run and count as a single blank.
 */
export function insertBlank(view: EditorView) {
   const { from, to } = view.state.selection;
   const before = from > 0 ? view.state.doc.textBetween(from - 1, from) : '';
   const after = view.state.doc.textBetween(to, Math.min(to + 1, view.state.doc.content.size));
   const text = `${before === '_' ? ' ' : ''}${BLANK_TEXT}${after === '_' ? ' ' : ''}`;
   view.dispatch(view.state.tr.insertText(text, from, to).scrollIntoView());
   view.focus();
}
