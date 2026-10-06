import { SelectField } from '@/components/common/form/SelectField';
import { TextField } from '@/components/common/form/TextField';
import { MODULE_CATEGORY_OPTIONS, MODULE_LEVEL_OPTIONS } from '@/constants/module';
import type { ModuleFormValues } from '@/schemas/module.schema';

// Level, category and code: the three fields in the first form row.
export function ModuleBasicFields() {
   return (
      <div className="grid gap-6 md:grid-cols-3">
         <SelectField<ModuleFormValues>
            name="levelId"
            label="Module level"
            placeholder="Choose module level"
            options={MODULE_LEVEL_OPTIONS}
         />
         <SelectField<ModuleFormValues>
            name="categoryId"
            label="Module category"
            placeholder="Choose category"
            options={MODULE_CATEGORY_OPTIONS}
         />
         <TextField<ModuleFormValues> name="code" label="Module code" placeholder="Enter module code" />
      </div>
   );
}
