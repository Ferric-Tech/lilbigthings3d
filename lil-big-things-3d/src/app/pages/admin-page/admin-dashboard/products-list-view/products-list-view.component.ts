import { Component, OnInit } from '@angular/core';
import {
  FirestoreManagementService,
  ProductDoc,
} from 'src/app/services/firestore-management/firestore-management.service';

@Component({
  selector: 'app-products-list-view',
  templateUrl: './products-list-view.component.html',
  styleUrls: ['./products-list-view.component.scss'],
})
export class ProductsListViewComponent implements OnInit {
  products: ProductDoc[] = [];
  displayedColumns: string[] = ['title', 'description'];

  constructor(private readonly fs: FirestoreManagementService) {}

  async ngOnInit(): Promise<void> {
    this.products = await this.fs.getAllProducts();
  }
}
