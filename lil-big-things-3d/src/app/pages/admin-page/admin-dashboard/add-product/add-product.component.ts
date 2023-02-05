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
  productForm = this.fb.group({
    title: ['', Validators.required],
    decription: ['', Validators.required],
  });

  constructor(
    readonly fs: FirestoreManagementService,
    private fb: FormBuilder
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelection(event: any): void {
    const printFile = event.target.files[0] as File;
    this.printFiles.push(printFile);
  }

  onSubmit() {
    if (!this.productForm.valid || !this.printFiles) {
      return;
    }
    const product: Product = {
      title: this.productForm.value.title || '',
      decription: this.productForm.value.decription || '',
      printFiles: this.printFiles,
    };
    this.fs.addProduct(product);
  }
}
