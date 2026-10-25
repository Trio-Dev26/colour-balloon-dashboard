import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PreviewSelectProps {
   label: string;
   options: readonly string[];
   placeholder: string;
}

// Unsaved pick the learner makes in the preview, e.g. which right side matches or a step's position.
export function PreviewSelect({ label, options, placeholder }: PreviewSelectProps) {
   return (
      <Select items={options.map((option) => ({ value: option, label: option }))}>
         <SelectTrigger aria-label={label} className="h-9 w-24 shrink-0">
            <SelectValue placeholder={placeholder} />
         </SelectTrigger>
         <SelectContent>
            {options.map((option) => (
               <SelectItem key={option} value={option}>
                  {option}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
}
