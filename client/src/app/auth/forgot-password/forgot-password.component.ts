import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbRequestPasswordComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { AuthService, UserChangePassword } from '../../shared/services/auth.service';

@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class NgxForgotPasswordComponent extends NbRequestPasswordComponent  {

public errorMessage: string;
public successMessage: string;

  constructor(service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {}, cd: ChangeDetectorRef, router: Router, private auth: AuthService) {
    super(service, options, cd, router)
  }

  ngOnInit(): void {
  }

  requestPass(): void {
    this.auth.checkUser(this.user).subscribe(
      (data : UserChangePassword) => {

       if (data.message === 'success') {
        this.auth.sendEmailChangePassword(data).subscribe(res => {
          this.successMessage = res[`message`];
        })
       }

      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }


}
