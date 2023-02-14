import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
} from '@angular/fire/firestore';
import {
  getStorage,
  ref,
  StorageReference,
  uploadBytes,
} from '@angular/fire/storage';
import {
  Product,
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
        this.addFilesToStrorage(storageRef, file);
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
}
