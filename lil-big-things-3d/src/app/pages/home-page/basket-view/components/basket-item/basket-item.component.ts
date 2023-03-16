import { Component, Input } from '@angular/core';
import { BasketItem } from '../../basket-view.component';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
})
export class BasketItemComponent {
  @Input() item: BasketItem | undefined;

  qty = 1;

  onPlusClick() {
    this.qty += 1;
  }

  onMinusClick() {
    this.qty -= 1;
  }
}
