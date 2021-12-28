import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../@theme/theme.module';
import { NbAuthModule } from '@nebular/auth';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NgxRegisterComponent } from './register/register.component';
import { NgxLoginComponent } from './login/login.component';
import { NgxForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgxResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule.forRoot(),
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbAuthModule

  ],
  declarations: [ NgxLoginComponent, NgxRegisterComponent, NgxForgotPasswordComponent, NgxResetPasswordComponent]
})
export class AuthModule { }