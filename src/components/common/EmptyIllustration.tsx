import Image from 'next/image';

// Folder illustration from the Figma empty states ("No module yet!", "No units yet!").
export function EmptyIllustration() {
   return <Image src="/images/empty-module.png" alt="" width={120} height={80} className="h-20 w-30 object-contain" />;
}
