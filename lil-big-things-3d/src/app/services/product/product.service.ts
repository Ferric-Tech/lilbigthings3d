import { Injectable } from '@angular/core';
import { BasketItem } from 'src/app/pages/home-page/basket-view/basket-view.component';
import { LocalStorageItem } from '../local-storage/local-storage.enum';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly localStorageService: LocalStorageService) {}

  addProductToBasket(product: BasketItem): Promise<void> {
    return new Promise((resolve) => {
      let currentBasket = this.localStorageService.get(LocalStorageItem.Basket);

      if (!currentBasket) {
        this.localStorageService.set(LocalStorageItem.Basket, [product]);
        resolve();
      }

      (currentBasket as BasketItem[]).push(product);
      this.localStorageService.set(LocalStorageItem.Basket, currentBasket);

      resolve();
    });
  }
}
