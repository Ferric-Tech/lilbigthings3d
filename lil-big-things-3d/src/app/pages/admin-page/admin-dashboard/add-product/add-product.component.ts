/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormFieldType } from 'src/app/form-templates/models/form-templates.enum';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';

export interface Product {
  title: string;
  decription: string;
  printFiles: File[];
  imageFiles?: File[];
}

export interface FormFieldConfig {
  name: string;
  type: FormFieldType;
  label?: string;
  placeholder?: string;
  validators?: ValidatorFn[];
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  listOfFormGroups: { group: FormGroup; config: FormFieldConfig[] }[] = [];
  basicDetailsForm = this.fb.group({});
  filesForm = this.fb.group({});

  basicDetailsFormConfig: FormFieldConfig[] = [
    {
      name: 'title',
      type: FormFieldType.InputTitle,
      placeholder: 'New Product',
      validators: [Validators.required],
    },
    {
      name: 'description',
      type: FormFieldType.InputLong,
      placeholder: 'Please provide a description',
      validators: [Validators.required],
    },
  ];

  filesFormConfig: FormFieldConfig[] = [
    {
      name: 'files-lable',
      type: FormFieldType.LabelSub,
      label: 'Files',
    },
    {
      name: 'design-files-uploader',
      type: FormFieldType.UploaderSingleFileUnderlined,
      placeholder: 'None',
      label: 'Design file',
    },
    {
      name: 'print-files-label',
      type: FormFieldType.UnderlinedLabel,
      placeholder: 'None',
      label: 'Print file',
    },
    {
      name: 'print-files-fast',
      type: FormFieldType.UploaderSingleFilePlain,
      placeholder: 'None',
      label: 'Fast',
    },
    {
      name: 'print-files-standard',
      type: FormFieldType.UploaderSingleFilePlain,
      placeholder: 'None',
      label: 'Standard',
    },
    {
      name: 'print-files-optimised',
      type: FormFieldType.UploaderSingleFilePlain,
      placeholder: 'None',
      label: 'Optimised',
    },
    {
      name: 'design-files-custom',
      type: FormFieldType.UploaderSingleFilePlain,
      placeholder: 'None',
      label: 'Custom',
    },
  ];

  constructor(
    readonly fs: FirestoreManagementService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setForm(this.basicDetailsForm, this.basicDetailsFormConfig);
    this.setForm(this.filesForm, this.filesFormConfig);
  }

  private setForm(group: FormGroup, config: FormFieldConfig[]): void {
    config.forEach((field: FormFieldConfig) => {
      group.addControl(
        field.name,
        new FormControl(field.placeholder || '', field.validators)
      );
    });
    this.listOfFormGroups.push({ group, config });
  }
}
