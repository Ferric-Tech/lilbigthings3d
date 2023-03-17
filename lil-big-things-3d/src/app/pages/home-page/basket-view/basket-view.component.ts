import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  EventChannel,
  EventTopic,
} from 'src/app/services/event-management/event-management.enum';
import { EventManagementService } from 'src/app/services/event-management/event-management.service';
import { LocalStorageItem } from 'src/app/services/local-storage/local-storage.enum';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

export interface BasketItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  qty?: number;
}

@Component({
  selector: 'app-basket-view',
  templateUrl: './basket-view.component.html',
  styleUrls: ['./basket-view.component.scss'],
})
export class BasketViewComponent implements OnInit {
  basketContent: BasketItem[] = [];

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly cd: ChangeDetectorRef,
    private readonly eventService: EventManagementService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.basketContent = this.localStorageService.get(LocalStorageItem.Basket);
    this.cd.detectChanges();
  }

  onCheckoutClick() {
    this.eventService.publish(
      EventChannel.Basket,
      EventTopic.CheckoutRequested,
      this.basketContent
    );
    this.router.navigate(['./checkout']);
  }

  onQtyUpdate(newQty: number, i: number) {
    this.basketContent[i].qty = newQty;
  }
}
