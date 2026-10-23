import { FileHeadphoneIcon, FileImageIcon, FilePlayIcon, FileTextIcon, type LucideIcon } from 'lucide-react';
import { IconTile } from '@/components/common/IconTile';
import type { Tone } from '@/types/ui/common.types';

// By content type; PDFs (and anything else) get the document icon.
const TYPE_ICONS: [prefix: string, icon: LucideIcon, tone: Tone][] = [
   ['video/', FilePlayIcon, 'info'],
   ['audio/', FileHeadphoneIcon, 'warning'],
   ['image/', FileImageIcon, 'success'],
];

// Tinted icon for a lesson file's type (file rows, caption dialog).
export function LessonFileTypeTile({ contentType }: { contentType: string }) {
   const [, icon, tone] = TYPE_ICONS.find(([prefix]) => contentType.startsWith(prefix)) ?? [
      '',
      FileTextIcon,
      'primary',
   ];
   return <IconTile icon={icon} tone={tone} />;
}
