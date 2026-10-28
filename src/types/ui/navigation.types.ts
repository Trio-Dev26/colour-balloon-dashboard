import type { Tone } from './common.types';

export interface BreadcrumbEntry {
   label: string;
   /** Omit on the last (current) item. */
   href?: string;
   /** Curriculum code shown as a pill before the label (M001, U001, L001). On phones, ancestors show only the code. */
   code?: string;
   /** Colour of the code pill; neutral when omitted. */
   codeTone?: Tone;
}
