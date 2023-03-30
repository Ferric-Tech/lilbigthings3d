import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { OrdersService, UserOrder } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss'],
})
export class OrdersViewComponent implements OnInit {
  userOrders: UserOrder[] = [];
  currentOrder: UserOrder | undefined;
  showOrderDetail = false;

  constructor(
    private readonly orderService: OrdersService,
    private readonly authService: AuthenticationService,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const userID = await this.authService.userID;
    if (userID) {
      this.userOrders = await this.orderService.getUserOrdersByID(userID);
    } else {
      this.router.navigate(['sign-in']);
    }

    for (const order of this.userOrders) {
      order.date = (order.date as unknown as Timestamp).toDate();
    }

    this.cd.detectChanges();
  }

  onOrderClick(order: UserOrder) {
    this.currentOrder = order;
    this.showOrderDetail = true;
  }

  onDetailClose() {
    this.showOrderDetail = false;
  }
}
