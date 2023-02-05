import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPrintFileComponent } from './pages/admin-page/admin-dashboard/add-print-file/add-print-file.component';
import { AdminDashboardComponent } from './pages/admin-page/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './pages/admin-page/admin-login/admin-login.component';
import { AdminPageComponent } from './pages/admin-page/admin.page';
import { HomePageComponent } from './pages/home-page/home.page';
import { RegisterComponent } from './pages/home-page/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'register',
        title: 'Register new user',
        component: RegisterComponent,
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
            path: 'add-print',
            title: 'Add new print',
            component: AddPrintFileComponent,
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
