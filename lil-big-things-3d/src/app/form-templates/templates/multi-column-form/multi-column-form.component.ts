/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input, OnInit } from '@angular/core';
import { FormTemplateConfig } from '../../models/form-template.interface';
import {
  FormLineType,
  FORM_FIELD_TYPES,
} from '../../models/form-templates.enum';
import { isEqual } from 'lodash';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multi-column-form',
  templateUrl: './multi-column-form.component.html',
  styleUrls: ['./multi-column-form.component.scss'],
})
export class MultiColumnFormComponent implements OnInit {
  @Input() config: FormTemplateConfig[][] = [];

  formFieldType = FormLineType;
  formDefaults: { [key: string]: string }[] = [];

  get collectiveFormData(): { [key: string]: string }[] {
    const _collectiveFormData: { [key: string]: string }[] = [];
    this.config.forEach((column) => {
      column.forEach((form) => {
        Object.keys(form.group.value).forEach((key) => {
          _collectiveFormData.push({ [key]: form.group.value[key] });
        });
      });
    });
    return _collectiveFormData;
  }

  get formFieldsWithDefaultValues(): { [key: string]: string }[] {
    return this.collectiveFormData.filter((formField) => {
      let isMatch = false;
      this.formDefaults.forEach((defaultValue) => {
        if (isEqual(formField, defaultValue)) {
          isMatch = true;
        }
      });
      return isMatch;
    });
  }

  get isAllFormsValid(): boolean {
    let allFormsValid = true;
    this.config.forEach((column) => {
      column.forEach((form) => {
        if (form.group.invalid) {
          allFormsValid = false;
        }
      });
    });
    return allFormsValid;
  }

  get isValidForm(): boolean {
    return (
      this.formFieldsWithDefaultValues.length === 0 && this.isAllFormsValid
    );
  }

  ngOnInit(): void {
    this.setFormDefaultValues();
  }

  private setFormDefaultValues() {
    this.config.forEach((column) => {
      column.forEach((form) => {
        form.config.forEach((field) => {
          if (FORM_FIELD_TYPES.includes(field.type) && field.placeholder) {
            this.formDefaults.push({ [field.name]: field.placeholder });
          }
        });
      });
    });
  }

  onFileSelection(form: FormGroup, field: string, event: any): void {
    const file: File = event.target.files[0];
    form.controls[field].setValue(file.name);
  }

  onSubmit(): void {
    console.log(this.isValidForm);
  }
}
