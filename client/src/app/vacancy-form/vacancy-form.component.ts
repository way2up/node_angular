import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vacancy, VacancyService } from '../@core/data/vacancy.service';
import { DatePipe } from '@angular/common'
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment} from 'moment';
// import { MomentDateAdapter } from '@angular/material-moment-adapter';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-vacancy-form',
  templateUrl: './vacancy-form.component.html',
  styleUrls: ['./vacancy-form.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class VacancyFormComponent implements OnInit {

  public form: FormGroup;
  public selectedPosition = 'Select Position';
  public selectedSkill = 'Select Skill';
  public selectedRating = 'Select Rating';
  public uploadedFiles: Array<File>;
  public uploadFileName: string;
  public introductionText: string;
  // public positionArr = ['Frontend', 'Backend', 'Full Stack', 'HR', 'QA', 'UI/UX', 'Project manager', 'Team leader'];
  public skillArr = [
    'HTML/CSS', 'Analytical', 'Responsive design', 'React', 'React Native', 'Flutter', 'Angular', 'Git',
    'JavaScript ', 'Interpersonal', 'Testing and debugging', 'Back-end basics', 'Search engine'
  ];
  public ratingArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public skillAndRatingArr = [
    { skill: 'Select Skill', rating: 'Select Rating', showRating: false }
  ];
  public educationArr: Array<any>;
  public workExperienceArr: Array<any>;

  myControlPosition = new FormControl();
  optionsPosition: string[] =  ['Frontend', 'Backend', 'Full Stack', 'HR', 'QA', 'UI/UX', 'Project manager', 'Team leader'];
  filteredPositionOptions: Observable<string[]>;

  myControlSkils = new FormControl();
  optionsSkils: string[] =  ['HTML/CSS', 'Analytical', 'Responsive design', 'React', 'React Native', 'Flutter', 'Angular', 'Git',
  'JavaScript ', 'Interpersonal', 'Testing and debugging', 'Back-end basics', 'Search engine'];
  filteredSkilsOptions: Observable<string[]>;

  // date start
  date = new FormControl(moment());
  date1 = new FormControl(moment());
  minDate;
  maxDate;

  constructor(private vacancyService: VacancyService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this._filterPosition();
    this._filterSkils();

    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      city: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      telephone: new FormControl(null, [Validators.required]),
      // file: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

    this.educationArr = [
      {
        name: '',
        date: new FormGroup({
          start: new FormControl(),
          end: new FormControl()
        })
      }
    ];

    this.workExperienceArr = [
      {
        name: '',
        description: '',
        position: '',
        date: new FormGroup({
          start: new FormControl(),
          end: new FormControl()
        })
      }
    ];

  }

   _filterPosition(): void {
    const foo1 = (value) => {
      const filterValue = value.toLowerCase();
      return this.optionsPosition.filter(option => option.toLowerCase().includes(filterValue));
    }
    this.filteredPositionOptions = this.myControlPosition.valueChanges
    .pipe(
      startWith(''),
      map(value => foo1(value))
    );
  }

   _filterSkils(): void {
    const foo1 = (value) => {
      const filterValue = value.toLowerCase();
      return this.optionsSkils.filter(option => option.toLowerCase().includes(filterValue));
    }
    this.filteredSkilsOptions = this.myControlSkils.valueChanges
    .pipe(
      startWith(''),
      map(value => foo1(value))
    );
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

  addEducation(): void {
    let newEducation = {
      name: '',
      date: new FormGroup({
        start: new FormControl(),
        end: new FormControl()
      })
    }
    this.educationArr.push(newEducation);
  }

  removeEducation(index: number) {
    this.educationArr.splice(index, 1);
  }

  addWorkExperience(): void {
    let newExperience = {
      name: '',
      description: '',
      position: '',
      date: new FormGroup({
        start: new FormControl(),
        end: new FormControl()
      })
    }
    this.workExperienceArr.push(newExperience);
  }

  removeWorkExperience(index: number) {
    this.workExperienceArr.splice(index, 1);
  }


  fileChange(element) {
    this.uploadedFiles = element.target.files;

    const formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append('file', this.uploadedFiles[i]);
    }
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

  sendForm() {
    // this.form.disable();
    if (this.selectedPosition === 'Select Position') {
      alert('Select Your Position');
      // this.form.enable();
      return;
    }
    let date = new Date();
    let date_Now = this.datepipe.transform(date, 'yyyy-MM-dd, h:mm');
    this.form.value.position = this.selectedPosition;
    this.form.value.fileName = this.uploadFileName;
    this.form.value.introductionText = this.introductionText;
    this.form.value.date = date_Now;
    this.skillAndRatingArr.pop();
    this.form.value.skills = this.skillAndRatingArr;

    this.educationArr.map(item => {
      item.dateValue = item.date.value;
      return item;
    });

    this.workExperienceArr.map(item => {
      item.dateValue = item.date.value;
      return item;
    });

    for (const element of this.educationArr) {
      if (element.date.status === 'INVALID' || element.dateValue.start === null || element.dateValue.end === null) {
        alert('Please note valid date, in education fields');
        return false;
      }
    }

    for (const element of this.workExperienceArr) {
      if (element.date.status === 'INVALID' || element.dateValue.start === null || element.dateValue.end === null) {
        alert('Please note valid date, in work experience fields');
        return false;
      }
    }

    this.convertEducation();
    this.convertWorkExperience();
    console.log(this.form.value);
    this.putVacancy();
  }

  convertEducation() {
    let education = [];
    this.educationArr.map((item, index) => {
      education[index] = {};
      education[index][`name`] = item.name;
      education[index][`dateValue`] = item.dateValue;
      return item;
    });

    this.form.value.education = education;
  }

  convertWorkExperience() {
    let workExperience = [];
    this.workExperienceArr.map((item, index) => {
      workExperience[index] = {};
      workExperience[index][`name`] = item.name;
      workExperience[index][`description`] = item.description;
      workExperience[index][`position`] = item.position;
      workExperience[index][`dateValue`] = item.dateValue;
      return item;
    });

    this.form.value.workExperience = workExperience;
  }

  chosenYearHandlerStart(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    this.minDate =  this.datepipe.transform(this.date.value._d, 'yyyy-MM');
  }

  chosenMonthHandlerStart(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    this.minDate =  this.datepipe.transform(this.date.value._d, 'yyyy-MM');
    datepicker.close();
  }

  chosenYearHandlerEnd(normalizedYear: Moment) {
    const ctrlValue = this.date1.value;
    ctrlValue.year(normalizedYear.year());
    this.date1.setValue(ctrlValue);
    this.maxDate = this.datepipe.transform(this.date1.value._d, 'yyyy-MM');
  }

  chosenMonthHandlerEnd(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date1.value;
    ctrlValue.month(normalizedMonth.month());
    this.date1.setValue(ctrlValue);
    this.maxDate = this.datepipe.transform(this.date1.value._d, 'yyyy-MM');
    datepicker.close();
  }

  putVacancy() {
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
