import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getFirestore } from '@angular/fire/firestore';
import { getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirestoreManagementService {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  async addPrintFile(printFile: File): Promise<void> {
    await this.addFileToStroage(printFile);
  }

  private addFileToStroage(file: File): Promise<unknown> {
    return new Promise((resolve) => {
      const storage = getStorage();
      const filePathRef = ref(storage, file.name);
      uploadBytes(filePathRef, file).then((snapshot) => {
        console.log(snapshot);
        resolve(snapshot || null);
      });
    });
  }
}
