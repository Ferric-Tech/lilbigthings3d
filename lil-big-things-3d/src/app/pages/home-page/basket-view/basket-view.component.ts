import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
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
    private readonly checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    this.basketContent = this.localStorageService.get(LocalStorageItem.Basket);
    this.cd.detectChanges();
  }

  onCheckoutClick() {
    this.checkoutService.commenseCheckout(this.basketContent);
  }

  onQtyUpdate(newQty: number, i: number) {
    this.basketContent[i].qty = newQty;
  }
}
