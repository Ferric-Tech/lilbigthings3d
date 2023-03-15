import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-page/admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './pages/admin-page/admin-dashboard/product-management/add-product/add-product.component';
import { EditProductComponent } from './pages/admin-page/admin-dashboard/product-management/edit-product/edit-product.component';
import { ViewProductsComponent } from './pages/admin-page/admin-dashboard/product-management/view-products/view-products.component';
import { AdminLoginComponent } from './pages/admin-page/admin-login/admin-login.component';
import { AdminPageComponent } from './pages/admin-page/admin.page';
import { FeaturedProductsComponent } from './pages/home-page/featured-products/featured-products.component';
import { HomePageComponent } from './pages/home-page/home.page';
import { ProductViewComponent } from './pages/home-page/product-view/product-view.component';
import { RegisterComponent } from './pages/home-page/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'featured-products', pathMatch: 'full' },
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'register',
        title: 'Register new user',
        component: RegisterComponent,
      },
      {
        path: 'featured-products',
        title: 'Featured products',
        component: FeaturedProductsComponent,
      },
      {
        path: 'product/:productId',
        title: 'View product',
        component: ProductViewComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    children: [
      {
        path: 'login',
        title: 'Admin login',
        component: AdminLoginComponent,
      },
      {
        path: 'dashboard',
        title: 'Admin dashboard',
        component: AdminDashboardComponent,
        children: [
          {
            path: 'add-product',
            title: 'Add new product',
            component: AddProductComponent,
          },
          {
            path: 'edit-product/:productId',
            title: 'Edit product',
            component: EditProductComponent,
          },
          {
            path: 'products-list',
            title: 'View all products',
            component: ViewProductsComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
