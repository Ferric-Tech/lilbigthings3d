export enum EventChannel {
  None = 'none',
  Product = 'product',
  Basket = 'basket',
}

export enum EventTopic {
  None = 'none',
  Loading = 'loading',
  ProductAddedToBasket = 'product-added-to-basket',
  CheckoutRequested = 'checkout-requested',
}
