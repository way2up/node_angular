import { Component, Inject, OnInit } from '@angular/core';
import { NbAuthResult, NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class NgxLoginComponent extends NbLoginComponent implements OnInit {

  public errorMessage: string;

  constructor(service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {}, cd: ChangeDetectorRef, router: Router, private auth: AuthService) {
    super(service, options, cd, router)
  }

  ngOnInit(): void {
  }


  login(): void {
    this.user.rememberMe ? localStorage.setItem('remember', 'true') : localStorage.setItem('remember', 'false');
    this.errorMessage = '';
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      this.user.email = this.user.email.toLowerCase();
      this.auth.login(this.user).subscribe(
        (data) => {
          this.messages = result.getMessages();
          if (data.user.role === 'Admin') {
            return this.router.navigateByUrl('/pages');
          } else if (data.user.role === 'Candidate') {
            localStorage.setItem("reloadPage", "true");
            sessionStorage.setItem("rememberSession", 'true');
            this.router.navigate(['vacancy/candidatePage']);
          }
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    });
  }


}
