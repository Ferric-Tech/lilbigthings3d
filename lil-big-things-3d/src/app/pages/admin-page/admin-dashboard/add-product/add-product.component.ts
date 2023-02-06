/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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

export enum FormFieldType {
  MainLabel,
  LabelSub,
  UnderlinedLabel,
  PlainLabel,
  InputTitle,
  InputPlain,
  InputLong,
  UploaderSingleFileUnderlined,
  UploaderSingleFilePlain,
  UploaderMultiFileUnderlined,
  UploaderMultiFilePlain,
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  printFiles: File[] = [];
  imageFiles: File[] = [];

  basicDetailsForm = this.fb.group({});
  filesForm = this.fb.group({});

  formFieldType = FormFieldType;
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

  private setForm(form: FormGroup, config: FormFieldConfig[]): void {
    config.forEach((field: FormFieldConfig) => {
      form.addControl(
        field.name,
        new FormControl(field.placeholder || '', field.validators)
      );
    });
  }

  onPrintFileSelection(event: any): void {
    for (const file of event.target.files) {
      this.printFiles.push(file as File);
    }
  }

  onImageFileSelection(event: any): void {
    for (const file of event.target.files) {
      this.imageFiles.push(file as File);
    }
  }

  onSubmit() {
    // if (!this.basicDetailsForm.valid || !this.printFiles) {
    //   return;
    // }
    // const product: Product = {
    //   title: this.basicDetailsForm.value.title || '',
    //   decription: this.basicDetailsForm.value.description || '',
    //   printFiles: this.printFiles,
    //   imageFiles: this.imageFiles,
    // };
    // this.fs.addProduct(product);
  }
}
