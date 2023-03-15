import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductData } from '../../admin-page/admin-dashboard/product-management/models/product.interface';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  productID: string | undefined;
  productData: ProductData | undefined;
  primaryImageUrl = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fs: FirestoreManagementService,
    private readonly cd: ChangeDetectorRef,
    private readonly productService: ProductService
  ) {}

  async ngOnInit() {
    this.productID = this.route.snapshot.paramMap.get('productId') || '';

    if (!this.productID) return;
    this.productData = await this.fs.getProductDataByID(this.productID);
    this.primaryImageUrl = this.productData['primary-image-url'];
    this.cd.detectChanges();
  }

  onAddToBasketClick() {
    if (!this.productID) return;
    this.productService.addProductToBasket(this.productID);
  }
}
