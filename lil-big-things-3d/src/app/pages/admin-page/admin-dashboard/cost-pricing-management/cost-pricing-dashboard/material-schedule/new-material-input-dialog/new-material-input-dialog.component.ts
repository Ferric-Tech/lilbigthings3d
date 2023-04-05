import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-material-input-dialog',
  templateUrl: './new-material-input-dialog.component.html',
  styleUrls: ['./new-material-input-dialog.component.scss'],
})
export class NewMaterialInputDialogComponent {
  @Output() cancel = new EventEmitter<void>();

  newMaterialInputForm = new FormGroup({
    purchaseDate: new FormControl('', Validators.required),
    supplier: new FormControl('', Validators.required),
    materialType: new FormControl('', Validators.required),
    qtyUnitType: new FormControl('', Validators.required),
    qtyPerUnit: new FormControl('', Validators.required),
    qtyUnit: new FormControl('', Validators.required),
    costPerUnit: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  onSubmitClick() {
    console.log(this.newMaterialInputForm.value);
    this.cancel.emit();
  }

  onCancelClick() {
    this.cancel.emit();
  }
}
