export interface UserProfile {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  cellNumber: string;
  deliveryAddresses: UserAddress[];
  profilePic?: string;
}

export interface UserAddress {
  description: string;
  addressType: string;
  number: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
}
