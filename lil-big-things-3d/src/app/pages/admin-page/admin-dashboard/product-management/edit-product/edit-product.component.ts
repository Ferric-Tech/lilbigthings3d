import { Component, OnInit } from '@angular/core';
import { FormResults } from 'src/app/form-templates/models/form-template.interface';
import { PRODUCT_FORM_CONFIG } from '../models/product.constant';
import { ProductManagementService } from '../services/product-management.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  // get the product detail from the DB
  // Call the const ADD_PRODUCT_FORM_CONFIG and then add the values received from the DB
  // Amened the multicolumn for to handle this.

  editProductFormConfig = PRODUCT_FORM_CONFIG;

  constructor(private readonly productService: ProductManagementService) {}

  ngOnInit(): void {
    console.log('');
  }

  processFormResults(formResults: FormResults): void {
    this.productService.processFormResults(formResults);
  }
}
