import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin.page';
import { HomePageComponent } from './pages/home-page/home.page';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'admin',
    component: AdminPageComponent,
    // children: [
    //   {
    //     path: 'child-a', // child route path
    //     component: ChildAComponent, // child route component that the router renders
    //   },
    //   {
    //     path: 'child-b',
    //     component: ChildBComponent, // another child route component that the router renders
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
