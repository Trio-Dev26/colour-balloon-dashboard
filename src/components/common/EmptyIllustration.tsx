import { FolderOpenIcon } from 'lucide-react';
import { IconTile } from './IconTile';

// Open-folder icon in a soft circle with a faint ring, shown on every "No … yet!" empty state.
export function EmptyIllustration() {
   return <IconTile icon={FolderOpenIcon} size="lg" className="ring-8 ring-accent/50" />;
}
