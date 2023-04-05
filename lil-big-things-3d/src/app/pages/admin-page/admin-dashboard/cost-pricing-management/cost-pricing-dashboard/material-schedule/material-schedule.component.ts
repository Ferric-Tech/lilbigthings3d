import { Component, Input, OnInit } from '@angular/core';

export interface MaterialInput {
  purchaseDate: Date;
  supplier: string;
  materialType: string;
  qtyUnitType: string;
  qtyPerUnit: number;
  qtyUnit: number;
  costPerUnit: number;
  status: string;
}

@Component({
  selector: 'app-material-schedule',
  templateUrl: './material-schedule.component.html',
  styleUrls: ['./material-schedule.component.scss'],
})
export class MaterialScheduleComponent implements OnInit {
  @Input() materialInputs: MaterialInput[] = [];

  ngOnInit() {
    this.materialInputs = [
      {
        purchaseDate: new Date(),
        supplier: 'A supplier',
        materialType: 'PLA',
        qtyUnitType: 'Weight',
        qtyPerUnit: 2,
        qtyUnit: 2,
        costPerUnit: 400,
        status: 'Delivered',
      },
      {
        purchaseDate: new Date(),
        supplier: 'A supplier',
        materialType: 'PLA',
        qtyUnitType: 'Weight',
        qtyPerUnit: 1,
        qtyUnit: 1,
        costPerUnit: 350,
        status: 'Delivered',
      },
    ];
  }
}
