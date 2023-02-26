import { Injectable } from '@angular/core';
import { FormResults } from 'src/app/form-templates/models/form-template.interface';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';
import { ProductFormFields } from '../models/product.enum';
import { Product, ProductImageUrls } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  constructor(private readonly fs: FirestoreManagementService) {}

  processFormResults(
    formResults: FormResults,
    isEdit: boolean,
    productID?: string
  ): void {
    const newProduct = {} as Product;
    console.log(formResults);
    console.log(typeof formResults.formValues[ProductFormFields.ImagesDesign]);
    console.log(typeof formResults.formValues[ProductFormFields.ImagesProduct]);

    // Assign form value data
    newProduct.data = {
      // General info/data
      title: formResults.formValues[ProductFormFields.Title],
      description: formResults.formValues[ProductFormFields.Description],
      dimentions: {
        x: parseInt(formResults.formValues[ProductFormFields.DimentionX]),
        y: parseInt(formResults.formValues[ProductFormFields.DimentionY]),
        z: parseInt(formResults.formValues[ProductFormFields.DimentionZ]),
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
    console.log(newProduct);

    // Save to DB
    this.fs.addProduct(newProduct, isEdit, productID);
  }

  async getImagesByID(productID: string): Promise<ProductImageUrls> {
    return await this.fs.getProductImagesUrlByID(productID);
  }
}
