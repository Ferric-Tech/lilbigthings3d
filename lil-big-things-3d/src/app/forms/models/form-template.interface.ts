import { ValidatorFn } from '@angular/forms';
import { AppFieldType } from './form-templates.enum';

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
  type: AppFieldType;
  label?: string;
  placeholder?: string;
  value?: string;
  urls?: string[];
  validators?: ValidatorFn[];
  multiColumnFieldSetting?: MultiColumnFieldSetting[];
  characterLimit?: number;
}

export interface MultiColumnFieldSetting {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  validators?: ValidatorFn[];
}
