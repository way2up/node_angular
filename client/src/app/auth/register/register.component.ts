import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { NbAuthService, NbRegisterComponent, NB_AUTH_OPTIONS } from '@nebular/auth';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class NgxRegisterComponent extends NbRegisterComponent {
  user: any
  constructor(service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {}, cd: ChangeDetectorRef, router: Router, private auth: AuthService) {
    super(service, options, cd, router)
  }
  register() {
    this.auth.register(this.user).subscribe(
      (data) => {
        localStorage.setItem("reloadPage", "true");
        this.router.navigate(['/vacancy/candidatePage']);
      },
      err => {
        console.log(err)
      }
    )
  }

}
