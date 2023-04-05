import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/services/materials/material.service';

export interface MaterialSchedule {
  [key: string]: MaterialSummary;
}

export interface MaterialSummary {
  stockOnHand: number;
  carryingCost: number;
  costPerUnit: number;
  colors: ColourSummary[];
}

export interface ColourSummary {
  [key: string]: unknown;
  stockOnHand: number;
  carryingCost: number;
  costPerUnit: number;
  margin: number;
  roundedToNearest: number;
}

@Component({
  selector: 'app-material-pricing-schedule',
  templateUrl: './material-pricing-schedule.component.html',
  styleUrls: ['./material-pricing-schedule.component.scss'],
})
export class MaterialPricingScheduleComponent implements OnInit {
  panelOpenState = false;

  materialSchedule: MaterialSchedule = {};
  constructor(private readonly materialService: MaterialService) {}

  ngOnInit() {
    this.generateCostSummary();
  }

  private async generateCostSummary() {
    const allMaterialInputs =
      await this.materialService.getAllNewMaterialInputs();
    allMaterialInputs.forEach((materialInput) => {
      if (materialInput.materialType in this.materialSchedule) {
        this.materialSchedule[materialInput.materialType].stockOnHand +=
          materialInput.qtyPerUnit * materialInput.qtyUnit;
        this.materialSchedule[materialInput.materialType].carryingCost +=
          materialInput.qtyUnit * materialInput.costPerUnit;
      } else {
        this.materialSchedule[materialInput.materialType] = {
          stockOnHand: 0,
          carryingCost: 0,
          costPerUnit: 0,
          colors: [],
        };

        this.materialSchedule[materialInput.materialType].stockOnHand =
          materialInput.qtyPerUnit * materialInput.qtyUnit;
        this.materialSchedule[materialInput.materialType].carryingCost =
          materialInput.qtyUnit * materialInput.costPerUnit;
      }
      this.materialSchedule[materialInput.materialType].costPerUnit =
        this.materialSchedule[materialInput.materialType].carryingCost /
        this.materialSchedule[materialInput.materialType].stockOnHand;
    });
  }
}
