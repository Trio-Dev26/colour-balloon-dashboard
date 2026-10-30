'use client';

import { useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagInputProps {
   tags: string[];
   onChange: (tags: string[]) => void;
   /** Typing or pasting this splits the text into several tags. */
   separator: string;
   placeholder?: string;
   invalid?: boolean;
   /** Names the text box for screen readers, e.g. "Blank 1 accepted answers". */
   label: string;
   id?: string;
}

// Type a value and press Enter (or the separator) to add it as a chip; × or Backspace removes one.
// Leaving the box adds what's typed, so nothing is lost if the user clicks Save without pressing Enter.
export function TagInput({ tags, onChange, separator, placeholder, invalid, label, id }: TagInputProps) {
   const [draft, setDraft] = useState('');

   const add = (text: string) => {
      const next = text
         .split(separator)
         .map((tag) => tag.trim())
         .filter((tag) => tag && !tags.includes(tag));
      if (next.length) onChange([...tags, ...new Set(next)]);
      setDraft('');
   };

   const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' || event.key === separator) {
         event.preventDefault();
         add(draft);
      } else if (event.key === 'Backspace' && !draft && tags.length) {
         onChange(tags.slice(0, -1));
      }
   };

   const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
      const text = event.clipboardData.getData('text');
      if (!text.includes(separator)) return;
      event.preventDefault();
      add(`${draft}${text}`);
   };

   return (
      <div
         className={cn(
            'flex min-h-11 flex-1 flex-wrap items-center gap-2 rounded-lg border bg-card px-2 py-1.5 shadow-xs focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
            invalid && 'border-destructive ring-3 ring-destructive/20'
         )}
      >
         {tags.map((tag) => (
            <span
               key={tag}
               className="inline-flex items-center gap-1 rounded-full bg-success-border py-0.5 pr-1 pl-2.5 text-sm text-success-foreground"
            >
               {tag}
               <button
                  type="button"
                  aria-label={`Remove ${tag}`}
                  className="rounded-full p-0.5 hover:bg-success-foreground/10"
                  onClick={() => onChange(tags.filter((other) => other !== tag))}
               >
                  <XIcon className="size-3" />
               </button>
            </span>
         ))}
         <input
            id={id}
            aria-label={label}
            aria-invalid={invalid}
            value={draft}
            placeholder={placeholder}
            className="h-7 min-w-32 flex-1 bg-transparent text-sm outline-none placeholder:text-placeholder"
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            onBlur={() => add(draft)}
         />
      </div>
   );
}
