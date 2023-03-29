import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import {
  UserAddress,
  AppUserProfile,
} from 'src/app/services/user/user.interface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-delivery-address-selection',
  templateUrl: './delivery-address-selection.component.html',
  styleUrls: ['./delivery-address-selection.component.scss'],
})
export class DeliveryAddressSelectionComponent implements OnInit {
  @Input() userProfile: AppUserProfile | null | undefined;
  @Output() addressSelected: EventEmitter<UserAddress> = new EventEmitter();

  selectedAddressForm = new FormGroup({
    selectedAddress: new FormControl('', Validators.required),
  });

  userAddresses: UserAddress[] | undefined;
  addNewAddress = false;
  showOptions = false;
  addressIndexInFocus = 0;
  currentAddress: UserAddress | undefined;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthenticationService
  ) {}

  async ngOnInit() {
    this.getUserAddresses();
  }

  onAddNewAddressClick() {
    this.addNewAddress = true;
  }

  onAddessClick(index: number) {
    if (!this.userAddresses) return;
    this.selectedAddressForm.controls['selectedAddress'].setValue(
      index.toString()
    );
  }

  onAddressOptionsClicked(index: number) {
    this.addressIndexInFocus = index;
    this.showOptions = true;
  }

  onAddressEditClicked() {
    if (!this.userAddresses) {
      return;
    }
    this.currentAddress = this.userAddresses[this.addressIndexInFocus];

    this.showOptions = false;
    this.addNewAddress = true;
  }

  async onAddressDeleteClicked() {
    this.userAddresses?.splice(this.addressIndexInFocus, 1);
    const userID = await this.authService.userID;
    if (userID && this.userAddresses !== undefined) {
      this.userService.updateUserDeliveryAddresses(userID, this.userAddresses);
    }
    this.showOptions = false;
  }

  closeOptionDialog() {
    this.showOptions = false;
  }

  onSubmit() {
    if (this.selectedAddressForm.invalid || !this.userProfile) return;
    this.addressSelected.emit(
      this.userProfile.deliveryAddresses[
        parseInt(
          this.selectedAddressForm.get('selectedAddress')?.value as string
        )
      ]
    );
  }

  async onNewAddressSubmitted(newAddress: UserAddress) {
    await this.getUserAddresses();
    this.userAddresses?.push(newAddress);
    this.addNewAddress = false;
  }

  async onAddressUpdated(newAddress: UserAddress) {
    await this.getUserAddresses();
    const userID = await this.authService.userID;
    if (!this.userAddresses || !userID) {
      return;
    }

    this.userAddresses[this.addressIndexInFocus] = newAddress;
    this.addNewAddress = false;

    this.userService.updateUserDeliveryAddresses(userID, this.userAddresses);
  }

  private getUserAddresses() {
    if (!this.userProfile) return;
    this.userAddresses = this.userProfile.deliveryAddresses;
  }
}
