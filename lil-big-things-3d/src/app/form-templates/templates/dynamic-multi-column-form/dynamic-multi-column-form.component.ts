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

  //   get collectiveFormData(): { [key: string]: string }[] {
  //     const _collectiveFormData: { [key: string]: string }[] = [];
  //     this.config?.columns.forEach((column) => {
  //       column.forms.forEach((form) => {
  //         Object.keys(form.group.value).forEach((key) => {
  //           _collectiveFormData.push({ [key]: form.group.value[key] });
  //         });
  //       });
  //     });
  //     return _collectiveFormData;
  //   }

  //   get formFieldsWithDefaultValues(): { [key: string]: string }[] {
  //     return this.collectiveFormData.filter((formField) => {
  //       let isMatch = false;
  //       this.formDefaults.forEach((defaultValue) => {
  //         if (isEqual(formField, defaultValue)) {
  //           isMatch = true;
  //         }
  //       });
  //       return isMatch;
  //     });
  //   }

  //   get isAllFormsValid(): boolean {
  //     let allFormsValid = true;
  //     this.config.forEach((column) => {
  //       column.forEach((form) => {
  //         if (form.group.invalid) {
  //           allFormsValid = false;
  //         }
  //       });
  //     });
  //     return allFormsValid;
  //   }

  get isValidForm(): boolean {
    // return (
    //   this.formFieldsWithDefaultValues.length === 0 && this.isAllFormsValid
    // );
    return true;
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

  onFieldClick(form: FormGroup, field: string): void {
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
    // TODO:
  }
}

//   ngOnInit(): void {
//     this.setFormColumn([
//       { group: this.basicDetailsForm, config: this.basicDetailsFormConfig },
//       { group: this.filesForm, config: this.filesFormConfig },
//     ]);
//     this.setFormColumn([
//       { group: this.imagesForm, config: this.imagesFormConfig },
//     ]);
//   }

//   private setFormColumn(column: AppForm[]): void {
//     const currentFormColumn: AppForm[] = [];
//     column.forEach((form) => {
//       this.setForm(form);
//       currentFormColumn.push(form);
//     });
//     this.addProductFormConfig.push(currentFormColumn);
//   }

//   private setForm(form: AppForm): void {
//     form.config.forEach((field: AppField) => {
//       if (FORM_FIELD_TYPES.includes(field.type)) {
//         form.group.addControl(
//           field.name,
//           new FormControl(field.placeholder || '', field.validators)
//         );
//       }
//     });
//   }
