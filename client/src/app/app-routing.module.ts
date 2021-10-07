import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./auth/auth.module").then((module) => module.AuthModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./auth/auth.module").then((module) => module.AuthModule),
  },
  {
    path: "home",
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
