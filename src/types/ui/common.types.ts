export interface SelectOption {
   value: string;
   label: string;
   /** Shown but can't be picked. */
   disabled?: boolean;
}

export type Tone = 'success' | 'info' | 'warning' | 'neutral' | 'primary';

export type LanguageCode = 'en' | 'my';
