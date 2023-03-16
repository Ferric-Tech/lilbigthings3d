import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CheckoutViewState } from './models/checkout.enum';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  viewState = CheckoutViewState;
  currentViewState: CheckoutViewState | undefined;
  currentUserID: string | null = '';

  constructor(private readonly authService: AuthenticationService) {}

  async ngOnInit() {
    this.currentUserID = await this.authService.userID;
    if (!this.currentUserID) {
      this.currentViewState = CheckoutViewState.UserNotLoggedIn;
    }
  }
}
