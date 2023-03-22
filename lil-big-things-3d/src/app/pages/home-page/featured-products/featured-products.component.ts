import { Component, OnInit } from '@angular/core';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';
import { ProductForDisplay } from '../../admin-page/admin-dashboard/product-management/models/product.interface';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit {
  productsForDisplay: {
    id: string;
    image: string;
    title: string;
    price: number;
    description: string;
  }[] = [];
  isMobileView = false;
  cardInFocusIndex = 0;
  dragPosition = { x: 0, y: 0 };

  constructor(private readonly fs: FirestoreManagementService) {}

  async ngOnInit(): Promise<void> {
    this.determineView();
    await this.setFeaturedProducts();
  }

  onDragDrop(event: { distance: { x: number } }) {
    let toggleCard = false;
    const distanceDragged = Math.abs(event.distance.x);
    if (distanceDragged / window.innerWidth > 0.25) {
      toggleCard = true;
    }
    if (!toggleCard) return;
    this.cardInFocusIndex =
      event.distance.x > 0
        ? this.cardInFocusIndex + 1
        : this.cardInFocusIndex - 1;

    this.cardInFocusIndex =
      this.cardInFocusIndex > 0
        ? this.cardInFocusIndex
        : this.productsForDisplay.length - 1;

    this.cardInFocusIndex =
      this.cardInFocusIndex < this.productsForDisplay.length
        ? this.cardInFocusIndex
        : 0;

    console.log(this.cardInFocusIndex);
    this.dragPosition = { x: 0, y: 0 };
  }

  private determineView() {
    this.isMobileView = window.innerWidth < 400;
  }

  private async setFeaturedProducts(): Promise<void> {
    const products: ProductForDisplay[] = await this.fs.getAllProducts();

    for (let i = 0; i < products.length; i++) {
      this.productsForDisplay.push({
        id: products[i].id,
        title: products[i].data.title,
        image: products[i].data['primary-image-url'],
        price: 10,
        description: products[i].data.description.slice(0, 128),
      });
    }
  }
}
