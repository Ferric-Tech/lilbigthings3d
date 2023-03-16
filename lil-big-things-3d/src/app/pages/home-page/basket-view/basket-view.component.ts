import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LocalStorageItem } from 'src/app/services/local-storage/local-storage.enum';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

export interface BasketItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
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
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.basketContent = this.localStorageService.get(LocalStorageItem.Basket);
    this.cd.detectChanges();
  }
}
