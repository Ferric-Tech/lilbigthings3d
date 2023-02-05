import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-page/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './pages/admin-page/admin-login/admin-login.component';
import { AdminPageComponent } from './pages/admin-page/admin.page';
import { HomePageComponent } from './pages/home-page/home.page';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'admin',
    component: AdminPageComponent,
    children: [
      {
        path: 'login',
        component: AdminLoginComponent,
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
