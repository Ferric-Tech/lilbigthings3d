/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { FormResults } from 'src/app/form-templates/models/form-template.interface';

import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';
import { ADD_PRODUCT_FORM_CONFIG } from './add-product.constant';

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
  addProductFormConfig = ADD_PRODUCT_FORM_CONFIG;

  onFormResults(formResults: FormResults): void {
    console.log(formResults);
  }
}
