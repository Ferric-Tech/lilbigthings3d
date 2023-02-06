/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFieldConfig } from 'src/app/pages/admin-page/admin-dashboard/add-product/add-product.component';
import { FormFieldType } from '../../models/form-templates.enum';

@Component({
  selector: 'app-multi-column-form',
  templateUrl: './multi-column-form.component.html',
  styleUrls: ['./multi-column-form.component.scss'],
})
export class MultiColumnFormComponent {
  @Input() config: { group: FormGroup; config: FormFieldConfig[] }[] = [];

  formFieldType = FormFieldType;

  onPrintFileSelection(event: any): void {
    // TODO:
  }

  onSubmit(): void {
    // TODO:
  }
}
