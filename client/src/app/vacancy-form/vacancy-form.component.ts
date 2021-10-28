import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VacancyService } from '../@core/data/vacancy.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-vacancy-form',
  templateUrl: './vacancy-form.component.html',
  styleUrls: ['./vacancy-form.component.scss']
})
export class VacancyFormComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  public form: FormGroup;
  
  public selectedPosition = 'Select Position';
  public selectedSkill = 'Select Skill';
  public selectedRating = 'Select Rating';
  public uploadedFiles: Array<File>;
  public uploadFileName: string;
  public positionArr = ['Frontend', 'Backend', 'Full Stack', 'HR', 'QA', 'UI/UX', 'Project manager', 'Team leader'];
  public skillArr = [
    'HTML/CSS', 'Analytical', 'Responsive design', 'React', 'React Native', 'Flutter', 'Angular', 'Git',
    'JavaScript ', 'Interpersonal', 'Testing and debugging', 'Back-end basics', 'Search engine'
  ];
  public ratingArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public skillAndRatingArr = [
    { skill: 'Select Skill', rating: 'Select Rating', showRating: false }
  ]

  constructor(private vacancyService: VacancyService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      city: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      telephone: new FormControl(null, [Validators.required]),
      // file: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

  }

  selectPosition(data: string): void {
    this.selectedPosition = data;
  }

  selectSkill(name: string, index: number): void {
    this.skillAndRatingArr[index].skill = name;
    this.skillAndRatingArr[index].showRating = true;
  }

  selectRating(name: string, index: number): void {
    this.skillAndRatingArr[index].rating = name;
    let newRow = { skill: 'Select Skill', rating: 'Select Rating', showRating: false };
    if ((index + 1) === this.skillAndRatingArr.length) {
      this.skillAndRatingArr.push(newRow);
    }
  }

  removeRowSkill(index: number): void {
    this.skillAndRatingArr.splice(index, 1);
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
    // this.form.disable();
    if (this.selectedPosition === 'Select Position') {
      alert('Select Your Position');
      // this.form.enable();
      return;
    }
    // if (!this.uploadFileName) {
    //   alert('Upload CV, it should be in PDF format only');
    //   this.form.enable();
    //   return;
    // }
    let date = new Date();
    let date_Now = this.datepipe.transform(date, 'yyyy-MM-dd, h:mm');
    this.form.value.position = this.selectedPosition;
    this.form.value.fileName = this.uploadFileName;
    this.form.value.date = date_Now;
    this.skillAndRatingArr.pop();
    this.form.value.skills = this.skillAndRatingArr;
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
