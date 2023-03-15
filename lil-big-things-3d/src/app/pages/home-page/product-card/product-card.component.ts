import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product:
    | {
        id: string;
        image: string;
        title: string;
        price: number;
        description: string;
      }
    | undefined;

  onProductcardClicked() {
    console.log(this.product?.id);
  }
}
