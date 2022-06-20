import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { SkillService } from '../../../@core/data/skills.service';
import { CandidateService } from '../../../@core/data/candidate.service';
import { MatDatepicker } from '@angular/material/datepicker';
import './ckeditor.loader';
import 'ckeditor';
import { newVacancy, NewVacancyService } from '../../../@core/data/newVacancy.service';

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
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent implements OnInit {

  public errorText;
  public errorRegUrl;
  public today = new Date();
  public startMaxDate = false;
  public vacancy: newVacancy;
  public form: FormGroup;

  constructor(private candidateService: CandidateService, private skillService: SkillService, public newVacancyService: NewVacancyService,
    public router: Router, public datepipe: DatePipe, private route: ActivatedRoute
    // config: NgbModalConfig,  private _modalService: NgbModal, public activeModal: NgbActiveModal
  ) {
    this.form = new FormGroup({
      startDate: new FormControl(moment()),
      endDate: new FormControl(moment()),
    });

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length === 0) {
        this.vacancy = {
          metaTitle: '',
          metaDescription: '',
          url: '',
          ogType: '',
          ogTitle: '',
          ogDescription: '',
          ogImage: '',
          vacancyTitle: '',
          startD: new FormControl(moment()),
          endD: new FormControl(moment()),
          startDate: '',
          endDate: '',
          smallImage: '',
          bigImage: '',
          shortDescription: '',
          longDescription: '',
          show: false
        }

      } else {
        this.vacancy = JSON.parse(params.data);
        this.vacancy.startD = new FormControl(moment(this.vacancy.startDate));
        this.vacancy.endD = new FormControl(moment(this.vacancy.endDate));
        this.vacancy.startD.setValue(this.vacancy.startDate);
        this.vacancy.endD.setValue(this.vacancy.endDate);
        let smallImage = document.getElementById('smallImage');
        smallImage['src'] = this.vacancy.smallImage;
        let bigImage = document.getElementById('bigImage');
        bigImage['src'] = this.vacancy.bigImage;
      }
    })

  }

  photoChange(element, type) {
    let image = document.getElementById(type === 'small' ? 'smallImage' : 'bigImage');
    image['src'] = URL.createObjectURL(element.target.files[0]);
    const formData = new FormData();
    formData.append('file', element.target.files[0]);

    this.candidateService.uploadPhoto(formData)
      .subscribe(
        (response) => {
          console.log('response received is ', response);
          type === 'small' ? this.vacancy.smallImage = response[`fileName`] : this.vacancy.bigImage = response[`fileName`];
        },
        error => {
          console.error(error);
        }
      )
  }

  checkUrlReg() {
    setTimeout(()=>{
      const reg = /([A-Za-z\d]+-*)+$/g;
      const space = this.vacancy.url.search(' ');
      this.errorRegUrl = ( reg.test(this.vacancy.url) && space === -1 ) ? '' : 'URL should contain only latin letters, numbers, "-" sign without spaces!';
    }, 200);
  }

  save() {
    if (this.errorRegUrl || !this.vacancy.url) {
      alert('Url filed is required');
      return;
    }
    this.vacancy.startDate = this.datepipe.transform(this.vacancy.startD.value.toString(), 'yyyy-MM-dd');
    this.vacancy.endDate = this.datepipe.transform(this.vacancy.endD.value.toString(), 'yyyy-MM-dd');

    const newData = Object.assign({}, this.vacancy);
    delete newData.startD;
    delete newData.endD;

    if (this.vacancy._id) {
      this.newVacancyService.updateNewVacancy(newData).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/pages/tables/allVacancies']);
        },
        error => {
          console.warn(error);
        }
      );

    } else {
      this.newVacancyService.createNewVacancy(newData).subscribe(
        (data) => {
          console.log(data, 'new Vacancy Created');
          this.router.navigate(['/pages/tables/allVacancies']);
        },
        err => {
          this.errorText = err.error.message;
        }
      );
    }

  }

}