'use client';

import type { ReactNode } from 'react';
import type { Editor } from '@tiptap/react';
import { ArrowUpDownIcon, BaselineIcon, ListIcon } from 'lucide-react';
import { EDITOR_HIGHLIGHT_COLORS, EDITOR_LINE_HEIGHTS, EDITOR_TEXT_COLORS } from '@/constants/editor';
import { ALIGN_ACTIONS, HISTORY_ACTIONS, INDENT_ACTIONS, MARK_ACTIONS, type ToolbarAction } from './toolbarActions';
import { ToolbarButton } from './ToolbarButton';
import { ToolbarColorPicker } from './ToolbarColorPicker';
import { ToolbarMenu } from './ToolbarMenu';

function ActionButtons({ editor, actions }: { editor: Editor; actions: ToolbarAction[] }) {
   return actions.map((action) => (
      <ToolbarButton
         key={action.id}
         aria-label={action.label}
         title={action.label}
         active={action.isActive?.(editor)}
         disabled={action.isDisabled?.(editor)}
         onClick={() => action.run(editor)}
      >
         <action.icon />
      </ToolbarButton>
   ));
}

export function RichTextToolbar({ editor, extra }: { editor: Editor; extra?: ReactNode }) {
   const chain = () => editor.chain().focus();

   return (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-0.5 py-2" role="toolbar" aria-label="Formatting">
         <div className="flex items-center gap-3">
            <ActionButtons editor={editor} actions={HISTORY_ACTIONS} />
         </div>
         <div className="flex items-center gap-3">
            <ActionButtons editor={editor} actions={MARK_ACTIONS} />
            <ToolbarColorPicker
               label="Highlight colour"
               icon={<span className="size-3.5 rounded-sm bg-primary" />}
               colors={EDITOR_HIGHLIGHT_COLORS}
               onSelect={(color) => (color ? chain().setBackgroundColor(color) : chain().unsetBackgroundColor()).run()}
            />
            <ToolbarColorPicker
               label="Text colour"
               icon={<BaselineIcon />}
               colors={EDITOR_TEXT_COLORS}
               onSelect={(color) => (color ? chain().setColor(color) : chain().unsetColor()).run()}
            />
         </div>
         <div className="flex items-center gap-4">
            <ToolbarMenu
               label="List"
               caret
               icon={<ListIcon />}
               options={[
                  {
                     label: 'Bullet list',
                     active: editor.isActive('bulletList'),
                     onSelect: () => chain().toggleBulletList().run(),
                  },
                  {
                     label: 'Numbered list',
                     active: editor.isActive('orderedList'),
                     onSelect: () => chain().toggleOrderedList().run(),
                  },
               ]}
            />
            <div className="flex items-center gap-3">
               <ActionButtons editor={editor} actions={ALIGN_ACTIONS} />
            </div>
            <div className="flex items-center gap-3">
               <ToolbarMenu
                  label="Line spacing"
                  icon={<ArrowUpDownIcon />}
                  options={EDITOR_LINE_HEIGHTS.map((lineHeight) => ({
                     label: lineHeight,
                     onSelect: () => chain().setLineHeight(lineHeight).run(),
                  }))}
               />
               <ActionButtons editor={editor} actions={INDENT_ACTIONS} />
            </div>
         </div>
         {extra}
      </div>
   );
}
