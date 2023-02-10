import { FormGroup, ValidatorFn } from '@angular/forms';
import { FormLineType } from './form-templates.enum';

export interface FormTemplateConfig {
  group: FormGroup;
  config: FormFieldConfig[];
}

export interface FormFieldConfig {
  name: string;
  type: FormLineType;
  label?: string;
  placeholder?: string;
  validators?: ValidatorFn[];
}
