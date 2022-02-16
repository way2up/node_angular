import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtDataPickerComponent } from './bt-data-picker.component';

describe('BtDataPickerComponent', () => {
  let component: BtDataPickerComponent;
  let fixture: ComponentFixture<BtDataPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtDataPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtDataPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
