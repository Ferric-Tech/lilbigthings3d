/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  FormFieldConfig,
  FormTemplateConfig,
} from 'src/app/form-templates/models/form-template.interface';
import {
  FormLineType,
  FORM_FIELD_TYPES,
} from 'src/app/form-templates/models/form-templates.enum';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';

export interface Product {
  title: string;
  decription: string;
  printFiles: File[];
  imageFiles?: File[];
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  addProductFormConfig: FormTemplateConfig[][] = [];
  basicDetailsForm = this.fb.group({});
  filesForm = this.fb.group({});

  basicDetailsFormConfig: FormFieldConfig[] = [
    {
      name: 'title',
      type: FormLineType.InputTitle,
      placeholder: 'New Product',
      validators: [Validators.required],
    },
    {
      name: 'description',
      type: FormLineType.InputLong,
      placeholder: 'Please provide a description',
      validators: [Validators.required],
    },
  ];

  filesFormConfig: FormFieldConfig[] = [
    {
      name: 'files-label',
      type: FormLineType.LabelSub,
      label: 'Files',
    },
    {
      name: 'design-file',
      type: FormLineType.UploaderSingleFileUnderlined,
      label: 'Design file',
      validators: [Validators.required],
    },
    {
      name: 'print-files-label',
      type: FormLineType.UnderlinedLabel,
      label: 'Print file',
    },
    {
      name: 'print-file-fast',
      type: FormLineType.UploaderSingleFilePlain,
      label: 'Fast',
    },
    {
      name: 'print-file-standard',
      type: FormLineType.UploaderSingleFilePlain,
      label: 'Standard',
    },
    {
      name: 'print-file-optimised',
      type: FormLineType.UploaderSingleFilePlain,
      label: 'Optimised',
    },
    {
      name: 'design-file-custom',
      type: FormLineType.UploaderSingleFilePlain,
      label: 'Custom',
    },
  ];

  constructor(
    readonly fs: FirestoreManagementService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setFormColumn([
      { group: this.basicDetailsForm, config: this.basicDetailsFormConfig },
      { group: this.filesForm, config: this.filesFormConfig },
    ]);
  }

  private setFormColumn(column: FormTemplateConfig[]): void {
    const currentFormColumn: FormTemplateConfig[] = [];
    column.forEach((form) => {
      this.setForm(form);
      currentFormColumn.push(form);
    });
    this.addProductFormConfig.push(currentFormColumn);
  }

  private setForm(form: FormTemplateConfig): void {
    form.config.forEach((field: FormFieldConfig) => {
      if (FORM_FIELD_TYPES.includes(field.type)) {
        form.group.addControl(
          field.name,
          new FormControl(field.placeholder || '', field.validators)
        );
      }
    });
  }
}
