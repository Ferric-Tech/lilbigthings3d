/* eslint-disable no-async-promise-executor */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  EventChannel,
  EventTopic,
} from 'src/app/services/event-management/event-management.enum';
import { EventManagementService } from 'src/app/services/event-management/event-management.service';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';
import { ProductFormFields } from '../models/product.enum';
import { Product, ProductFileData } from '../models/product.interface';
import {
  FileData,
  FileDataWithParameters,
} from 'src/app/forms/models/form-template.interface';

export enum ProductFileType {
  Design = 'Design',
  PrintFast = 'Print-Fast',
  PrintStandard = 'Print-Standard',
  PrintOptimised = 'Print-Optimised',
}

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  constructor(
    private readonly fs: FirestoreManagementService,
    private router: Router,
    private readonly eventService: EventManagementService
  ) {}

  async addNewProduct(formResults: Record<string, unknown>): Promise<void> {
    // Initalise the product in DB and gets ID then sends to updateProduct to complete
    const initalProduct = {
      title: formResults[ProductFormFields.Title] as string,
    } as Product;
    const productID = await this.fs.initialiseProductDocument(initalProduct);

    this.updateProduct(productID, formResults);
  }

  async updateProduct(productID: string, formResults: Record<string, unknown>) {
    // Updates DB with the product created from the from results and then ends loading
    this.fs.updateProduct(
      productID,
      await this.createProductFromFormResults(productID, formResults)
    );
    this.eventService.publish(EventChannel.Product, EventTopic.Loading, false);
  }

  private async createProductFromFormResults(
    productID: string,
    formResults: Record<string, unknown>
  ): Promise<Product> {
    // Create basic product
    const completeProduct: Product =
      this.setProductBasicsFromFormResults(formResults);

    // Store images in form results
    const imageUrls = (await this.addImageFilesToStorage(
      productID,
      formResults
    )) as { imagesDesignUrls: string[]; imagesProductUrls: string[] };

    // Store files in form results
    const fileData = (await this.addProductFilesToStorage(
      productID,
      formResults
    )) as {
      designFileData: ProductFileData;
      printFastFileData: ProductFileData;
      printStandardFileData: ProductFileData;
      printOptimisedFileData: ProductFileData;
    };

    // Updated product with image and file storage data as required
    completeProduct.imagesDesignUrls = imageUrls.imagesDesignUrls;
    completeProduct.imagesProductUrls = imageUrls.imagesProductUrls;
    completeProduct.fileDesign = fileData.designFileData;
    completeProduct.filePrintFast = fileData.printFastFileData;
    completeProduct.filePrintStandard = fileData.printStandardFileData;
    completeProduct.filePrintOptimised = fileData.printOptimisedFileData;

    // Return the completed product
    return completeProduct;
  }

  private async addImageFilesToStorage(
    productID: string,
    formResults: Record<string, unknown>
  ): Promise<Record<string, string[]>> {
    // Design images
    const imagesDesignUrls = await this.uploadProductImageByCatergory(
      productID,
      formResults[ProductFormFields.ImagesDesign] as FileData[],
      'Design'
    );
    // Product images
    const imagesProductUrls = await this.uploadProductImageByCatergory(
      productID,
      formResults[ProductFormFields.ImagesProduct] as FileData[],
      'Product'
    );

    return { imagesDesignUrls, imagesProductUrls };
  }

  private async uploadProductImageByCatergory(
    productID: string,
    imagesData: FileData[],
    catergory: string
  ): Promise<string[]> {
    // Uploads the an array of images to the required caterogry and then
    // returns and arrays of urls where these images can be sourced later
    return new Promise(async (resolve) => {
      const designImages: File[] = [];
      for (const fileData of imagesData) {
        if (fileData.file) {
          designImages.push(fileData.file);
        }
      }

      resolve(
        await this.fs.addProductImagesByIDAndCatergory(
          productID,
          catergory,
          designImages
        )
      );
    });
  }

  private async addProductFilesToStorage(
    productID: string,
    formResults: Record<string, unknown>
  ) {
    // Design File
    const receivedDesignFileData = formResults[
      ProductFormFields.FileDesign
    ] as FileDataWithParameters;

    let designFileData = {} as ProductFileData;
    if (receivedDesignFileData.file) {
      designFileData = {
        url: await this.uploadProductFileByType(
          productID,
          ProductFileType.Design,
          receivedDesignFileData.file
        ),
        parameters: receivedDesignFileData.parameters || null,
      };
    }

    // Print Fast File
    const receivedPrintFastFileData = formResults[
      ProductFormFields.FilePrintFast
    ] as FileDataWithParameters;

    let printFastFileData = {} as ProductFileData;
    if (receivedPrintFastFileData.file) {
      printFastFileData = {
        url: await this.uploadProductFileByType(
          productID,
          ProductFileType.PrintFast,
          receivedPrintFastFileData.file
        ),
        parameters: receivedPrintFastFileData.parameters,
      };
    }

    // Print Standard File
    const receivedPrintStandardFileData = formResults[
      ProductFormFields.FilePrintStandard
    ] as FileDataWithParameters;

    let printStandardFileData = {} as ProductFileData;
    if (receivedPrintStandardFileData.file) {
      printStandardFileData = {
        url: await this.uploadProductFileByType(
          productID,
          ProductFileType.PrintStandard,
          receivedPrintStandardFileData.file
        ),
        parameters: receivedPrintStandardFileData.parameters,
      };
    }

    // Print Standard File
    const receivedPrintOptimisedFileData = formResults[
      ProductFormFields.FilePrintOptimised
    ] as FileDataWithParameters;

    let printOptimisedFileData = {} as ProductFileData;
    if (receivedPrintOptimisedFileData.file) {
      printOptimisedFileData = {
        url: await this.uploadProductFileByType(
          productID,
          ProductFileType.PrintOptimised,
          receivedPrintOptimisedFileData.file
        ),
        parameters: receivedPrintOptimisedFileData.parameters,
      };
    }

    return {
      designFileData,
      printFastFileData,
      printStandardFileData,
      printOptimisedFileData,
    };
  }

  private uploadProductFileByType(
    productID: string,
    type: ProductFileType,
    file: File
  ): Promise<string> {
    // Uploads file to storage and returns url where they can be downloaded later
    return new Promise(async (resolve) => {
      resolve(await this.fs.addProductFileByIDAndType(productID, type, file));
    });
  }

  private setProductBasicsFromFormResults(
    formResults: Record<string, unknown>
  ) {
    return {
      title: formResults[ProductFormFields.Title] as string,
      primaryImageUrl: formResults[ProductFormFields.PrimaryImage] as string,
      shortDesc: formResults[ProductFormFields.ShortDesc] as string,
      longDesc: this.setLongDescription(formResults),
      dimentions: formResults[ProductFormFields.Dimentions] as Record<
        string,
        number
      >,
    } as Product;
  }

  private setLongDescription(formResults: Record<string, unknown>) {
    // Set long description as array of strings
    const longDescFormatted: string[] = [
      formResults[ProductFormFields.LongDesc] as string,
    ];
    return longDescFormatted[0].split(/\r?\n/);
  }
}
