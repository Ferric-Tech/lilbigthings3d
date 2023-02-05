import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { addDoc, collection, getFirestore } from '@angular/fire/firestore';
import { getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

export interface PrintFile {
  title: string;
  description: string;
  file: File;
  filePath: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreManagementService {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  async addPrintFile(printFile: PrintFile): Promise<void> {
    await this.addFileToStroage(printFile.filePath, printFile.file);
    await addDoc(collection(this.db, 'print-files'), {
      title: printFile.title,
      description: printFile.description,
    });
  }

  private addFileToStroage(filePath: string, file: File): Promise<unknown> {
    return new Promise((resolve) => {
      const storage = getStorage();
      const filePathRef = ref(storage, filePath);
      uploadBytes(filePathRef, file).then((snapshot) => {
        resolve(snapshot || null);
      });
    });
  }
}
