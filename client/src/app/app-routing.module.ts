import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VacancyFormComponent } from './vacancy-form/vacancy-form.component';

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
  {
    path: "vacancy",
    component: VacancyFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
