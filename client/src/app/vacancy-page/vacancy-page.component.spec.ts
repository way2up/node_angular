import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyFormComponent } from './vacancy-page.component';

describe('VacancyFormComponent', () => {
  let component: VacancyFormComponent;
  let fixture: ComponentFixture<VacancyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
