import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VacancyService } from '../@core/data/vacancy.service';

@Component({
  selector: 'app-vacancy-form',
  templateUrl: './vacancy-form.component.html',
  styleUrls: ['./vacancy-form.component.scss']
})
export class VacancyFormComponent implements OnInit {

  public form: FormGroup;
  public selectedPosition = 'Select Position';
  public uploadedFiles: Array<File>;
  public uploadFileName: string;

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

  selectPosition(data: string): void {
    this.selectedPosition = data;
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;

    const formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append('file', this.uploadedFiles[i]);
    }
    // formData.forEach((value, key) => {
    //   console.log(key + " " + value)
    // });
    this.vacancyService.uploadFile(formData)
      .subscribe(
        (response) => {
          console.log('response received is ', response);
          this.uploadFileName = response[`fileName`];
        },
        error => {
          console.error(error);
        }
      )
  }

  setVacancy() {
    this.form.disable();
    if (this.selectedPosition === 'Select Position') {
      alert('Select Your Position');
      this.form.enable();
      return;
    }
    // if (!this.uploadFileName) {
    //   alert('Upload CV, it should be in PDF format only');
    //   this.form.enable();
    //   return;
    // }
    this.form.value.position = this.selectedPosition;
    this.form.value.fileName = this.uploadFileName;
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
