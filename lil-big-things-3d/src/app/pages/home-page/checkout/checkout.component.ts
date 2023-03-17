import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import {
  EventChannel,
  EventTopic,
} from 'src/app/services/event-management/event-management.enum';
import { EventManagementService } from 'src/app/services/event-management/event-management.service';
import { UserProfile } from 'src/app/services/user/user.interface';
import { UserService } from 'src/app/services/user/user.service';
import { BasketItem } from '../basket-view/basket-view.component';
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
  user: User | undefined;
  userProfile: UserProfile | null | undefined;
  basketContent: BasketItem[] = [];

  constructor(
    private readonly authService: AuthenticationService,
    private readonly checkoutService: CheckoutService,
    private readonly eventService: EventManagementService,
    private readonly userService: UserService
  ) {}

  async ngOnInit() {
    this.subscribeToBasket();
    // this.checkoutService.commenseCheckout(this.basketContent);
    this.currentUserID = await this.authService.userID;
    if (!this.currentUserID) {
      this.currentViewState = CheckoutViewState.UserNotLoggedIn;
      return;
    }
    this.getUserProfile();
  }

  subscribeToBasket() {
    this.eventService.subscribe(
      EventChannel.Basket,
      EventTopic.CheckoutRequested,
      (data) => {
        this.basketContent = data.payload as BasketItem[];
      },
      true
    );
  }

  async getUserProfile(user?: User) {
    if (!user) {
      const currentUser = await this.authService.user;
      if (currentUser) {
        user = currentUser;
      }
    }

    this.currentUserID = await this.authService.userID;
    if (!this.currentUserID) return;

    this.userProfile = await this.userService.getUserProfileByID(
      this.currentUserID
    );
    if (!this.userProfile && user) {
      this.userProfile = this.buildUserProfile(user);
    }

    if (!this.userProfile) return;

    this.currentViewState = this.isUserProfileComplete(this.userProfile)
      ? this.viewState.AddressRequired
      : this.viewState.IncompleteProfile;
  }

  private buildUserProfile(user: User): UserProfile {
    const firstName =
      user.displayName?.substring(0, user.displayName?.indexOf(' ')) || '';
    const lastName =
      user.displayName?.substring(user.displayName?.indexOf(' ')) || '';
    const newUserProfile = {
      id: this.currentUserID,
      firstName,
      lastName,
      email: user.email,
      cellNumber: user.phoneNumber,
    } as UserProfile;
    return newUserProfile;
  }

  setUserProfile(userProfile: UserProfile) {
    this.userProfile = userProfile;
    if (!this.currentUserID) return;
    this.userProfile.id = this.currentUserID;
    this.userService.setUserProfile(this.userProfile);
  }

  isUserProfileComplete(userProfile: UserProfile): boolean {
    let isComplete = true;
    Object.keys(userProfile).forEach((key) => {
      if (!userProfile[key as keyof UserProfile]) {
        isComplete = false;
      }
    });
    return isComplete;
  }
}
