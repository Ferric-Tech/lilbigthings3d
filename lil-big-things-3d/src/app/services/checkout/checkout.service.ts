/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BasketItem } from 'src/app/pages/home-page/basket-view/basket-view.component';
import { FirestoreManagementService } from '../firestore-management/firestore-management.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(
    private readonly fs: FirestoreManagementService,
    private readonly router: Router
  ) {}

  commenseCheckout(basketContent: BasketItem[]) {
    this.router.navigate(['./checkout']);
    // const orderNr = this.fs.generateOrder(basketContent);
  }
}

//         const passPhrase = 'SaltAndPepperPig';
//     const sandboxPostPaymentUrl = 'https://sandbox.payfast.co.za/eng/process';
//     const sandboxTransactionNotificationURL =
//       'https://sandbox.payfast.co.za/eng/query/validate';
//     const livePostPaymentUrl = 'https://www.payfast.co.za/eng/process';
//     const liveTransactionNotificationURL =
//       'https://www.payfast.co.za/eng/query/validate';
//     const payload = {
//       //   merchant_id: '13393193',
//       merchant_id: '10028928', // Test account
//       //   merchant_key: '2cgbcr4cuy37f',
//       merchant_key: 'epkxlr70xksdr', // Test account
//       return_url: './checkout-success', //The URL where the user is returned to after payment has been successfully taken.
//       cancel_url: './checkout-cancel', // The URL where the user should be redirected should they choose to cancel their payment while on the PayFast system.
//       notify_url: './checkout-notify', //The URL which is used by PayFast to post the Instant Transaction Notifications (ITNs) for this transaction.
//       name_first: '',
//       name_last: '',
//       email_address: '',
//       cell_number: '',
//       m_payment_id: '',
//       amount: '',
//       item_name: '',
//       item_description: '',
//       custom_int1: '',
//       custom_str1: '',
//       email_confirmation: '',
//       confirmation_address: '',
//       payment_method: '',
//     };
//     console.log(payload);
//   }
