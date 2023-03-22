import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageItem } from 'src/app/services/local-storage/local-storage.enum';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

export interface BasketItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  qty: number;
}

@Component({
  selector: 'app-basket-view',
  templateUrl: './basket-view.component.html',
  styleUrls: ['./basket-view.component.scss'],
})
export class BasketViewComponent implements OnInit {
  basketContent: BasketItem[] = [];
  showDeleteDialog = false;
  itemForDeletionIndex = 0;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.basketContent = this.localStorageService.get(LocalStorageItem.Basket);
    this.cd.detectChanges();
  }

  onCheckoutClick() {
    this.localStorageService.set(LocalStorageItem.Basket, this.basketContent);
    this.router.navigate(['checkout']);
  }

  onQtyUpdate(newQty: number, itemIndex: number) {
    this.basketContent[itemIndex].qty = newQty;
    this.showDeleteDialog = !newQty;
    if (this.showDeleteDialog) {
      this.itemForDeletionIndex = itemIndex;
    }
  }

  closeDeleteDialog() {
    this.showDeleteDialog = false;
  }

  deleteItem() {
    this.showDeleteDialog = false;
    this.basketContent.splice(this.itemForDeletionIndex, 1);
    this.localStorageService.set(LocalStorageItem.Basket, this.basketContent);
  }
}
