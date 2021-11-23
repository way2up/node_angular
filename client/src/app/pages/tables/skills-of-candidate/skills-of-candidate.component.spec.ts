import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsOfCandidateComponent } from './skills-of-candidate.component';

describe('SkillsOfCandidateComponent', () => {
  let component: SkillsOfCandidateComponent;
  let fixture: ComponentFixture<SkillsOfCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsOfCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsOfCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
