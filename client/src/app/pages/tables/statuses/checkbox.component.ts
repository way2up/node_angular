import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-checkbox',
  template: `
    <input 
      type="checkbox"
      (click)="changeBoolean()"
      [checked]="this.checked"> 

      <span class="roundColor" [style.background]="color"></span>
  `,
  styles: [`.roundColor {
    width: 15px;
    height: 15px;
    margin-left: 10px;
    display: inline-block;
    border-radius: 50px;
}`]
})
export class CheckboxComponent implements ViewCell, OnInit {
 
  @Input() value: any;
  @Input() rowData: any;
  @Output() retry: EventEmitter<any> = new EventEmitter();

  checked: boolean;
  color: string;

  constructor() { }

  onRetry() {   
    this.retry.emit(this.rowData);    
  }

  ngOnInit() {
    this.checked = this.value;
    this.color = this.rowData.backgroundColor;
  }

  changeBoolean() {
    this.checked = !this.checked;
    this.rowData.colorWhite = this.checked;
    this.onRetry();
  }

}