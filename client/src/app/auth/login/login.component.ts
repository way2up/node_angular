import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit() {
    console.log(this.form.value)

    // this.form.disable();

    //  this.aSub =  this.auth.login(this.form.value).subscribe(
    //     () => console.log('Login Success'),
    //     error => {
    //       console.warn(error);
    //       this.form.enable();
    //     }
    //   );
  }

  ngOnDestroy() {

    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
