import { Injectable } from '@angular/core';
import { FirestoreManagementService } from '../firestore-management/firestore-management.service';
import { UserAddress, UserProfile } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly fs: FirestoreManagementService) {}

  async getUserProfileByID(id: string) {
    const userProfile = await this.fs.getUserProfile(id);
    if (!userProfile) return null;
    userProfile.id = id;
    return userProfile;
  }

  async setUserProfile(userProfile: UserProfile) {
    this.fs.setUserProfile(userProfile);
  }

  async getUserDeliveryAddresses(id: string): Promise<UserAddress[]> {
    const userProfile = await this.fs.getUserProfile(id);
    if (!userProfile) return [];
    return userProfile.deliveryAddresses;
  }

  async addUserDeliveryAddress(
    id: string,
    address: UserAddress
  ): Promise<void> {
    const userProfile = await this.fs.getUserProfile(id);
    if (!userProfile) return;
    const currentAddresses = userProfile.deliveryAddresses || [];
    currentAddresses.push(address);
    userProfile.deliveryAddresses = currentAddresses;
    userProfile.id = id;
    this.setUserProfile(userProfile);
  }
}
