import { ChangeDetectorRef, Component } from '@angular/core';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';
import { ProductForDisplay } from '../../admin-page/admin-dashboard/product-management/models/product.interface';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent {
  productsForDisplay: {
    id: string;
    title: string;
    price: number;
    description: string;
  }[] = [];

  constructor(
    private readonly fs: FirestoreManagementService,
    private readonly cd: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    await this.setFeaturedProducts();
    // this.cd.detectChanges();
  }

  private async setFeaturedProducts(): Promise<void> {
    let products: ProductForDisplay[] = await this.fs.getAllProducts();

    for (var i = 0; i < 5; i++) {
      this.productsForDisplay.push({
        id: products[0].id,
        title: products[0].data.title,
        price: 10,
        description: products[0].data.description.slice(0, 128),
      });
    }
  }
}
