import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';

const todayFormatter = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

// Floating circles behind the banner text, a nod to the Colour Balloons name.
const BALLOONS = [
   'size-48 -top-16 right-10 bg-primary-foreground/10',
   'size-28 top-10 right-56 bg-primary-foreground/5',
   'size-36 -bottom-20 right-36 bg-primary-foreground/10',
];

// Greeting, today's date, a one-line status and the two most common create actions.
export function WelcomeBanner({ draftCount }: { draftCount: number }) {
   return (
      <section className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-sm">
         {BALLOONS.map((className) => (
            <span key={className} className={`pointer-events-none absolute rounded-full ${className}`} aria-hidden />
         ))}
         <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-1.5">
               <p className="text-xs font-medium tracking-wide text-primary-foreground/70 uppercase">
                  {todayFormatter.format(new Date())}
               </p>
               <h2 className="text-2xl leading-7.5 font-bold tracking-[-0.5px]">
                  Mingalaba! <span className="font-myanmar font-semibold">မင်္ဂလာပါ</span>
               </h2>
               <p className="max-w-120 text-sm text-primary-foreground/80">
                  {draftCount > 0
                     ? `${draftCount} ${draftCount === 1 ? 'module is' : 'modules are'} still in draft. Keep building, then publish when they’re ready.`
                     : 'Every module is out of draft. Here’s how the curriculum looks today.'}
               </p>
            </div>
            <div className="flex flex-wrap gap-2">
               <Button
                  size="lg"
                  className="bg-primary-foreground font-semibold text-primary hover:bg-primary-foreground/90"
                  nativeButton={false}
                  render={<Link href={ROUTES.newModule} />}
               >
                  <PlusIcon />
                  New module
               </Button>
               <Button
                  size="lg"
                  className="border border-primary-foreground/30 bg-primary-foreground/10 font-semibold text-primary-foreground hover:bg-primary-foreground/20"
                  nativeButton={false}
                  render={<Link href={ROUTES.newLesson} />}
               >
                  <PlusIcon />
                  New lesson
               </Button>
            </div>
         </div>
      </section>
   );
}
