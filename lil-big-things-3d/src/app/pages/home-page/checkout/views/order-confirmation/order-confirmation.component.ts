import { Component, Input } from '@angular/core';
import { PayFastParms } from 'src/app/services/checkout/checkout.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
})
export class OrderConfirmationComponent {
  @Input() payFastParms: PayFastParms | undefined;
}
