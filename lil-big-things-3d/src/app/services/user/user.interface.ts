export interface UserProfile {
  //   [key: string]: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  cellNumber: string;
  deliveryAddresses: UserAddress[];
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
