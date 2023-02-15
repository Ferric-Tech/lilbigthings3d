import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormResults } from 'src/app/form-templates/models/form-template.interface';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';
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
  productID = '';
  isLoaded = false;

  constructor(
    private readonly productService: ProductManagementService,
    private readonly route: ActivatedRoute,
    private readonly fs: FirestoreManagementService,
    private readonly cd: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.getProductDetail();
    this.cd.detectChanges();
  }

  private async getProductDetail() {
    this.productID = this.route.snapshot.paramMap.get('productId') || '';
    let productData = await this.fs.getProductByID(this.productID);

    // Assign standard data
    Object.keys(productData).forEach((key) => {
      this.editProductFormConfig.columns.forEach((column, colIndex) => {
        column.forms.forEach((form, formIndex) => {
          form.fields.forEach((field, fieldIndex) => {
            if (field.name === key) {
              this.editProductFormConfig.columns[colIndex].forms[
                formIndex
              ].fields[fieldIndex].value = productData[key] as string;
            }
          });
        });
      });
    });

    // Get file data
    productData = await this.fs.getProductFileDataByID(
      this.productID,
      productData
    );

    this.editProductFormConfig.columns[0].forms[1].fields[1].value = productData
      .files.designFile as string;
    this.isLoaded = true;
  }

  processFormResults(formResults: FormResults): void {
    this.productService.processFormResults(formResults);
  }
}
