import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardAdmin } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./vacancy-form/vacancy-form.module')
      .then(m => m.VacancyFormModule),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then((module) => module.AuthModule),
  },
  {
    path: 'pages',
    canActivate: [AuthGuardAdmin],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'vacancy',
    loadChildren: () => import('./vacancy-form/vacancy-form.module')
      .then(m => m.VacancyFormModule),
  },

  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, config),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
