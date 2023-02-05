/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
export class AddProductComponent {
  printFiles: File[] = [];
  imageFiles: File[] = [];
  productForm = this.fb.group({
    title: ['', Validators.required],
    decription: ['', Validators.required],
  });

  constructor(
    readonly fs: FirestoreManagementService,
    private fb: FormBuilder
  ) {}

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
    if (!this.productForm.valid || !this.printFiles) {
      return;
    }
    const product: Product = {
      title: this.productForm.value.title || '',
      decription: this.productForm.value.decription || '',
      printFiles: this.printFiles,
      imageFiles: this.imageFiles,
    };
    this.fs.addProduct(product);
  }
}
