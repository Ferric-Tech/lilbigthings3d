import { Injectable } from '@angular/core';
import { LocalStorageItem } from '../local-storage/local-storage.enum';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly localStorageService: LocalStorageService) {}

  addProductToBasket(id: string) {
    let currentBasket =
      (this.localStorageService.get(LocalStorageItem.Basket) as string[]) || [];
    currentBasket.push(id);
    this.localStorageService.set(
      LocalStorageItem.Basket,
      currentBasket as string[]
    );
  }
}
