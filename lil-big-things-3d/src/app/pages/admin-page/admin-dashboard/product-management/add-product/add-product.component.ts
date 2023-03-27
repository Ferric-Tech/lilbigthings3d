/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { FormResults } from 'src/app/forms/models/form-template.interface';
import {
  EventChannel,
  EventTopic,
} from 'src/app/services/event-management/event-management.enum';
import { EventManagementService } from 'src/app/services/event-management/event-management.service';

import { PRODUCT_FORM_CONFIG } from '../models/product.constant';
import { ProductManagementService } from '../services/product-management.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  addProductFormConfig = PRODUCT_FORM_CONFIG;

  constructor(
    private readonly productService: ProductManagementService,
    private readonly eventService: EventManagementService
  ) {}

  processFormResults(formResults: FormResults): void {
    this.eventService.publish(EventChannel.Product, EventTopic.Loading, true);
    this.productService.processFormResults(formResults, false);
  }
}
