import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppFieldType } from 'src/app/forms/models/form-templates.enum';
import {
  EventChannel,
  EventTopic,
} from 'src/app/services/event-management/event-management.enum';
import { EventManagementService } from 'src/app/services/event-management/event-management.service';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';
import { PRODUCT_FORM_CONFIG } from '../models/product.constant';
import { ProductData } from '../models/product.interface';
import { ProductManagementService } from '../services/product-management.service';

export interface FieldLocationData {
  column: string;
  form: string;
  field?: string;
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  productID = '';
  unpackedData: Record<string, unknown> = {};
  editProductFormConfig = PRODUCT_FORM_CONFIG;
  isLoading = true;

  constructor(
    private readonly eventService: EventManagementService,
    private readonly productService: ProductManagementService,
    private readonly route: ActivatedRoute,
    private readonly fs: FirestoreManagementService,
    private readonly cd: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.updateLoadingState(true);
    this.productID = this.route.snapshot.paramMap.get('productId') || '';
    await this.setEditProductForm();
    await this.setImagesForForm();
    if (!this.unpackedData) return;
    this.setEditProductFormWithUnpackedData(this.unpackedData);
    this.updateLoadingState(false);
  }

  // Child component call backs
  processFormResults(formResults: Record<string, unknown>): void {
    this.eventService.publish(EventChannel.Product, EventTopic.Loading, true);
    this.productService.updateProduct(this.productID, formResults);
  }

  /********************************************** Set form content *********************************************/
  private async setEditProductForm() {
    /*
    This methods is script that follows multiple sets needs to 
    set the from as required with the product data for the specific 
    product in question
    */
    if (!this.productID) return;
    const productData = await this.getProductDetailFromID();

    if (!productData) return;
    this.unpackedData = {
      ...this.unpackedData,
      ...this.unpackedProductData(productData),
    };
  }

  private async getProductDetailFromID(): Promise<ProductData | undefined> {
    /*
    This methods retreieves the data for the product from the database
    */
    return this.productID
      ? await this.fs.getProductDataByID(this.productID)
      : undefined;
  }

  private unpackedProductData(
    productData: ProductData
  ): Record<string, unknown> {
    /*
    This method unpacks the received product data which may have
    nested objects into an object with 1 to 1 relationships
    */

    const unpackedData: Record<string, unknown> = {};
    Object.keys(productData).forEach((parentKey) => {
      // Non-object values processes
      if (typeof productData[parentKey] !== 'object') {
        unpackedData[parentKey] = productData[parentKey];
        return;
      }

      // Excempt keys processed
      if (parentKey === 'longDescription') {
        unpackedData[parentKey] = productData[parentKey];
        return;
      }

      // Nested objects unpacked
      const focusObject = productData[parentKey] as Record<string, unknown>;
      Object.keys(focusObject).forEach((childKey) => {
        unpackedData[childKey] = focusObject[childKey];
      });
    });

    return unpackedData;
  }

  private setEditProductFormWithUnpackedData(
    unpackedData: Record<string, unknown>
  ): void {
    /*
    The objective of this method/fuction to update the formConfig with 
    the data in the unpacked data object.
    */

    const fieldLocationDataMap = this.generateMapOfFieldsLocationData();
    Object.keys(fieldLocationDataMap).forEach((field) => {
      // Get requried column
      const requiredColumn = this.editProductFormConfig.columns.find(
        (column) => {
          return column.name === fieldLocationDataMap[field].column;
        }
      );

      // Get requried form
      if (!requiredColumn) return;
      const requiredForm = requiredColumn.forms.find((form) => {
        return form.name === fieldLocationDataMap[field].form;
      });

      // Get requried field
      if (!requiredForm) return;
      const requiredField = requiredForm.fields.find((_field) => {
        if (fieldLocationDataMap[field].field) {
          return _field.name === fieldLocationDataMap[field].field;
        }

        return _field.name === field;
      });

      if (!requiredField) return;
      // If field is not multi-column then assign value and return
      if (requiredField.type !== AppFieldType.InputMultiColumn) {
        requiredField.value = unpackedData[field] as string;
        return;
      }

      // Else get requried fieldColumn and assign value
      if (!requiredField.multiColumnFieldSetting) return;
      const requiredFieldColumn = requiredField.multiColumnFieldSetting.find(
        (fieldColumn) => {
          return fieldColumn.name === field;
        }
      );

      if (!requiredFieldColumn) return;
      requiredFieldColumn.value = unpackedData[field] as string;
    });
  }

  private generateMapOfFieldsLocationData() {
    /*
    Objective of this method/function is to go through all the fields in the
    form and for each, record to which column and form that field belongs.
    If such field is a multi-column field then for each fieldColumn
    (and not the field in that case), to record the fieldColumn along with
    which Column, Form and Field it belongs to
    */
    const fieldLocationDataMap: Record<string, FieldLocationData> = {};
    this.editProductFormConfig.columns.forEach((column) => {
      column.forms.forEach((form) => {
        form.fields.forEach((field) => {
          if (field.type !== AppFieldType.InputMultiColumn) {
            fieldLocationDataMap[field.name] = {
              column: column.name,
              form: form.name,
            };
          } else {
            field.multiColumnFieldSetting?.forEach((fieldColumn) => {
              fieldLocationDataMap[fieldColumn.name] = {
                column: column.name,
                form: form.name,
                field: field.name,
              };
            });
          }
        });
      });
    });

    return fieldLocationDataMap;
  }

  /********************************************** Set form images *********************************************/
  private async setImagesForForm() {
    if (!this.productID) return;
    const imageUrls = (await this.productService.getImagesByID(
      this.productID
    )) as Record<string, (string | ArrayBuffer | null)[]>;
    this.unpackedData = { ...this.unpackedData, ...imageUrls };
  }

  /********************************************** Utility methods *********************************************/
  private updateLoadingState(state: boolean) {
    this.isLoading = state;
    this.eventService.publish(
      EventChannel.Product,
      EventTopic.Loading,
      this.isLoading
    );
    this.cd.detectChanges();
  }
}
