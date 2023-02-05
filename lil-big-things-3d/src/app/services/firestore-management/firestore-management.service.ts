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
import { Product } from 'src/app/pages/admin-page/admin-dashboard/add-product/add-product.component';
import { environment } from 'src/environments/environment';

export interface ProductDoc {
  title: string;
  description: string;
  printFileRefs: string[];
  imageFileRefs?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreManagementService {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  async addProduct(product: Product): Promise<void> {
    const productDoc: ProductDoc = {
      title: product.title,
      description: product.decription,
      printFileRefs: [],
    };
    for (const printFile of product.printFiles) {
      const storageRef = await this.addFileToStorage(printFile);
      productDoc.printFileRefs.push(storageRef.fullPath);
    }
    if (product.imageFiles) {
      productDoc.imageFileRefs = [];
      for (const imageFile of product.imageFiles) {
        const storageRef = await this.addFileToStorage(imageFile);
        productDoc.imageFileRefs.push(storageRef.fullPath);
      }
    }
    await addDoc(collection(this.db, 'products'), productDoc);
  }

  async getAllProducts(): Promise<ProductDoc[]> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const listOfProducts: ProductDoc[] = [];
      const querySnapshot = await getDocs(collection(this.db, 'products'));
      querySnapshot.forEach((doc) => {
        listOfProducts.push(doc.data() as ProductDoc);
      });
      resolve(listOfProducts);
    });
  }

  async addPrintFile(printFile: File): Promise<void> {
    await this.addFileToStorage(printFile);
  }

  private addFileToStorage(file: File): Promise<StorageReference> {
    return new Promise((resolve) => {
      const storage = getStorage();
      const storageRef = ref(storage, file.name);
      uploadBytes(storageRef, file).then(() => {
        resolve(storageRef);
      });
    });
  }
}
