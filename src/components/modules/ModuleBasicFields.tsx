'use client';

import { SelectField } from '@/components/common/form/SelectField';
import { TextField } from '@/components/common/form/TextField';
import { useCategoryOptions, useLevelOptions } from '@/hooks/useCatalog';
import type { ModuleFormValues } from '@/schemas/module.schema';

// Level, category and code: the three fields in the first form row.
// The code is only the suffix ("M01"); the API prefixes the level and category.
export function ModuleBasicFields() {
   const levelOptions = useLevelOptions();
   const categoryOptions = useCategoryOptions();

   return (
      <div className="grid gap-6 md:grid-cols-3">
         <SelectField<ModuleFormValues>
            name="levelId"
            label="Module level"
            placeholder="Choose module level"
            options={levelOptions}
         />
         <SelectField<ModuleFormValues>
            name="categoryId"
            label="Module category"
            placeholder="Choose category"
            options={categoryOptions}
         />
         <TextField<ModuleFormValues> name="code" label="Module code" placeholder="e.g. M01" />
      </div>
   );
}
