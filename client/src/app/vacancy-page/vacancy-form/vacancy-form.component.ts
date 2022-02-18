import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VacancyService } from '../../@core/data/vacancy.service';
import { DatePipe } from '@angular/common'
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillService } from '../../@core/data/skills.service';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';

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
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-body">
      <h2>{{name}}</h2>
      <div class="input-group" *ngIf="promptAlert">
          <input class="form-control" [(ngModel)]="promptText">
      </div>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="activeModal.close(promptText)">Ok</button>
    <button type="button" *ngIf="promptAlert" class="btn btn-outline-secondary" (click)="activeModal.close('cancel')">Cancel</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name: string;
  @Input() promptAlert: false;
  @Input() promptText: string;

  constructor(public activeModal: NgbActiveModal) { }
}
@Component({
  selector: 'vacancy-form',
  templateUrl: './vacancy-form.component.html',
  styleUrls: ['./vacancy-form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    NgbModalConfig, NgbModal,

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class VacancyFormComponent implements OnInit {

  public user_id: string;
  public cv_id: string;
  public today = new Date();
  public educStartMax = false;
  public workStartMax = false;

  public form: FormGroup;
  public selectedPosition = 'Select Position';
  public selectedRating = 'Select Rating';
  public uploadedFiles: Array<File>;
  public uploadedPhotos: Array<File>;
  public uploadFileName: string;
  public uploadPhotoName: string;
  public cutingFileName: string;
  public cutingPotoName: string;
  public motivation_letter: string;
  public Interests_hobby: string;
  public DateOfBirthMax: Date = new Date();
  public DateOfBirth: string;
  public ratingArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public educationArr: Array<any> = [
    {
      name: '',
      dateStart: new FormControl(moment()),
      dateEnd: new FormControl(moment()),
      startDate: null,
      endDate: null,
      present: false
    }
  ];
  public workExperienceArr: Array<any> = [
    {
      name: '',
      description: '',
      position: '',
      dateStart: new FormControl(moment()),
      dateEnd: new FormControl(moment()),
      startDate: null,
      endDate: null,
      present: false
    }
  ];
  public socialLInksArr: Array<any>;

  myControlPosition = new FormControl();
  optionsPosition: string[] = [];
  filteredPositionOptions: Observable<string[]>;


  public skillAndRatingArr = [
    { skill: 'Select Skill', myControlSkils: new FormControl(), rating: 'Select Rating' }
  ];

  public languageAndRatingArr = [
    { lang: 'Select Language', myControlLang: new FormControl(), rating: 'Select Rating' }
  ];

  public newSkill: string;
  public newLang: string;

  optionsSkils: string[] = [];

  optionsLanguages: string[] = ['Armenian', 'Russian', 'English', 'German', 'French', 'Flutter'];

  filteredSkilsOptions: Array<Observable<string[]>> = [];

  filteredLanguagesOptions: Array<Observable<string[]>> = [];

  constructor(private vacancyService: VacancyService, private skillService: SkillService,
    public router: Router, public datepipe: DatePipe, private activeRoute: ActivatedRoute,
    config: NgbModalConfig, private _modalService: NgbModal, public activeModal: NgbActiveModal) {

    config.backdrop = 'static';
    config.keyboard = false;
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


  ngOnInit(): void {

    this.user_id = localStorage.getItem("user-id")
    this.activeRoute.queryParams.subscribe((params) => {
      if (params.cv_id) {
        this.cv_id = params.cv_id;
        this.vacancyService.getVacancies(params.cv_id, '', '').subscribe(
          (data: Array<any>) => {
            const cv = data[0];

            this.form.setValue({
              firstName: cv.firstName,
              lastName: cv.lastName,
              email: cv.email,
              city: cv.city,
              address: cv.address,
              telephone: cv.telephone,
            });
            this.myControlPosition.setValue(cv.position);
            this.selectedPosition = cv.position;
            this.uploadFileName = cv.fileName;
            this.cutingFileName = /[^/]*$/.exec(this.uploadFileName)[0];
            this.uploadPhotoName = cv.photoName;
            let image = document.getElementById('output');
            image['src'] = this.uploadPhotoName;
            this.cutingPotoName = /[^/]*$/.exec(this.uploadPhotoName)[0];
            this.motivation_letter = cv.motivation_letter;
            this.Interests_hobby = cv.interests_hobby;
            this.DateOfBirth = cv.dateOfBirth;

            cv.skills.map((item, index) => {
              item.myControlSkils = new FormControl();
              setTimeout(() => this._filterSkils(index + 1), 1000);
              item.myControlSkils.setValue(item.skill);
              return item;
            });
            this.skillAndRatingArr.unshift(...cv.skills);

            cv.languages.map((item, index) => {
              item.myControlLang = new FormControl();
              setTimeout(() => this._filterLanguages(index + 1), 1000);
              item.myControlLang.setValue(item.lang);
              return item;
            });
            this.languageAndRatingArr.unshift(...cv.languages);

            this.socialLInksArr = cv.socialLinks;

            this.educationArr = cv.education.map((item, index) => {
              item.dateStart = new FormControl(moment(item.startDate));
              item.dateEnd = new FormControl(moment(item.endDate));
              item.present = item.endDate ? false : true;
              return item;
            });

            this.workExperienceArr = cv.workExperience.map((item, index) => {
              item.dateStart = new FormControl(moment(item.startDate));
              item.dateEnd = new FormControl(moment(item.endDate));
              item.present = item.endDate ? false : true;
              return item;
            });

          },
          error => {
            console.warn(error);
          }
        )
      }
    })

    this.skillService.getPositions().subscribe(
      (data: Array<any>) => {
        this.optionsPosition = data.map(x => x.name);
        this._filterPosition();
      },
      error => {
        console.warn(error);
      }
    )

    this.skillService.getSkills().subscribe(
      (data: Array<any>) => {
        this.optionsSkils = data.map(x => x.name);
        this._filterSkils(0);
      },
      error => {
        console.warn(error);
      }
    )

    this._filterLanguages(0);

    this.socialLInksArr = [{
      link: null
    }];

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

  _filterSkils(index: number): void {
    const foo1 = (value) => {
      const filterValue = value.toLowerCase();
      return this.optionsSkils.filter(option => option.toLowerCase().includes(filterValue));
    }
    this.filteredSkilsOptions[index] = this.skillAndRatingArr[index].myControlSkils.valueChanges
      .pipe(
        startWith(''),
        map(value => foo1(value))
      );
  }

  _filterLanguages(index: number): void {
    const foo1 = (value) => {
      const filterValue = value.toLowerCase();
      return this.optionsLanguages.filter(option => option.toLowerCase().includes(filterValue));
    }
    this.filteredLanguagesOptions[index] = this.languageAndRatingArr[index].myControlLang.valueChanges
      .pipe(
        startWith(''),
        map(value => foo1(value))
      );
  }

  selectPosition(data: string): void {
    this.selectedPosition = data;
  }

  cahageDateOfBirth(val) {
    this.DateOfBirth = val;
  }

  async openAlert(alertText: string, alertType?: string, name?: string, index?: number) {
    const modalRef = this._modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = alertText;

    if (alertType === 'SkillPrompt' || alertType === 'LangPrompt') {
      modalRef.componentInstance.promptAlert = true;
    }

    await modalRef.result.then(res => {

      if (alertType === 'SkillPrompt') {
        if (res === 'cancel') {
          this.skillAndRatingArr[index].myControlSkils = new FormControl();
          this.skillAndRatingArr[index].rating = 'Select Rating';
          this._filterSkils(index);
          return;
        }

        const x = Number(res);
        if (x.toString() === 'NaN' || x < 1 || x > 10) {
          this.openAlert('Write number 1 - 10', 'SkillAlert', name, index);
          return;
        }

        this.skillAndRatingArr[index].skill = name;
        this.skillAndRatingArr[index].rating = res;
        let newRow = { skill: 'Select Skill', myControlSkils: new FormControl(), rating: 'Select Rating' };
        if ((index + 1) === this.skillAndRatingArr.length) {
          this.skillAndRatingArr.push(newRow);
          this._filterSkils(index + 1);
        }

      }

      if (alertType === 'LangPrompt') {
        if (res === 'cancel') {
          this.languageAndRatingArr[index].myControlLang = new FormControl();
          this.languageAndRatingArr[index].rating = 'Select Rating';
          this._filterLanguages(index);
          return;
        }

        const x = Number(res);
        if (x.toString() === 'NaN' || x < 1 || x > 10) {
          this.openAlert('Write number 1 - 10', 'LangAlert', name, index);
          return;
        }

        this.languageAndRatingArr[index].lang = name;
        this.languageAndRatingArr[index].rating = res;
        let newRow = { lang: 'Select Skill', myControlLang: new FormControl(), rating: 'Select Rating' };
        if ((index + 1) === this.languageAndRatingArr.length) {
          this.languageAndRatingArr.push(newRow);
          this._filterLanguages(index + 1);
        }
      }

    }, rej => {
      console.log('rej', rej)
    });

    setTimeout(() => {
      if (alertType === 'SkillAlert') {
        this.selectSkill(name, index);
      } else if (alertType === 'LangAlert') {
        this.selectLang(name, index);
      } else if (alertType === 'putForm') {
        this.closePopup();
      }
    }, 100);

  }

  selectSkill(name: string, index: number): void {
    this.openAlert('On a scale of 1 to 10, please indicate how well you master the skill․', 'SkillPrompt', name, index);
  }

  selectLang(name: string, index: number): void {
    this.openAlert('On a scale of 1 to 10, please indicate how well you master the skill․', 'LangPrompt', name, index);
  }

  removeRowSkill(index: number): void {
    this.skillAndRatingArr.splice(index, 1);
    this.filteredSkilsOptions.splice(index, 1);
  }

  removeRowLang(index: number): void {
    this.languageAndRatingArr.splice(index, 1);
    this.filteredLanguagesOptions.splice(index, 1);
  }

  addYourSkill() {
    let newSkill = this.newSkill
    let index = this.skillAndRatingArr.length - 1;
    this.optionsSkils.push(newSkill);
    this.skillAndRatingArr[index].myControlSkils.setValue(newSkill)
    this._filterSkils(index);
    this.selectSkill(newSkill, index);
    this.newSkill = '';

  }

  addYourLang() {
    let newLang = this.newLang
    let index = this.languageAndRatingArr.length - 1;
    this.optionsLanguages.push(newLang);
    this.languageAndRatingArr[index].myControlLang.setValue(newLang)
    this._filterLanguages(index);
    this.selectLang(newLang, index);
    this.newLang = '';
  }

  addEducation(): void {
    let newEducation = {
      name: '',
      dateStart: new FormControl(moment()),
      dateEnd: new FormControl(moment()),
      startDate: null,
      endDate: null,
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
      dateStart: new FormControl(moment()),
      dateEnd: new FormControl(moment()),
      startDate: null,
      endDate: null,
    }
    this.workExperienceArr.push(newExperience);
  }

  removeWorkExperience(index: number) {
    this.workExperienceArr.splice(index, 1);
  }

  addSocialLInk() {
    this.socialLInksArr.push({ link: null });
  }

  removeSocialLInk(index: number) {
    this.socialLInksArr.splice(index, 1);
  }

  photoChange(element) {
    let image = document.getElementById('output');
    if (!element) {
      const file = document.querySelector('.photoFile');
      file[`value`] = '';
      image['src'] = null;
      return;
    }
    if (element.target.files[0].size > 2097152) {
      this.openAlert('The photo is too big (Max Size 2MB)');
      return;
    }

    image['src'] = URL.createObjectURL(element.target.files[0]);

    this.uploadedPhotos = element.target.files;
    const formData = new FormData();
    for (var i = 0; i < this.uploadedPhotos.length; i++) {
      formData.append('file', this.uploadedPhotos[i]);
    }
    this.vacancyService.uploadPhoto(formData)
      .subscribe(
        (response) => {
          console.log('response received is ', response);
          this.uploadPhotoName = response[`fileName`];
          this.cutingPotoName = /[^/]*$/.exec(this.uploadPhotoName)[0];
        },
        error => {
          console.error(error);
        }
      )
  }

  fileChange(element) {
    if (!element) {
      const file = document.querySelector('.file');
      file[`value`] = '';
      return;
    }

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
          this.cutingFileName = /[^/]*$/.exec(this.uploadFileName)[0]
        },
        error => {
          console.error(error);
        }
      )
  }

  chosenYearWorkStart(normalizedYear: Moment, index: number) {
    const ctrlValue = this.workExperienceArr[index].dateStart.value;
    ctrlValue.year(normalizedYear.year());
    this.workExperienceArr[index].dateStart.setValue(ctrlValue);
    this.workExperienceArr[index].startDate = this.datepipe.transform(this.workExperienceArr[index].dateStart.value._d, 'yyyy-MM');
  }

  chosenMonthWorkStart(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, index: number) {
    const ctrlValue = this.workExperienceArr[index].dateStart.value;
    ctrlValue.month(normalizedMonth.month());
    this.workExperienceArr[index].dateStart.setValue(ctrlValue);
    this.workExperienceArr[index].startDate = this.datepipe.transform(this.workExperienceArr[index].dateStart.value._d, 'yyyy-MM');
    datepicker.close();
  }

  chosenYearWorkEnd(normalizedYear: Moment, index: number) {
    this.workStartMax = true;
    const ctrlValue = this.workExperienceArr[index].dateEnd.value;
    ctrlValue.year(normalizedYear.year());
    this.workExperienceArr[index].dateEnd.setValue(ctrlValue);
    this.workExperienceArr[index].endDate = this.datepipe.transform(this.workExperienceArr[index].dateEnd.value._d, 'yyyy-MM');
  }

  chosenMonthWorkEnd(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, index: number) {
    const ctrlValue = this.workExperienceArr[index].dateEnd.value;
    ctrlValue.month(normalizedMonth.month());
    this.workExperienceArr[index].dateEnd.setValue(ctrlValue);
    this.workExperienceArr[index].endDate = this.datepipe.transform(this.workExperienceArr[index].dateEnd.value._d, 'yyyy-MM');
    datepicker.close();
  }

  chosenYearEducationStart(normalizedYear: Moment, index: number) {
    const ctrlValue = this.educationArr[index].dateStart.value;
    ctrlValue.year(normalizedYear.year());
    this.educationArr[index].dateStart.setValue(ctrlValue);
    this.educationArr[index].startDate = this.datepipe.transform(this.educationArr[index].dateStart.value._d, 'yyyy-MM');
  }

  chosenMonthEducationStart(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, index: number) {
    const ctrlValue = this.educationArr[index].dateStart.value;
    ctrlValue.month(normalizedMonth.month());
    this.educationArr[index].dateStart.setValue(ctrlValue);
    this.educationArr[index].startDate = this.datepipe.transform(this.educationArr[index].dateStart.value._d, 'yyyy-MM');
    datepicker.close();
  }

  chosenYearEducationEnd(normalizedYear: Moment, index: number) {
    this.educStartMax = true;
    const ctrlValue = this.educationArr[index].dateEnd.value;
    ctrlValue.year(normalizedYear.year());
    this.educationArr[index].dateEnd.setValue(ctrlValue);
    this.educationArr[index].endDate = this.datepipe.transform(this.educationArr[index].dateEnd.value._d, 'yyyy-MM');
  }

  chosenMonthEducationEnd(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, index: number) {
    const ctrlValue = this.educationArr[index].dateEnd.value;
    ctrlValue.month(normalizedMonth.month());
    this.educationArr[index].dateEnd.setValue(ctrlValue);
    this.educationArr[index].endDate = this.datepipe.transform(this.educationArr[index].dateEnd.value._d, 'yyyy-MM');
    datepicker.close();
  }

  checkValueEducationEndDate(event, index) {
    this.educationArr[index].present = event.target.checked
  }

  checkValueWorkEndDate(event, index) {
    this.workExperienceArr[index].present = event.target.checked
  }

  sendForm() {
    // this.form.disable();
    if (this.selectedPosition === 'Select Position') {
      this.openAlert('Select Your Position');
      // this.form.enable();
      return;
    }
    let date = new Date();
    let date_Now = this.datepipe.transform(date, 'yyyy-MM-dd, h:mm');
    this.form.value._id = this.cv_id;
    this.form.value.user_id = this.user_id;
    this.form.value.position = this.selectedPosition;
    this.form.value.fileName = this.uploadFileName;
    this.form.value.photoName = this.uploadPhotoName;
    this.form.value.motivation_letter = this.motivation_letter;
    this.form.value.interests_hobby = this.Interests_hobby;
    this.form.value.date = date_Now;
    this.form.value.dateOfBirth = this.DateOfBirth;

    this.skillAndRatingArr.map(item => delete item.myControlSkils);
    this.skillAndRatingArr = this.skillAndRatingArr.filter(item => item.rating !== 'Select Rating');
    this.form.value.skills = this.skillAndRatingArr;

    this.languageAndRatingArr.map(item => delete item.myControlLang);
    this.languageAndRatingArr = this.languageAndRatingArr.filter(item => item.rating !== 'Select Rating');
    this.form.value.languages = this.languageAndRatingArr;
    this.form.value.socialLinks = this.socialLInksArr;

    for (const element of this.educationArr) {
      if (element.dateStart.status === 'INVALID' || (element.dateEnd.status === 'INVALID' && !element.present) || !element.startDate || (!element.endDate && !element.present)) {
        this.openAlert('Please note valid date, in education fields');
        return false;
      }
    }

    for (const element of this.workExperienceArr) {
      if (element.dateStart.status === 'INVALID' || (element.dateEnd.status === 'INVALID' && !element.present) || !element.startDate || (!element.endDate && !element.present)) {
        this.openAlert('Please note valid date, in work experience fields');
        return false;
      }
    }

    this.convertEducation();
    this.convertWorkExperience();
    console.log(this.form.value);
    this.putVacancy();
  }

  removeCV() {
    this.uploadFileName = null;
    this.cutingFileName = null;
    this.fileChange(null);
  }

  convertEducation() {
    const dateNow = this.datepipe.transform(new Date(), 'yyyy-MM');
    const education = [];
    this.educationArr.map((item, index) => {
      education[index] = {};
      education[index][`name`] = item.name;
      education[index][`startDate`] = item.startDate;
      education[index][`endDate`] = item.present  ? dateNow : item.endDate;
      return item;
    });

    this.form.value.education = education;
  }

  convertWorkExperience() {
    const dateNow = this.datepipe.transform(new Date(), 'yyyy-MM');
    const workExperience = [];
    this.workExperienceArr.map((item, index) => {
      workExperience[index] = {};
      workExperience[index][`name`] = item.name;
      workExperience[index][`description`] = item.description;
      workExperience[index][`position`] = item.position;
      workExperience[index][`startDate`] = item.startDate;
      workExperience[index][`endDate`] = item.present  ? dateNow : item.endDate;
      return item;
    });

    this.form.value.workExperience = workExperience;
  }

  closePopup() {
    if (localStorage.getItem("accessToken")) {
      this.router.navigate(['/vacancy/candidatePage']);
    } else {
      this.form.reset();
      this.myControlPosition = new FormControl();
      this.selectedPosition = 'Select Position';
      this.cutingPotoName = '';
      this.photoChange(null);
      this.uploadFileName = null;
      this.cutingFileName = null;
      this.fileChange(null);
      this.DateOfBirth = null
      this.skillAndRatingArr = [
        { skill: 'Select Skill', myControlSkils: new FormControl(), rating: 'Select Rating' }
      ];
      this.languageAndRatingArr = [
        { lang: 'Select Language', myControlLang: new FormControl(), rating: 'Select Rating' }
      ];
      this.educationArr = [
        {
          name: '',
          dateStart: new FormControl(moment()),
          dateEnd: new FormControl(moment()),
          startDate: null,
          endDate: null,
          present: false
        }
      ];
      this.workExperienceArr = [
        {
          name: '',
          description: '',
          position: '',
          dateStart: new FormControl(moment()),
          dateEnd: new FormControl(moment()),
          startDate: null,
          endDate: null,
          present: false
        }
      ];
      this.Interests_hobby = null;
      this.motivation_letter = null;
      this.socialLInksArr = [{
        link: null
      }];

    }
  }

  putVacancy() {
    this.vacancyService.setVacancy(this.form.value).subscribe(
      (data) => {
        this.vacancyService.sendMail({ email: this.form.value.email }).subscribe(data =>{
          console.log(data);
          this.vacancyService.sendMailAdmin({ email: environment.admin_email }).subscribe(data => console.log(data));
        });
        this.openAlert(data[`message`], 'putForm');
      },
      error => {
        console.warn(error);
      }
    );
  }

}
