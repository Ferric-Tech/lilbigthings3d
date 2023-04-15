import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AppField,
  FileData,
} from 'src/app/forms/models/form-template.interface';
import { AppFieldType } from 'src/app/forms/models/form-templates.enum';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  @Input() field: AppField | undefined;
  @Output() fileSelected = new EventEmitter<FileData[] | FileData>();

  formFieldType = AppFieldType;
  fieldDisplayValues: string[] = [];
  multiFileImport = false;

  ngOnInit() {
    if (!this.field) return;
    this.populateFieldDisplayValues();
    this.multiFileImport =
      this.field.type === this.formFieldType.UploaderMultiFilePlain ||
      this.field.type === this.formFieldType.UploaderMultiFileUnderlined;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelection(event: any): void {
    const filesSelected: File[] = event.target.files;
    if (!filesSelected) return;

    if (this.multiFileImport) {
      const fileData: FileData[] = [];
      for (const file of filesSelected) {
        fileData.push({ file: file });
        this.fieldDisplayValues.push(file.name);
      }
      this.fileSelected.emit(fileData);
      return;
    }

    const fileData: FileData = { file: filesSelected[0] };
    this.fieldDisplayValues = [filesSelected[0].name];
    this.fileSelected.emit(fileData);
  }

  populateFieldDisplayValues() {
    console.log(this.field);
    if (!this.field) return;
    if (this.field.value) {
      this.fieldDisplayValues.push(this.field.value);
    } else {
      if (this.field.placeholder) {
        this.fieldDisplayValues.push(this.field.placeholder);
      }
    }
  }
}
