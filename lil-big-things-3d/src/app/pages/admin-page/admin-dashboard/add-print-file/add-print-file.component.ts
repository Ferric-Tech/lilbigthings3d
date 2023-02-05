import { Component } from '@angular/core';
import {
  FirestoreManagementService,
  PrintFile,
} from 'src/app/services/firestore-management/firestore-management.service';

@Component({
  selector: 'app-add-print-file',
  templateUrl: './add-print-file.component.html',
  styleUrls: ['./add-print-file.component.scss'],
})
export class AddPrintFileComponent {
  printFile: PrintFile | undefined;

  constructor(readonly fs: FirestoreManagementService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelection(event: any): void {
    const selectedFile = event.target.files[0] as File;
    if (!selectedFile) return;
    this.printFile = {
      file: selectedFile,
      fileName: selectedFile.name,
    };
  }

  onSubmit() {
    if (!this.printFile) return;
    this.fs.addPrintFile(this.printFile);
  }
}
