import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  StorageReference,
  uploadBytes,
} from '@angular/fire/storage';
import {
  Product,
  ProductData,
  ProductFilesMetaData,
  ProductForDisplay,
  ProductImageUrls,
} from 'src/app/pages/admin-page/admin-dashboard/product-management/models/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirestoreManagementService {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  async addProduct(
    product: Product,
    isEdit: boolean,
    productID?: string
  ): Promise<void> {
    const productDoc = product.data;

    if (isEdit && productID) {
      await setDoc(doc(this.db, 'products', productID), productDoc);
    } else {
      const productDocRef = await addDoc(
        collection(this.db, 'products'),
        productDoc
      );
      productID = productDocRef.id;
    }

    // Add design files to storage
    const storage = getStorage();
    let folderRef = 'products/' + productID + '/files/';

    Object.keys(product.files).forEach((fileDescription) => {
      const fileName = productID + '-' + fileDescription;
      const storageRef = ref(storage, folderRef + fileName);
      const file: File = product.files[fileDescription] as File;
      this.addFilesToStrorage(storageRef, file);
    });

    // Add images files to storage
    Object.keys(product.images).forEach((imageCatergory) => {
      folderRef = 'products/' + productID + '/images/' + imageCatergory + '/';
      product.images[imageCatergory]?.forEach((file, index) => {
        const fileName =
          productID + '-' + imageCatergory + '-image-' + (index + 1);
        const storageRef = ref(storage, folderRef + fileName);
        this.addFilesToStrorage(storageRef, file as File);
      });
    });
  }

  addFilesToStrorage(
    storageRef: StorageReference,
    file: File
  ): Promise<StorageReference> {
    return new Promise((resolve) => {
      uploadBytes(storageRef, file).then(() => {
        resolve(storageRef);
      });
    });
  }

  async getAllProducts(): Promise<ProductForDisplay[]> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const listOfProducts: ProductForDisplay[] = [];
      const querySnapshot = await getDocs(collection(this.db, 'products'));
      querySnapshot.forEach((doc) => {
        const productToBeAdded = {
          id: doc.id,
          data: doc.data(),
        } as ProductForDisplay;
        listOfProducts.push(productToBeAdded);
      });
      resolve(listOfProducts);
    });
  }

  async getProductDataByID(productID: string): Promise<ProductData> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const docRef = doc(this.db, 'products', productID);
      const docSnap = await getDoc(docRef);
      const product = docSnap.data() as ProductData;
      resolve(product);
    });
  }

  getProductImagesUrlByID(productID: string): Promise<ProductImageUrls> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const images = {} as ProductImageUrls;
      const storage = getStorage();

      // Design Images
      const designImagePath = 'products/' + productID + '/images/design';
      const designImageFolderRef = ref(storage, designImagePath);
      const designImageFilesFound: string[] = [];
      await listAll(designImageFolderRef).then((response) => {
        response.items.forEach(async (itemRef) => {
          getDownloadURL(ref(storage, itemRef.fullPath)).then((url) => {
            designImageFilesFound.push(url);
          });
        });
      });
      images['images-design'] = designImageFilesFound;

      // Product Images
      const productImagePath = 'products/' + productID + '/images/product';
      const productImageFolderRef = ref(storage, productImagePath);
      const productImageFilesFound: string[] = [];
      await listAll(productImageFolderRef).then((response) => {
        response.items.forEach(async (itemRef) => {
          getDownloadURL(ref(storage, itemRef.fullPath)).then((url) => {
            productImageFilesFound.push(url);
          });
        });
      });
      images['images-product'] = productImageFilesFound;

      resolve(images);
    });
  }

  async getProductFilesDataByID(
    productID: string,
    product: Product
  ): Promise<Product> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const storage = getStorage();

      // Get files metadata
      product.data.filesMetaData = {} as ProductFilesMetaData;
      let path = 'products/' + productID + '/files';
      let folderRef = ref(storage, path);

      await listAll(folderRef).then((response) => {
        response.items.forEach((itemRef) => {
          if (itemRef.name.includes('designFile')) {
            product.data.filesMetaData.designFile = itemRef.name;
          }
          if (itemRef.name.includes('printFileFast')) {
            product.data.filesMetaData.printFileFast = itemRef.name;
          }
          if (itemRef.name.includes('printFileStandard')) {
            product.data.filesMetaData.printFileStandard = itemRef.name;
          }
          if (itemRef.name.includes('printFileOptimised')) {
            product.data.filesMetaData.printFileOptimised = itemRef.name;
          }
          if (itemRef.name.includes('printFileCustom')) {
            product.data.filesMetaData.printFileCustom = itemRef.name;
          }
        });
      });

      product.images = { design: [], product: [] };
      // Get product images metadata
      path = 'products/' + productID + '/images/product';
      folderRef = ref(storage, path);
      let filesFound: string[] = [];

      await listAll(folderRef).then((response) => {
        response.items.forEach((itemRef) => {
          filesFound.push(itemRef.name);
        });
      });
      product.data.imagesMetaData.product = filesFound;

      // Get design images metadata
      path = 'products/' + productID + '/images/design';
      folderRef = ref(storage, path);
      filesFound = [];

      await listAll(folderRef).then((response) => {
        response.items.forEach((itemRef) => {
          filesFound.push(itemRef.name);
        });
      });
      product.data.imagesMetaData.design = filesFound;

      resolve(product);
    });
  }
}
