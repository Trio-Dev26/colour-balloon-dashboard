// Colours offered in the rich-text toolbar. They are saved into the content HTML, so they are
// fixed hex values (Tailwind 600 shades), not theme tokens.
export const EDITOR_TEXT_COLORS = [
   { label: 'Default', value: null },
   { label: 'Indigo', value: '#4f46e5' },
   { label: 'Red', value: '#dc2626' },
   { label: 'Orange', value: '#ea580c' },
   { label: 'Green', value: '#16a34a' },
   { label: 'Blue', value: '#2563eb' },
   { label: 'Slate', value: '#475569' },
] as const;

export const EDITOR_HIGHLIGHT_COLORS = [
   { label: 'None', value: null },
   { label: 'Indigo', value: '#e0e7ff' },
   { label: 'Yellow', value: '#fef08a' },
   { label: 'Green', value: '#bbf7d0' },
   { label: 'Pink', value: '#fbcfe8' },
   { label: 'Blue', value: '#bfdbfe' },
] as const;

export const EDITOR_LINE_HEIGHTS = ['1', '1.5', '2'] as const;

export type EditorColor = (typeof EDITOR_TEXT_COLORS)[number] | (typeof EDITOR_HIGHLIGHT_COLORS)[number];
