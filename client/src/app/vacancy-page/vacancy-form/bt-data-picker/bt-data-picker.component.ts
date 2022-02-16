import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export const MY_FORMATS_Birth = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'ngx-bt-data-picker',
  templateUrl: './bt-data-picker.component.html',
  styleUrls: ['./bt-data-picker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    NgbModalConfig, NgbModal,

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_Birth },
  ]
})
export class BtDataPickerComponent implements OnInit,  OnChanges {

  public DateOfBirth: string;
  @Input() InPutDateOfBirth: string;
  @Output() OutPutDateOfBirth = new EventEmitter();
  
  public DateOfBirthMax: Date = new Date();

  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    this.DateOfBirth = this.InPutDateOfBirth;
  }
  ngOnInit(): void {
  }
  
  chnageValue(value) {
    this.DateOfBirth = value;
    this.OutPutDateOfBirth.emit(value);
  }

}