import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAddress, UserProfile } from 'src/app/services/user/user.interface';

@Component({
  selector: 'app-delivery-address-selection',
  templateUrl: './delivery-address-selection.component.html',
  styleUrls: ['./delivery-address-selection.component.scss'],
})
export class DeliveryAddressSelectionComponent implements OnInit {
  @Input() userProfile: UserProfile | null | undefined;
  @Output() addressSelected: EventEmitter<UserAddress> = new EventEmitter();

  selectedAddressForm = new FormGroup({
    selectedAddress: new FormControl('', Validators.required),
  });

  userAddresses: UserAddress[] | undefined;
  addNewAddress = false;

  async ngOnInit() {
    this.getUserAddresses();
  }

  onAddNewAddressClick() {
    this.addNewAddress = true;
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

  private getUserAddresses() {
    if (!this.userProfile) return;
    this.userAddresses = this.userProfile.deliveryAddresses;
  }
}
