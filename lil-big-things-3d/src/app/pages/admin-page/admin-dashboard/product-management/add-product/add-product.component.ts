/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { FormResults } from 'src/app/form-templates/models/form-template.interface';

import { PRODUCT_FORM_CONFIG } from '../models/product.constant';
import { ProductManagementService } from '../services/product-management.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  addProductFormConfig = PRODUCT_FORM_CONFIG;

  constructor(private readonly productService: ProductManagementService) {}

  processFormResults(formResults: FormResults): void {
    this.productService.processFormResults(formResults);
  }
}
