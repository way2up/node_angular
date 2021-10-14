import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VacancyService } from '../shared/services/vacancy.service';

@Component({
  selector: 'app-vacancy-form',
  templateUrl: './vacancy-form.component.html',
  styleUrls: ['./vacancy-form.component.scss']
})
export class VacancyFormComponent implements OnInit {

  public form: FormGroup;
  public selectedStack = 'Select Your Stack';
  constructor(private vacancyService: VacancyService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      city: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      telephone: new FormControl(null, [Validators.required]),
      // file: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  selectStack(data: string): void {
    this.selectedStack = data;
  }

  setVacancy() {
    this.form.disable();
    if( this.selectedStack === 'Select Your Stack' ) {
      alert('Select Your Stack');
      this.form.enable();
      return;
    }
    this.form.value.stack = this.selectedStack;
    console.log(this.form.value)
     this.vacancyService.setVacancy(this.form.value).subscribe(
      (data) => {
        console.log(data)
        // this.router.navigate(['/home']);
      },
      error => {
        console.warn(error);
        this.form.enable();
      }
    );

  }

}
