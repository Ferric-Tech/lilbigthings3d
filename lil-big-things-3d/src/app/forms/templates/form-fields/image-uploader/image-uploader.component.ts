import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AppField,
  FileData,
} from 'src/app/forms/models/form-template.interface';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent {
  @Input() field: AppField | undefined;
  @Output() filesSelected = new EventEmitter<FileData[]>();
  @Output() primaryImageSelected = new EventEmitter<FileData>();

  uploadedImagesData: FileData[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onImagesSelection(event: any) {
    const uploadedFiles: FileList = event.target.files;

    for (let i = 0; i < uploadedFiles.length; i++) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[i]);
      reader.onload = () => {
        this.uploadedImagesData.push({
          file: uploadedFiles[i],
          //   fileName: uploadedFiles[i].name,
          url: reader.result,
        });
      };

      this.filesSelected.emit(this.uploadedImagesData);
    }
  }

  deleteImage(index: number) {
    this.uploadedImagesData.splice(index, 1);
    this.filesSelected.emit(this.uploadedImagesData);
  }

  setPrimaryImage(image: FileData) {
    this.primaryImageSelected.emit(image);
  }
}
