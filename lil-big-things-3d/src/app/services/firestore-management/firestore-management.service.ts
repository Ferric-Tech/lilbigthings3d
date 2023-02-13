import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import {
  addDoc,
  collection,
  DocumentReference,
  getDocs,
  getFirestore,
} from '@angular/fire/firestore';
import {
  getStorage,
  ref,
  StorageReference,
  uploadBytes,
} from '@angular/fire/storage';
import { Product } from 'src/app/pages/admin-page/admin-dashboard/add-product/add-product.component';
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
    const productRef = await addDoc(
      collection(this.db, 'products'),
      productDoc
    );
    this.addProductFilesToStorage(product, productRef);
  }

  private addProductFilesToStorage(
    product: Product,
    productRef: DocumentReference
  ): Promise<StorageReference> {
    return new Promise((resolve) => {
      const storage = getStorage();
      let folderRef = 'products/' + productRef.id + '/files/';
      Object.keys(product.files).forEach((key) => {
        const storageRef = ref(storage, folderRef + product.files[key]?.name);
        uploadBytes(storageRef, product.files[key] as File).then(() => {
          resolve(storageRef);
        });
      });
      console.log(product.images);
      Object.keys(product.images).forEach((imageCat) => {
        folderRef = 'products/' + productRef.id + '/images/' + imageCat + '/';
        console.log(folderRef);
        product.images[imageCat]?.forEach((file) => {
          const storageRef = ref(storage, folderRef + file.name);
          console.log(storageRef);
          uploadBytes(storageRef, file).then(() => {
            resolve(storageRef);
          });
        });
      });
    });
  }

  async getAllProducts(): Promise<Product[]> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const listOfProducts: Product[] = [];
      const querySnapshot = await getDocs(collection(this.db, 'products'));
      querySnapshot.forEach((doc) => {
        listOfProducts.push(doc.data() as Product);
      });
      resolve(listOfProducts);
    });
  }
}
