import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService, NbResetPasswordComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class NgxResetPasswordComponent extends NbResetPasswordComponent {

  public userId: string;
  public errorMessage: string;
  public successMessage: string;

  constructor(service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {}, cd: ChangeDetectorRef,
    router: Router, private auth: AuthService, private route: ActivatedRoute) {
    super(service, options, cd, router)
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params[`userId`];
    })
  }

  resetPass(): void {
    const data = {
      userId: this.userId,
      new_password: this.user.confirmPassword
    }
    this.auth.userChangePassword(data).subscribe(
      (data) => {

        if (data[`message`] === 'Your password successfully updated.') {
        this.successMessage = data[`message`];
        } else {
          this.errorMessage = data[`message`];
        }

      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }
}