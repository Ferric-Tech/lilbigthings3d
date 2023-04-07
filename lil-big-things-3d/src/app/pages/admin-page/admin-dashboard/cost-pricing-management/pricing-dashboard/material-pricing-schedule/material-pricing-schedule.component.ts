import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/services/materials/material.service';
import {
  MaterialInput,
  MaterialTypeDensityMapping,
  MeasurementBasis,
} from '../../costs-dashboard/material-schedule/material-schedule.component';

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
      const stockInHandDelta =
        materialInput.measurementBasis === MeasurementBasis.Length
          ? materialInput.qtyPerUnit * materialInput.qtyUnit
          : this.getLengthFromWeight(materialInput);

      const materialTypeInSchedule =
        materialInput.materialType in this.materialSchedule;

      if (!materialTypeInSchedule) {
        this.materialSchedule[materialInput.materialType] = {
          stockOnHand: 0,
          carryingCost: 0,
          costPerUnit: 0,
          colors: [],
        };
      }

      this.materialSchedule[materialInput.materialType].stockOnHand +=
        stockInHandDelta;
      this.materialSchedule[materialInput.materialType].carryingCost +=
        materialInput.qtyUnit * materialInput.costPerUnit;
      this.materialSchedule[materialInput.materialType].costPerUnit =
        this.materialSchedule[materialInput.materialType].carryingCost /
        this.materialSchedule[materialInput.materialType].stockOnHand;
    });
  }

  private getLengthFromWeight(materialInput: MaterialInput): number {
    const cmCubed =
      (materialInput.qtyPerUnit * materialInput.qtyUnit * 10) /
      MaterialTypeDensityMapping[materialInput.materialType];
    const areaOfDiameterInCM =
      Math.PI *
      (materialInput.materialDiameter / 2 / 10) *
      (materialInput.materialDiameter / 2 / 10);
    return cmCubed / areaOfDiameterInCM;
  }
}
