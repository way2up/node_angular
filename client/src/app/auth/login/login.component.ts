import { Component } from '@angular/core';
import { NbAuthResult, NbAuthService, NbLoginComponent } from '@nebular/auth';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent {


  private auth: AuthService
  // constructor() { 
  //   // super(service: NbAuthService, options: {}, cd: ChangeDetectorRef, router: Router)
  //   super()
  //   this.service
  // }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      debugger
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
          // return this.router.navigateByUrl('/pages');
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
