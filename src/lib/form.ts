import { HttpStatusCode, isAxiosError } from 'axios';
import type { FieldError, FieldErrors, FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { LANGUAGE_FIELD_SUFFIX, LANGUAGES } from '@/constants/common';
import type { LanguageCode } from '@/types/ui/common.types';

/** Languages with at least one invalid bilingual field (fields are named <field>En / <field>My). */
export function getInvalidLanguages(errors: FieldErrors): LanguageCode[] {
   return LANGUAGES.map((language) => language.value).filter((code) =>
      Object.keys(errors).some((key) => key.endsWith(LANGUAGE_FIELD_SUFFIX[code]))
   );
}

/** handleSubmit's invalid callback: names the language tabs that still have required fields to fill. */
export function toastInvalidLanguages(errors: FieldErrors): void {
   const invalid = getInvalidLanguages(errors);
   if (invalid.length === 0) return;
   const labels = LANGUAGES.filter((language) => invalid.includes(language.value)).map((language) => language.label);
   toast.error(`Please fill the required fields in the ${labels.join(' and ')} tab${labels.length > 1 ? 's' : ''}.`);
}

/** The backend's error message (NestJS sends a string or a list of validation messages), else the fallback. */
export function apiErrorMessage(error: unknown, fallback: string): string {
   const message: unknown = isAxiosError(error) ? error.response?.data?.message : undefined;
   if (Array.isArray(message)) return message.join(', ');
   return typeof message === 'string' ? message : fallback;
}

/** The backend rejected the input itself (400): sending the same again would fail again. */
export const isRejectedInput = (error: unknown) =>
   isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest;

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
