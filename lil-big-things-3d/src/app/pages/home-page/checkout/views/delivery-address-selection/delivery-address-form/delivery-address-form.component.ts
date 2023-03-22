import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserAddress } from 'src/app/services/user/user.interface';
import { UserService } from 'src/app/services/user/user.service';

export enum AddressType {
  House = 'House',
  Flat = 'Flat/Apartment',
  Farm = 'Farm/Small holding',
}

@Component({
  selector: 'app-delivery-address-form',
  templateUrl: './delivery-address-form.component.html',
  styleUrls: ['./delivery-address-form.component.scss'],
})
export class DeliveryAddressFormComponent {
  @Output() addressSubmitted: EventEmitter<UserAddress> = new EventEmitter();

  addressType = AddressType;

  deliveryAddressForm = new FormGroup({
    addressType: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    streetAddress1: new FormControl('', Validators.required),
    streetAddress2: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthenticationService
  ) {}

  async onSubmit() {
    const userID = await this.authService.userID;

    if (!userID || this.deliveryAddressForm.invalid) return;
    await this.userService.addUserDeliveryAddress(
      userID,
      this.deliveryAddressForm.value as UserAddress
    );
    this.addressSubmitted.emit(this.deliveryAddressForm.value as UserAddress);
  }
}
