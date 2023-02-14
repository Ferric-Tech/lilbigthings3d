import { ValidatorFn } from '@angular/forms';
import { FormLineType } from './form-templates.enum';

export interface FormResults {
  formValues: { [key: string]: string };
  formFiles: { [key: string]: File[] };
  formImages: { [key: string]: File[] };
}

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
  value?: string;
  validators?: ValidatorFn[];
  multiColumnFieldSetting?: MultiColumnFieldSetting;
}

export interface MultiColumnFieldSetting {
  labels: string[];
}
