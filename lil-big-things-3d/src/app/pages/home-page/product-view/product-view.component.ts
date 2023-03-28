import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  EventChannel,
  EventTopic,
} from 'src/app/services/event-management/event-management.enum';
import { EventManagementService } from 'src/app/services/event-management/event-management.service';
import { FirestoreManagementService } from 'src/app/services/firestore-management/firestore-management.service';
import { ProductService } from 'src/app/services/product/product.service';
import {
  ProductData,
  ProductImageUrls,
} from '../../admin-page/admin-dashboard/product-management/models/product.interface';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.determineView();
  }

  productID: string | undefined;
  productData: ProductData | undefined;
  primaryImageUrl = '';
  showFullDescription = false;
  isMobileView = false;
  imageUrls: string[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fs: FirestoreManagementService,
    private readonly cd: ChangeDetectorRef,
    private readonly productService: ProductService,
    private readonly eventService: EventManagementService
  ) {}

  async ngOnInit() {
    this.determineView();
    await this.setProductData();
    await this.setProductImages();
    this.cd.detectChanges();
  }

  async onAddToBasketClick() {
    if (!this.productID) return;
    await this.productService.addProductToBasket({
      id: this.productID,
      title: this.productData?.title || '',
      imageUrl: this.primaryImageUrl,
      price: 10,
      qty: 1,
    });

    this.eventService.publish(
      EventChannel.Product,
      EventTopic.BasketContentAmended
    );
  }

  toggleShowDecription(): void {
    this.showFullDescription = !this.showFullDescription;
  }

  changePrimaryImage(index: number) {
    this.primaryImageUrl = this.imageUrls[index];
  }

  private determineView() {
    this.isMobileView = window.innerWidth < 400;
  }

  private async setProductData() {
    this.productID = this.route.snapshot.paramMap.get('productId') || '';
    if (!this.productID) return;
    this.productData = await this.fs.getProductDataByID(this.productID);
    this.primaryImageUrl = this.productData['primary-image-url'];
  }

  private async setProductImages() {
    await this.getImagesForDisplay().then((imageCollections) => {
      if (!imageCollections) return;

      Object.keys(imageCollections).forEach((collection) => {
        this.imageUrls.push(...(imageCollections[collection] as string[]));
      });
    });
  }

  private async getImagesForDisplay(): Promise<ProductImageUrls> {
    if (!this.productID) return {};
    return await this.productService.getImagesByID(this.productID);
  }
}
