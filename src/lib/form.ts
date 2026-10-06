import type { FieldError, FieldErrors, FieldValues } from 'react-hook-form';

/** Error for a top-level field name. */
export function getFieldError<T extends FieldValues>(errors: FieldErrors<T>, name: string): FieldError | undefined {
   return errors[name] as FieldError | undefined;
}

/** Plain text of an HTML string, used to check that rich-text fields aren't just empty tags. */
export function htmlToText(html: string): string {
   return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .trim();
}
