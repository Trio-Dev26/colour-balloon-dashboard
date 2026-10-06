import type { Editor } from '@tiptap/react';
import {
   AlignCenterIcon,
   AlignJustifyIcon,
   AlignLeftIcon,
   AlignRightIcon,
   BoldIcon,
   IndentDecreaseIcon,
   IndentIncreaseIcon,
   ItalicIcon,
   Redo2Icon,
   RemoveFormattingIcon,
   StrikethroughIcon,
   UnderlineIcon,
   Undo2Icon,
   type LucideIcon,
} from 'lucide-react';

export interface ToolbarAction {
   id: string;
   label: string;
   icon: LucideIcon;
   run: (editor: Editor) => void;
   isActive?: (editor: Editor) => boolean;
   isDisabled?: (editor: Editor) => boolean;
}

const align = (value: 'left' | 'center' | 'right' | 'justify', label: string, icon: LucideIcon): ToolbarAction => ({
   id: `align-${value}`,
   label,
   icon,
   run: (editor) => editor.chain().focus().setTextAlign(value).run(),
   isActive: (editor) => editor.isActive({ textAlign: value }),
});

const mark = (name: 'bold' | 'italic' | 'underline' | 'strike', label: string, icon: LucideIcon): ToolbarAction => ({
   id: name,
   label,
   icon,
   run: (editor) => editor.chain().focus().toggleMark(name).run(),
   isActive: (editor) => editor.isActive(name),
});

export const HISTORY_ACTIONS: ToolbarAction[] = [
   {
      id: 'undo',
      label: 'Undo',
      icon: Undo2Icon,
      run: (editor) => editor.chain().focus().undo().run(),
      isDisabled: (editor) => !editor.can().undo(),
   },
   {
      id: 'redo',
      label: 'Redo',
      icon: Redo2Icon,
      run: (editor) => editor.chain().focus().redo().run(),
      isDisabled: (editor) => !editor.can().redo(),
   },
];

export const MARK_ACTIONS: ToolbarAction[] = [
   mark('bold', 'Bold', BoldIcon),
   mark('italic', 'Italic', ItalicIcon),
   mark('underline', 'Underline', UnderlineIcon),
   mark('strike', 'Strikethrough', StrikethroughIcon),
];

export const ALIGN_ACTIONS: ToolbarAction[] = [
   align('left', 'Align left', AlignLeftIcon),
   align('center', 'Align center', AlignCenterIcon),
   align('right', 'Align right', AlignRightIcon),
   align('justify', 'Justify', AlignJustifyIcon),
];

// Indent works on list items (Tiptap core has no paragraph indent).
export const INDENT_ACTIONS: ToolbarAction[] = [
   {
      id: 'outdent',
      label: 'Decrease indent',
      icon: IndentDecreaseIcon,
      run: (editor) => editor.chain().focus().liftListItem('listItem').run(),
      isDisabled: (editor) => !editor.can().liftListItem('listItem'),
   },
   {
      id: 'indent',
      label: 'Increase indent',
      icon: IndentIncreaseIcon,
      run: (editor) => editor.chain().focus().sinkListItem('listItem').run(),
      isDisabled: (editor) => !editor.can().sinkListItem('listItem'),
   },
   {
      id: 'clear',
      label: 'Clear formatting',
      icon: RemoveFormattingIcon,
      run: (editor) => editor.chain().focus().unsetAllMarks().clearNodes().run(),
   },
];
