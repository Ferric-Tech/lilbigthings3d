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
import { RegisterComponent } from './pages/home-page/register/register.component';
import { ViewProductsComponent } from './pages/admin-page/admin-dashboard/product-management/view-products/view-products.component';
import { MatTableModule } from '@angular/material/table';
import { DynanmicMultiColumnFormComponent } from './form-templates/templates/dynamic-multi-column-form/dynamic-multi-column-form.component';
import { AddProductComponent } from './pages/admin-page/admin-dashboard/product-management/add-product/add-product.component';
import { EditProductComponent } from './pages/admin-page/admin-dashboard/product-management/edit-product/edit-product.component';
import { LoadingScreenComponent } from './shared/loading-screen/loading-screen.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FeaturedProductsComponent } from './pages/home-page/featured-products/featured-products.component';
import { ProductCardComponent } from './pages/home-page/product-card/product-card.component';
import { ProductViewComponent } from './pages/home-page/product-view/product-view.component';
import { NavbarComponent } from './pages/home-page/components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { BasketViewComponent } from './pages/home-page/basket-view/basket-view.component';
import { BasketItemComponent } from './pages/home-page/basket-view/components/basket-item/basket-item.component';

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
  ],
  providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
