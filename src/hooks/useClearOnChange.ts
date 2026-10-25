import { useEffect } from 'react';
import { useFormContext, type FieldValues, type Path, type PathValue } from 'react-hook-form';

type ResetValue<T extends FieldValues> = PathValue<T, Path<T>>;

/**
 * Inside a FormProvider: when the user changes `source`, reset `target` to `empty`
 * (e.g. a new module clears the chosen unit), or to what `empty(values)` returns.
 * Pass a module-level function so the subscription isn't recreated every render.
 * Form resets don't trigger it.
 */
export function useClearOnChange<T extends FieldValues>(
   source: Path<T>,
   target: Path<T>,
   empty: ResetValue<T> | ((values: T) => ResetValue<T>)
) {
   const { watch, setValue } = useFormContext<T>();

   useEffect(() => {
      const subscription = watch((values, { name }) => {
         if (name !== source) return;
         // Form values are never functions, so a function here is always the resetter.
         const next = typeof empty === 'function' ? (empty as (all: T) => ResetValue<T>)(values as T) : empty;
         setValue(target, next);
      });
      return () => subscription.unsubscribe();
   }, [watch, setValue, source, target, empty]);
}
