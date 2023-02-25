import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormResults } from 'src/app/form-templates/models/form-template.interface';
import { FormLineType } from 'src/app/form-templates/models/form-templates.enum';
import {
  EventChannel,
  EventTopic,
} from 'src/app/services/event-management/event-management.enum';
import { EventManagementService } from 'src/app/services/event-management/event-management.service';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';
import { PRODUCT_FORM_CONFIG } from '../models/product.constant';
import { ProductManagementService } from '../services/product-management.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  productID = '';
  editProductFormConfig = PRODUCT_FORM_CONFIG;
  isLoaded = false;

  constructor(
    private readonly eventService: EventManagementService,
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
    this.eventService.publish(EventChannel.Product, EventTopic.Loading, true);
    this.productID = this.route.snapshot.paramMap.get('productId') || '';
    if (!this.productID) return;

    const productData = await this.fs.getProductByID(this.productID);

    // Unpack productData into unnested object
    const unpackedData: Record<string, unknown> = {};
    Object.keys(productData).forEach((key1) => {
      if (typeof productData[key1] === 'object') {
        const focusObject = productData[key1] as Record<string, unknown>;
        Object.keys(focusObject).forEach((key2) => {
          unpackedData[key2] = focusObject[key2];
        });
      } else {
        unpackedData[key1] = productData[key1];
      }
    });

    // Assign data to form
    Object.keys(unpackedData).forEach((key) => {
      this.editProductFormConfig.columns.forEach((column, colIndex) => {
        column.forms.forEach((form, formIndex) => {
          form.fields.forEach((field, fieldIndex) => {
            const fieldContent =
              this.editProductFormConfig.columns[colIndex].forms[formIndex]
                .fields[fieldIndex];
            if (fieldContent.type === FormLineType.InputMultiColumn) {
              fieldContent.multiColumnFieldSetting?.forEach((columnField) => {
                if (columnField.name === key) {
                  fieldContent.value = unpackedData[key] as string;
                }
              });
              return;
            }
            if (field.name === key) {
              fieldContent.value = unpackedData[key] as string;
            }
          });
        });
      });
    });

    this.isLoaded = true;
    this.eventService.publish(EventChannel.Product, EventTopic.Loading, false);
  }

  processFormResults(formResults: FormResults): void {
    this.productService.processFormResults(formResults, true, this.productID);
  }
}
