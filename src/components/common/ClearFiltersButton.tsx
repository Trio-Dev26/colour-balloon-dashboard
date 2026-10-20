import { XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Toolbar button that resets every list filter at once. Render it only while a filter is active.
export function ClearFiltersButton({ onClear }: { onClear: () => void }) {
   return (
      <Button type="button" variant="ghost" className="h-9 text-muted-foreground" onClick={onClear}>
         <XIcon />
         Clear filters
      </Button>
   );
}
