import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppField } from 'src/app/forms/models/form-template.interface';
import { AppFieldType } from 'src/app/forms/models/form-templates.enum';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  @Input() field: AppField | undefined;
  @Output() fileSelected = new EventEmitter<File>();

  formFieldType = AppFieldType;
  fieldValue = '';
  multiFileImport = false;

  ngOnInit() {
    if (!this.field) return;
    this.fieldValue = this.field.value || this.field.placeholder || '';
    this.multiFileImport =
      this.field.type === this.formFieldType.UploaderMultiFilePlain ||
      this.field.type === this.formFieldType.UploaderMultiFileUnderlined;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelection(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;
    this.fieldValue = file.name;
    this.fileSelected.emit(file);
  }
}
