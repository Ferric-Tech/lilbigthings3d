import { Injectable } from '@angular/core';
import { FormResults } from 'src/app/form-templates/models/form-template.interface';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';
import {
  Product,
  ProductFiles,
  ProductFilesMetaData,
} from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  constructor(private readonly fs: FirestoreManagementService) {}

  processFormResults(formResults: FormResults): void {
    const newProduct: Product = {
      data: {
        title: formResults.formValues['title'],
        description: formResults.formValues['description'],
        dimentions: {
          x: formResults.formValues['x'],
          y: formResults.formValues['y'],
          z: formResults.formValues['z'],
        },

        files: {
          designFile: formResults.formValues['design-file'],
          printFileFast: formResults.formValues['print-file-fast'],
          printFileStandard: formResults.formValues['print-file-standard'],
          printFileOptimised: formResults.formValues['print-file-optimised'],
          printFileCustom: formResults.formValues['print-file-custom'],
        },
      },
      files: {} as ProductFiles | ProductFilesMetaData,
      images: {},
    };
    if (formResults.formFiles['design-file']) {
      newProduct.files['designFile'] = formResults.formFiles[
        'design-file'
      ][0] as File;
    }
    if (formResults.formFiles['print-file-fast']) {
      newProduct.files['printFileFast'] = formResults.formFiles[
        'print-file-fast'
      ][0] as File;
    }
    if (formResults.formFiles['print-file-standard']) {
      newProduct.files['printFileStandard'] = formResults.formFiles[
        'print-file-standard'
      ][0] as File;
    }
    if (formResults.formFiles['print-file-optimised']) {
      newProduct.files['printFileOptimised'] = formResults.formFiles[
        'print-file-optimised'
      ][0] as File;
    }
    if (formResults.formFiles['print-file-custom']) {
      newProduct.files['printFileCustom'] = formResults.formFiles[
        'print-file-custom'
      ][0] as File;
    }
    if (formResults.formImages['images-design']) {
      newProduct.images.design = formResults.formImages['images-design'];
    }
    if (formResults.formImages['images-product']) {
      newProduct.images.product = formResults.formImages['images-product'];
    }
    this.fs.addProduct(newProduct);
  }
}
