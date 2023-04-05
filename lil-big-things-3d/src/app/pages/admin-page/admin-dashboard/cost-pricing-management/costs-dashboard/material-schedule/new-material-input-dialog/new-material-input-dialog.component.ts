import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MaterialInput,
  MaterialInputStatus,
  MaterialType,
  MeasurementBasis,
} from '../material-schedule.component';

@Component({
  selector: 'app-new-material-input-dialog',
  templateUrl: './new-material-input-dialog.component.html',
  styleUrls: ['./new-material-input-dialog.component.scss'],
})
export class NewMaterialInputDialogComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() newMaterialInput = new EventEmitter<MaterialInput>();

  materialType = Object.values(MaterialType);
  materialTypeMapping: Record<MaterialType, string> = {
    [MaterialType.PLA]: 'PLA (Polylactic acid)',
  };

  MeasurementBasis = MeasurementBasis;
  measurementBasis = Object.values(MeasurementBasis);
  measurementBasisMapping: Record<MeasurementBasis, string> = {
    [MeasurementBasis.Weight]: 'Weight',
    [MeasurementBasis.Length]: 'Length',
  };

  materialInputStatus = Object.values(MaterialInputStatus);
  materialInputStatusMapping: Record<MaterialInputStatus, string> = {
    [MaterialInputStatus.Ordered]: 'Ordered',
    [MaterialInputStatus.Delivered]: 'Delivered',
  };

  newMaterialInputForm = new FormGroup({
    purchaseDate: new FormControl(new Date(), Validators.required),
    supplier: new FormControl('', Validators.required),
    materialType: new FormControl('', Validators.required),
    qtyUnitType: new FormControl('', Validators.required),
    qtyPerUnit: new FormControl(0, [Validators.required, Validators.min(1)]),
    qtyUnit: new FormControl(0, [Validators.required, Validators.min(1)]),
    costPerUnit: new FormControl(0, [Validators.required, Validators.min(1)]),
    status: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.newMaterialInputForm.markAllAsTouched();
    console.log(this.newMaterialInputForm.valid);
    console.log(this.newMaterialInputForm.value);
    if (this.newMaterialInputForm.invalid) return;
    this.newMaterialInput.emit(
      this.newMaterialInputForm.value as MaterialInput
    );
  }

  onCancelClick() {
    this.cancel.emit();
  }
}
