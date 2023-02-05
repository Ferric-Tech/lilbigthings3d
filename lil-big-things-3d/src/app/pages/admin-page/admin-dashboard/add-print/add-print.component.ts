import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import {
  FirestoreManagementService,
  PrintFile,
} from 'src/app/services/firestore-management/firestore-management.service';

@Component({
  selector: 'app-add-print',
  templateUrl: './add-print.component.html',
  styleUrls: ['./add-print.component.scss'],
})
export class AddPrintComponent {
  addPrintForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(16)]],
  });
  file: File | undefined;
  filePath: string | undefined;

  constructor(
    readonly fs: FirestoreManagementService,
    private fb: FormBuilder
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelection(event: any): void {
    this.file = event.target.files[0];
    this.filePath = event.target.value;
  }

  onSubmit() {
    if (!this.addPrintForm.value || !this.file || !this.filePath) {
      return;
    }
    const fileToUpload = this.addPrintForm.value as PrintFile;
    fileToUpload.file = this.file;
    fileToUpload.filePath = this.filePath;
    this.fs.addPrintFile(fileToUpload);
  }
}
