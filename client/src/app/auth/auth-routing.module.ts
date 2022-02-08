import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent, NbLogoutComponent } from '@nebular/auth';  // <---

import { NgxLoginComponent } from './login/login.component';
import { NgxRegisterComponent } from './register/register.component';
import { NgxForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgxResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
    {
        path: '',
        component: NbAuthComponent,
        children: [
            {
                path: '',
                component: NgxLoginComponent,
            },
            // {
            //     path: 'login',
            //     component: NgxLoginComponent,
            // },
            {
                path: 'register',
                component: NgxRegisterComponent,
            },
            {
                path: 'request-password',
                component: NgxForgotPasswordComponent,
            },
            {
                path: 'reset-password',
                component: NgxResetPasswordComponent,
            },
            // {
            //   path: 'logout',
            //   component: NbLogoutComponent,
            // },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}