import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormResults } from 'src/app/forms/models/form-template.interface';
import { FormLineType } from 'src/app/forms/models/form-templates.enum';
import {
  EventChannel,
  EventTopic,
} from 'src/app/services/event-management/event-management.enum';
import { EventManagementService } from 'src/app/services/event-management/event-management.service';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';
import { PRODUCT_FORM_CONFIG } from '../models/product.constant';
import { ProductData, ProductImageUrls } from '../models/product.interface';
import { ProductManagementService } from '../services/product-management.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  productID = this.route.snapshot.paramMap.get('productId') || '';
  editProductFormConfig = PRODUCT_FORM_CONFIG;
  isLoaded = false;
  imageUrls: Record<string, (string | ArrayBuffer | null)[]> = {};

  constructor(
    private readonly eventService: EventManagementService,
    private readonly productService: ProductManagementService,
    private readonly route: ActivatedRoute,
    private readonly fs: FirestoreManagementService,
    private readonly cd: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.setEditProductForm();
  }

  processFormResults(formResults: FormResults): void {
    this.eventService.publish(EventChannel.Product, EventTopic.Loading, true);
    this.productService.processFormResults(formResults, true, this.productID);
  }

  private async setEditProductForm() {
    this.eventService.publish(EventChannel.Product, EventTopic.Loading, true);

    if (!this.productID) return;
    const productData = await this.getProductDetailFromRoute();

    if (!productData) return;
    const unpackedData = this.unpackedProductData(productData);

    if (!unpackedData) return;
    this.setEditProductFormWithReceivedData(unpackedData);

    this.imageUrls = (await this.getImagesForDisplay()) as Record<
      string,
      (string | ArrayBuffer | null)[]
    >;

    this.isLoaded = true;
    this.cd.detectChanges();
    this.eventService.publish(EventChannel.Product, EventTopic.Loading, false);
  }

  private async getProductDetailFromRoute(): Promise<ProductData | undefined> {
    return this.productID
      ? await this.fs.getProductDataByID(this.productID)
      : undefined;
  }

  private unpackedProductData(
    productData: ProductData
  ): Record<string, unknown> {
    const unpackedData: Record<string, unknown> = {};
    Object.keys(productData).forEach((key1) => {
      if (typeof productData[key1] === 'object' && key1 !== 'longDescription') {
        const focusObject = productData[key1] as Record<string, unknown>;
        Object.keys(focusObject).forEach((key2) => {
          unpackedData[key2] = focusObject[key2];
        });
      } else {
        unpackedData[key1] = productData[key1];
      }
    });
    return unpackedData;
  }

  private setEditProductFormWithReceivedData(
    unpackedData: Record<string, unknown>
  ): void {
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
                  columnField.value = unpackedData[key] as string;
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
  }

  private async getImagesForDisplay(): Promise<ProductImageUrls | undefined> {
    if (!this.productID) return;
    return await this.productService.getImagesByID(this.productID);
  }
}
