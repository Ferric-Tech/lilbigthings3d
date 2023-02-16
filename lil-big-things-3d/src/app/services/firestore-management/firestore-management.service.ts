import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from '@angular/fire/firestore';
import {
  getStorage,
  listAll,
  ref,
  StorageReference,
  uploadBytes,
} from '@angular/fire/storage';
import {
  Product,
  ProductFilesMetaData,
  ProductForDisplay,
} from 'src/app/pages/admin-page/admin-dashboard/product-management/models/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirestoreManagementService {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  async addProduct(product: Product): Promise<void> {
    const productDoc = {
      title: product.title,
      description: product.description,
    };
    const productDocRef = await addDoc(
      collection(this.db, 'products'),
      productDoc
    );
    // Add design files to storage
    const storage = getStorage();
    let folderRef = 'products/' + productDocRef.id + '/files/';

    Object.keys(product.files).forEach((fileDescription) => {
      const fileName = productDocRef.id + '-' + fileDescription;
      const storageRef = ref(storage, folderRef + fileName);
      const file: File = product.files[fileDescription] as File;
      this.addFilesToStrorage(storageRef, file);
    });

    // Add images files to storage
    Object.keys(product.images).forEach((imageCatergory) => {
      folderRef =
        'products/' + productDocRef.id + '/images/' + imageCatergory + '/';
      product.images[imageCatergory]?.forEach((file, index) => {
        const fileName =
          productDocRef.id + '-' + imageCatergory + '-image-' + (index + 1);
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
          ...doc.data(),
        } as ProductForDisplay;
        listOfProducts.push(productToBeAdded);
      });
      resolve(listOfProducts);
    });
  }

  async getProductByID(productID: string): Promise<Product> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const docRef = doc(this.db, 'products', productID);
      const docSnap = await getDoc(docRef);
      const product: Product = docSnap.data() as Product;
      resolve(product);
    });
  }

  async getProductFileDataByID(
    productID: string,
    product: Product
  ): Promise<Product> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const storage = getStorage();

      // Get files metadata
      product.files = {} as ProductFilesMetaData;
      let path = 'products/' + productID + '/files';
      let folderRef = ref(storage, path);

      await listAll(folderRef).then((response) => {
        response.items.forEach((itemRef) => {
          if (itemRef.name.includes('designFile')) {
            product.files.designFile = itemRef.name;
          }
          if (itemRef.name.includes('printFileFast')) {
            product.files.printFileFast = itemRef.name;
          }
          if (itemRef.name.includes('printFileStandard')) {
            product.files.printFileStandard = itemRef.name;
          }
          if (itemRef.name.includes('printFileOptimised')) {
            product.files.printFileOptimised = itemRef.name;
          }
          if (itemRef.name.includes('printFileCustom')) {
            product.files.printFileCustom = itemRef.name;
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
      product.images.product = filesFound;

      // Get design images metadata
      path = 'products/' + productID + '/images/design';
      folderRef = ref(storage, path);
      filesFound = [];

      await listAll(folderRef).then((response) => {
        response.items.forEach((itemRef) => {
          filesFound.push(itemRef.name);
        });
      });
      product.images.design = filesFound;

      resolve(product);
    });
  }
}
