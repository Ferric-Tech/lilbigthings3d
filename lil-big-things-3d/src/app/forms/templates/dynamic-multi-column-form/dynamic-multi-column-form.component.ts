/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AppMultiColumnForm,
  FormResults,
} from '../../models/form-template.interface';
import {
  AppFieldType,
  FORM_FIELD_TYPES,
} from '../../models/form-templates.enum';
import { isEqual } from 'lodash';
import { FormControl, FormGroup } from '@angular/forms';
import { FileWithParameters } from '../form-fields/file-uploader-with-parameters/file-uploader-with-parameters.component';
import { ImageData } from '../form-fields/image-uploader/image-uploader.component';

@Component({
  selector: 'app-dynamic--multi-column-form',
  templateUrl: './dynamic-multi-column-form.component.html',
  styleUrls: ['./dynamic-multi-column-form.component.scss'],
})
export class DynanmicMultiColumnFormComponent implements OnInit {
  // This component's object is to provide a template for a dynamic form
  // that can be split into multiple columns as may be required - specfically
  // for use of complex input screens as found in the admin portal of the application

  // The component requires a config strucuted as a AppMultiColumnForm as well
  @Input() config: AppMultiColumnForm | undefined;
  @Output() formResults = new EventEmitter<FormResults>();

  formFieldType = AppFieldType;
  forms: Record<string, FormGroup> = {};
  formDefaults: Record<string, string> = {};
  importedFiles: Record<string, File[]> = {};
  importedImages: Record<string, File[]> = {};

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
              new FormControl(
                field.value || field.placeholder || '',
                field.validators
              )
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

  updateFieldValue(form: FormGroup, field: string, updatedValue: string) {
    form.controls[field].setValue(updatedValue);
  }

  updateMultiColumnFieldValues(
    form: FormGroup,
    field: string,
    updatedValues: Record<string, string>
  ) {
    form.controls[field].setValue(updatedValues);
  }

  onFileSelection(form: FormGroup, field: string, file: File): void {
    if (!file) return;
    this.importedFiles[field] = [file];
    form.controls[field].setValue({ file: file });
  }

  onFileWithParametersSelection(
    form: FormGroup,
    field: string,
    fileWithParameters: FileWithParameters
  ) {
    if (!fileWithParameters.file) return;
    const file: File = fileWithParameters.file;
    this.importedFiles[field] = [file];
    form.controls[field].setValue(fileWithParameters);
    console.log(form);
  }

  onImagesSelection(form: FormGroup, field: string, uploadedImagesNames: any) {
    form.controls[field].setValue(uploadedImagesNames);
    this.cd.detectChanges();
  }

  onSubmit(): void {
    if (this.isValidForm) {
      const collectiveFormValues: { [key: string]: string } = {};
      Object.keys(this.forms).forEach((formName) => {
        Object.keys(this.forms[formName].controls).forEach((control) => {
          collectiveFormValues[control] =
            this.forms[formName].get(control)?.value;
        });
      });
      console.log(collectiveFormValues);

      //   this.formResults.emit({
      //     formValues: collectiveFormValues,
      //     formFiles: this.importedFiles,
      //     formImages: this.importedImages,
      //   });
    }
  }

  setPrimaryImage(image: ImageData) {
    this.forms['Product basic details'].controls['primary-image-url'].setValue(
      image
    );
  }
}
