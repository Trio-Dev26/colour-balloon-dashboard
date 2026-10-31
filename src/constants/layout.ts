// Figma admin frame: 240px sidebar.
export const SIDEBAR_WIDTH = '15rem';

export const APP_NAME = 'Colour Balloons';

/**
 * Header buttons that shrink to a square icon on phones (detail page Edit / Delete): put `button` on the button
 * and `label` on its text, which stays readable by screen readers.
 */
export const ICON_ON_PHONE = { button: 'max-sm:size-9 max-sm:px-0', label: 'max-sm:sr-only' } as const;
