/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  AppForm,
  AppMultiColumnForm,
} from '../../models/form-template.interface';
import {
  FormLineType,
  FORM_FIELD_TYPES,
} from '../../models/form-templates.enum';
import { isEqual } from 'lodash';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic--multi-column-form',
  templateUrl: './dynamic-multi-column-form.component.html',
  styleUrls: ['./dynamic-multi-column-form.component.scss'],
})
export class DynanmicMultiColumnFormComponent implements OnInit {
  @Input() config: AppMultiColumnForm | undefined;

  forms: { [key: string]: FormGroup } = {};
  formFieldType = FormLineType;
  formDefaults: { [key: string]: string } = {};
  importedFiles: { [key: string]: File } = {};
  importedImages: { [key: string]: File[] } = {};
  importedImageUrls: { [key: string]: any[] } = {};

  get formFieldsWithDefaultValues(): string[] {
    const fieldsWithDefualtValues: string[] = [];

    Object.keys(this.forms).forEach((formName) => {
      Object.keys(this.forms[formName].controls).forEach((control) => {
        if (this.formDefaults[control]) {
          if (
            isEqual(
              this.forms[formName].get(control)?.value,
              this.formDefaults[control]
            )
          ) {
            fieldsWithDefualtValues.push(control);
          }
        }
      });
    });

    return fieldsWithDefualtValues;
  }

  get isAllFormsValid(): boolean {
    if (!this.config) return false;

    let allFormsValid = true;
    Object.keys(this.forms).forEach((formName) => {
      if (this.forms[formName].invalid) {
        allFormsValid = false;
      }
    });

    return allFormsValid;
  }

  get isValidForm(): boolean {
    return this.isAllFormsValid && !this.formFieldsWithDefaultValues.length;
  }

  constructor(private readonly cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.buildFormsFromConfigs();
    this.setFormDefaultValues();
  }

  private buildFormsFromConfigs(): void {
    if (!this.config) return;

    this.config.columns.forEach((column) => {
      column.forms.forEach((form) => {
        const formGroup = new FormGroup({});
        form.fields.forEach((field) => {
          if (FORM_FIELD_TYPES.includes(field.type)) {
            formGroup.addControl(
              field.name,
              new FormControl(field.placeholder || '', field.validators)
            );
          }
        });
        this.forms[form.name] = formGroup;
      });
    });
  }

  private setFormDefaultValues(): void {
    if (!this.config) return;

    this.config.columns.forEach((column) => {
      column.forms.forEach((form) => {
        form.fields.forEach((field) => {
          if (FORM_FIELD_TYPES.includes(field.type) && field.placeholder) {
            this.formDefaults[field.name] = field.placeholder;
          }
        });
      });
    });
  }

  onFieldFocus(form: FormGroup, field: string): void {
    if (form.controls[field].value === this.formDefaults[field]) {
      form.controls[field].setValue('');
    }
  }

  onFieldBlur(form: FormGroup, field: string): void {
    if (form.controls[field].value === '') {
      form.controls[field].setValue(this.formDefaults[field]);
    }
  }

  onFileSelection(form: FormGroup, field: string, event: any): void {
    const file: File = event.target.files[0];
    this.importedFiles[field] = file;
    form.controls[field].setValue(file.name);
    this.cd.detectChanges();
  }

  onImagesSelection(form: FormGroup, field: string, event: any) {
    const uploadedFiles: FileList = event.target.files;
    const uploadedImages: File[] = [];
    const uploadedImagesNames: string[] = [];
    const uploadedImagesUrls: any[] = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
      uploadedImages.push(uploadedFiles[i]);
      uploadedImagesNames.push(uploadedFiles[i].name);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.onload = (_event) => {
        uploadedImagesUrls.push(reader.result);
      };
    }

    this.importedImages[field] = uploadedImages;
    this.importedImageUrls[field] = uploadedImagesUrls;
    form.controls[field].setValue(uploadedImagesNames);
    this.cd.detectChanges();
    console.log(this.importedImageUrls);
  }

  onSubmit(): void {
    if (this.isValidForm) {
      Object.keys(this.forms).forEach((formName) => {
        console.log(this.forms[formName].value);
      });
    }
  }
}
