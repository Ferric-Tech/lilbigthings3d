import { Injectable } from '@angular/core';
import { BasketItem } from '../pages/home-page/basket-view/basket-view.component';
import { FirestoreManagementService } from './firestore-management/firestore-management.service';
import { AppUserProfile, UserAddress } from './user/user.interface';

export enum OrderStatus {
  Pending = 'Pending',
  Cancelled = 'Cancelled',
  Paid = 'Paid',
  ProductionToCommense = 'Production to commense',
  Production = 'In production',
  ProductionCompletePendingDispatched = 'Production complete, pending dispatch',
  Dispatched = 'Dispatched',
  Complete = 'Complete',
}

export interface UserOrder {
  orderNr?: string;
  date: Date;
  userID: string;
  items: BasketItem[];
  deliveryAddress: UserAddress;
  status: OrderStatus;
}

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private readonly fs: FirestoreManagementService) {}

  async generateOrder(
    basketContent: BasketItem[],
    userProfile: AppUserProfile,
    deliveryAddress: UserAddress
  ): Promise<string> {
    if (!userProfile.id) return '';
    const order: UserOrder = {
      date: new Date(),
      userID: userProfile.id,
      items: basketContent,
      deliveryAddress,
      status: OrderStatus.Pending,
    };
    return await this.fs.addOrder(order);
  }

  getOrderTotal(basketContent: BasketItem[]): number {
    let total = 0;
    for (const item of basketContent) {
      total = total + item.price * item.qty;
    }
    return total;
  }

  async getUserOrdersByID(id: string): Promise<UserOrder[]> {
    const userProfile = await this.fs.getUserProfile(id);
    return userProfile.orders ? userProfile.orders : [];
  }
}
