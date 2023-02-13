import { Component } from '@angular/core';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';

@Component({
  selector: 'app-add-print-file',
  templateUrl: './add-print-file.component.html',
  styleUrls: ['./add-print-file.component.scss'],
})
export class AddPrintFileComponent {
  printFile: File | undefined;

  constructor(readonly fs: FirestoreManagementService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelection(event: any): void {
    this.printFile = event.target.files[0] as File;
  }

  onSubmit() {
    // if (!this.printFile) return;
    // this.fs.addPrintFile(this.printFile);
  }
}
