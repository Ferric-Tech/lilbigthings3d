import { ValidatorFn } from '@angular/forms';
import { FormLineType } from './form-templates.enum';

export interface AppMultiColumnForm {
  columns: AppFormColumn[];
}

export interface AppFormColumn {
  name: string;
  forms: AppForm[];
}

export interface AppForm {
  name: string;
  fields: AppField[];
}

export interface AppField {
  name: string;
  type: FormLineType;
  label?: string;
  placeholder?: string;
  validators?: ValidatorFn[];
}
