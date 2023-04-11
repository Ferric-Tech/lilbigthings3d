import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  PrintFileParameters,
  PrintFileParametersMapping,
} from 'src/app/forms/dialogs/print-file-parameters-dialog/print-file-parameters-dialog.component';
import { AppField } from 'src/app/forms/models/form-template.interface';
import { AppFieldType } from 'src/app/forms/models/form-templates.enum';

export enum FileParamaterType {
  None,
  PrintFile,
}

export interface FileWithParameters {
  file: File | null;
  parameters: Record<string, unknown>;
}

@Component({
  selector: 'app-file-uploader-with-parameters',
  templateUrl: './file-uploader-with-parameters.component.html',
  styleUrls: ['./file-uploader-with-parameters.component.scss'],
})
export class FileUploaderWithParametersComponent implements OnInit {
  @Input() field: AppField | undefined;
  @Output() fileSelectedWithParameters = new EventEmitter<FileWithParameters>();

  formFieldType = AppFieldType;
  fieldValue: FileWithParameters = { file: null, parameters: {} };
  fileName = '';
  showParameterDialog = false;
  currentParameterType = FileParamaterType.None;
  parameterType = FileParamaterType;
  PrintFileParametersMapping = PrintFileParametersMapping;

  ngOnInit() {
    if (!this.field?.parameterType) return;
    this.fileName = this.field.value || this.field.placeholder || '';
    this.fieldValue.parameters = this.field.parameters || {};
    this.currentParameterType = this.field.parameterType;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelection(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;
    this.fieldValue.file = file;
    this.showParameterDialog = true;
  }

  onFileParametersSubmited(fileParameters: PrintFileParameters) {
    this.showParameterDialog = false;
    this.fieldValue.parameters = fileParameters as unknown as Record<
      string,
      unknown
    >;
    this.fileSelectedWithParameters.emit(this.fieldValue);
  }
}
