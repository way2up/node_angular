import { Component, Inject } from '@angular/core';
import { NbAuthResult, NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent {

  constructor(service: NbAuthService,  @Inject(NB_AUTH_OPTIONS) protected options = {}, cd: ChangeDetectorRef, router: Router, private auth: AuthService) { 
    super(service, options, cd, router)
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      console.log(7789, this.user)
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

       this.auth.login(this.user).subscribe(
        (data) => {
          console.log(data,)
          return this.router.navigateByUrl('/pages');
        },
        err => {
          console.log(err)
        }
      )

      // const redirect = result.getRedirect();
      // if (redirect) {
      //   setTimeout(() => {
      //     return this.router.navigateByUrl('/pages');
      //   }, 2000);
      // }
      // this.cd.detectChanges();
    });
  }
}
