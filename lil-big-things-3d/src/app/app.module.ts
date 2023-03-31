import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import {
  provideRemoteConfig,
  getRemoteConfig,
} from '@angular/fire/remote-config';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { HomePageComponent } from './pages/home-page/home.page';
import { AdminPageComponent } from './pages/admin-page/admin.page';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AdminLoginComponent } from './pages/admin-page/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-page/admin-dashboard/admin-dashboard.component';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { ViewProductsComponent } from './pages/admin-page/admin-dashboard/product-management/view-products/view-products.component';
import { MatTableModule } from '@angular/material/table';
import { AddProductComponent } from './pages/admin-page/admin-dashboard/product-management/add-product/add-product.component';
import { EditProductComponent } from './pages/admin-page/admin-dashboard/product-management/edit-product/edit-product.component';
import { LoadingScreenComponent } from './shared/loading-screen/loading-screen.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProductViewComponent } from './pages/home-page/product-view/product-view.component';
import { MatIconModule } from '@angular/material/icon';
import { BasketViewComponent } from './pages/home-page/basket-view/basket-view.component';
import { BasketItemComponent } from './pages/home-page/basket-view/components/basket-item/basket-item.component';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { DeleteBasketItemDialogComponent } from './pages/home-page/basket-view/components/delete-basket-item-dialog/delete-basket-item-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EmptyBasketNoticeDialogComponent } from './pages/home-page/basket-view/components/empty-basket-notice-dialog/empty-basket-notice-dialog.component';
import { DynanmicMultiColumnFormComponent } from './forms/templates/dynamic-multi-column-form/dynamic-multi-column-form.component';
import { CheckoutComponent } from './pages/home-page/checkout-view/checkout.component';
import { AddressOptionDialogComponent } from './pages/home-page/checkout-view/views/delivery-address-selection/address-option-dialog/address-option-dialog.component';
import { DeleteAddressDialogComponent } from './pages/home-page/checkout-view/views/delivery-address-selection/delete-address-dialog/delete-address-dialog.component';
import { DeliveryAddressFormComponent } from './pages/home-page/checkout-view/views/delivery-address-selection/delivery-address-form/delivery-address-form.component';
import { DeliveryAddressSelectionComponent } from './pages/home-page/checkout-view/views/delivery-address-selection/delivery-address-selection.component';
import { OrderConfirmationComponent } from './pages/home-page/checkout-view/views/order-confirmation/order-confirmation.component';
import { OrderContentTableComponent } from './pages/home-page/checkout-view/views/order-confirmation/order-content-table/order-content-table.component';
import { UserProfileFormComponent } from './pages/home-page/checkout-view/views/user-profile-form/user-profile-form.component';
import { FeaturedProductsComponent } from './pages/home-page/shared-components/featured-products/featured-products.component';
import { NavbarComponent } from './pages/home-page/shared-components/navbar/navbar.component';
import { ProductCardComponent } from './pages/home-page/shared-components/product-card/product-card.component';
import { RegisterComponent } from './pages/home-page/shared-components/user-register/register.component';
import { SigninUserComponent } from './pages/home-page/shared-components/user-sign-in/login-user.component';
import { PaymentSuccessComponent } from './pages/home-page/payment-result/payment-success/payment-success.component';
import { PaymentCancelComponent } from './pages/home-page/payment-result/payment-cancel/payment-cancel.component';
import { PaymentNotifyComponent } from './pages/home-page/payment-result/payment-notify/payment-notify.component';
import { PaymentResultComponent } from './pages/home-page/payment-result/payment-result.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OrdersViewComponent } from './pages/home-page/orders-view/orders-view.component';
import { SignOutDialogComponent } from './shared/sign-out-dialog/sign-out-dialog.component';
import { GoogleButtonComponent } from './pages/home-page/shared-components/user-sign-in/google-button/google-button.component';
import { FacebookButtonComponent } from './pages/home-page/shared-components/user-sign-in/facebook-button/facebook-button.component';
import { NavbarMenuComponent } from './pages/home-page/shared-components/navbar/navbar-menu/navbar-menu.component';
import { OrderDetailComponent } from './pages/home-page/orders-view/order-detail/order-detail.component';
import { OrderOptionDialogComponent } from './pages/home-page/orders-view/order-option-dialog/order-option-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AdminPageComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    ErrorModalComponent,
    RegisterComponent,
    AddProductComponent,
    ViewProductsComponent,
    DynanmicMultiColumnFormComponent,
    EditProductComponent,
    LoadingScreenComponent,
    FeaturedProductsComponent,
    ProductCardComponent,
    ProductViewComponent,
    NavbarComponent,
    BasketViewComponent,
    BasketItemComponent,
    CheckoutComponent,
    SigninUserComponent,
    UserProfileFormComponent,
    DeliveryAddressSelectionComponent,
    DeliveryAddressFormComponent,
    OrderConfirmationComponent,
    DeleteBasketItemDialogComponent,
    AddressOptionDialogComponent,
    DeleteAddressDialogComponent,
    OrderContentTableComponent,
    EmptyBasketNoticeDialogComponent,
    PaymentSuccessComponent,
    PaymentCancelComponent,
    PaymentNotifyComponent,
    PaymentResultComponent,
    OrdersViewComponent,
    SignOutDialogComponent,
    GoogleButtonComponent,
    FacebookButtonComponent,
    NavbarMenuComponent,
    OrderDetailComponent,
    OrderOptionDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    DragDropModule,
    MatSnackBarModule,
  ],
  providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
