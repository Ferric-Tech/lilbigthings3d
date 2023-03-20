/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { BasketItem } from 'src/app/pages/home-page/basket-view/basket-view.component';
import { FirestoreManagementService } from '../firestore-management/firestore-management.service';
import { UserAddress, UserProfile } from '../user/user.interface';
import { Md5 } from 'ts-md5';

export enum OrderStatus {
  Pending,
  Cancelled,
  Paid,
  Printing,
  Dispatched,
  Complete,
}

export interface UserOrder {
  date: Date;
  userID: string;
  items: BasketItem[];
  deliveryAddress: UserAddress;
  status: OrderStatus;
}

export interface PayFastFormParms {
  [key: string]: string;
  merchant_id: string;
  merchant_key: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  name_first: string;
  name_last: string;
  email_address: string;
  cell_number: string;
  m_payment_id: string;
  amount: string;
  item_name: string;
  item_description: string;
  custom_int1: string;
  custom_str1: string;
  email_confirmation: string;
  confirmation_address: string;
  payment_method: string;
}

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private readonly fs: FirestoreManagementService) {}

  async generatePayFastParameters(
    basketContent: BasketItem[],
    userProfile: UserProfile,
    deliveryAddress: UserAddress
  ) {
    const orderNr = await this.generateOrder(
      basketContent,
      userProfile,
      deliveryAddress
    );
    const orderTotal = this.getOrderTotal(basketContent);
    const paymentPayload = this.setPaymentPayload(
      orderNr,
      userProfile,
      orderTotal
    );
    const passPhrase = 'SaltAndPepperPig';
    const signature = this.generateSignature(paymentPayload, passPhrase);
    console.log(signature);
  }

  private async generateOrder(
    basketContent: BasketItem[],
    userProfile: UserProfile,
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

  private getOrderTotal(basketContent: BasketItem[]): number {
    let total = 0;
    for (const item of basketContent) {
      total = total + item.price * item.qty;
    }
    return total;
  }

  private setPaymentPayload(
    orderNr: string,
    userProfile: UserProfile,
    orderTotal: number
  ) {
    const sandboxPostPaymentUrl = 'https://sandbox.payfast.co.za/eng/process';
    const sandboxTransactionNotificationURL =
      'https://sandbox.payfast.co.za/eng/query/validate';
    // const livePostPaymentUrl = 'https://www.payfast.co.za/eng/process';
    // const liveTransactionNotificationURL =
    //   'https://www.payfast.co.za/eng/query/validate';
    return {
      //   merchant_id: '13393193',
      merchant_id: '10028928', // Test account
      //   merchant_key: '2cgbcr4cuy37f',
      merchant_key: 'epkxlr70xksdr', // Test account
      return_url: './checkout-success',
      cancel_url: './checkout-cancel',
      notify_url: './checkout-notify',
      name_first: userProfile.firstName,
      name_last: userProfile.lastName,
      email_address: userProfile.email,
      cell_number: userProfile.cellNumber,
      //   m_payment_id: '', Optional
      amount: orderTotal.toString(),
      item_name: orderNr,
      //   item_description: '', Optional
      //   custom_int1: '', Optional
      //   custom_str1: '', Optional
      email_confirmation: '1',
      confirmation_address: userProfile.email,
      payment_method: 'cc',
    };
  }

  generateSignature = (
    paymentPayload: Record<string, string>,
    passPhrase = ''
  ) => {
    // Create parameter string
    let pfOutput = '';
    Object.keys(paymentPayload).forEach((key) => {
      pfOutput += `${key}=${encodeURIComponent(
        paymentPayload[key].trim()
      ).replace(/%20/g, '+')}&`;
    });

    // Remove last ampersand
    let getString = pfOutput.slice(0, -1);
    if (passPhrase !== '') {
      getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(
        /%20/g,
        '+'
      )}`;
    }

    return Md5.hashStr(getString);
  };
}
