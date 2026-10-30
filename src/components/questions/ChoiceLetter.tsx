// Small "A" / "B" square learners use to refer to a choice (True / False cards and their preview).
export function ChoiceLetter({ letter }: { letter: string }) {
   return (
      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-md bg-accent text-xs font-semibold text-accent-foreground">
         {letter}
      </span>
   );
}
