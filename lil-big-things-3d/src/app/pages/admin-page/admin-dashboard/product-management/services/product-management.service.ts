import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormResults } from 'src/app/forms/models/form-template.interface';
import {
  EventChannel,
  EventTopic,
} from 'src/app/services/event-management/event-management.enum';
import { EventManagementService } from 'src/app/services/event-management/event-management.service';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';
import { ProductFormFields } from '../models/product.enum';
import { Product, ProductImageUrls } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  constructor(
    private readonly fs: FirestoreManagementService,
    private router: Router,
    private readonly eventService: EventManagementService
  ) {}

  async processFormResults(
    formResults: FormResults,
    isEdit: boolean,
    productID?: string
  ): Promise<void> {
    const newProduct = {} as Product;

    // Assign form value data
    newProduct.data = {
      // General info/data
      title: formResults.formValues[ProductFormFields.Title],
      'primary-image-url':
        formResults.formValues[ProductFormFields.PrimaryImage],
      shortDescription:
        formResults.formValues[ProductFormFields.ShortDescription],
      longDescription:
        formResults.formValues[ProductFormFields.LongDescription],

      dimentions: {
        x: parseFloat(formResults.formValues[ProductFormFields.DimentionX]),
        y: parseFloat(formResults.formValues[ProductFormFields.DimentionY]),
        z: parseFloat(formResults.formValues[ProductFormFields.DimentionZ]),
      },

      // File meta data
      filesMetaData: {
        designFile: formResults.formValues[ProductFormFields.FileDesign],
        printFileFast: formResults.formValues[ProductFormFields.FilePrintFast],
        printFileStandard:
          formResults.formValues[ProductFormFields.FilePrintStandard],
        printFileOptimised:
          formResults.formValues[ProductFormFields.FilePrintOptimised],
        printFileCustom:
          formResults.formValues[ProductFormFields.FilePrintCustom],
      },

      // Images meta data
      imagesMetaData: {
        design: formResults.formValues[
          ProductFormFields.ImagesDesign
        ] as unknown as string[],
        product: formResults.formValues[
          ProductFormFields.ImagesProduct
        ] as unknown as string[],
      },
    };

    // Assign files
    newProduct.files = {};
    if (formResults.formFiles[ProductFormFields.FileDesign]) {
      newProduct.files.designFile = formResults.formFiles[
        ProductFormFields.FileDesign
      ][0] as File;
    }
    if (formResults.formFiles[ProductFormFields.FilePrintFast]) {
      newProduct.files.printFileFast = formResults.formFiles[
        ProductFormFields.FilePrintFast
      ][0] as File;
    }
    if (formResults.formFiles[ProductFormFields.FilePrintStandard]) {
      newProduct.files.printFileStandard = formResults.formFiles[
        ProductFormFields.FilePrintStandard
      ][0] as File;
    }
    if (formResults.formFiles[ProductFormFields.FilePrintOptimised]) {
      newProduct.files.printFileOptimised = formResults.formFiles[
        ProductFormFields.FilePrintOptimised
      ][0] as File;
    }
    if (formResults.formFiles[ProductFormFields.FilePrintCustom]) {
      newProduct.files.printFileCustom = formResults.formFiles[
        ProductFormFields.FilePrintCustom
      ][0] as File;
    }

    // Assign image files
    newProduct.images = {
      design:
        formResults.formImages[ProductFormFields.ImagesDesign] || undefined,
      product:
        formResults.formImages[ProductFormFields.ImagesProduct] || undefined,
    };

    // Save to DB
    await this.fs.addProduct(newProduct, isEdit, productID);

    //Navigate to all products
    this.router.navigateByUrl('/admin/dashboard/products-list');
    this.eventService.publish(EventChannel.Product, EventTopic.Loading, false);
  }

  async getImagesByID(productID: string): Promise<ProductImageUrls> {
    return await this.fs.getProductImagesUrlByID(productID);
  }
}
