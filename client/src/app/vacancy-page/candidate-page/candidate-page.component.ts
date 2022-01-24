import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { VacancyService } from '../../@core/data/vacancy.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'ngx-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CandidatePageComponent implements OnInit {

  public candidate_mail = localStorage.getItem("user-email");
  public candidates: Array<any>;

  constructor(private router: Router, private auth: AuthService, private vacancyService: VacancyService,) { }

  ngOnInit(): void {
    this.getVacancies();
  }

  getVacancies() {
    this.vacancyService.getVacancies('', this.candidate_mail).subscribe(
      (data: Array<any>) => {
        this.candidates = data;
        console.log(this.candidates)
        // this.candidates = this.candidates.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },
      error => {
        console.warn(error);
      }
    )
  }

  updateCV(id: string) {
    alert(id + ' update')
    this.router.navigate(['/vacancy'], { queryParams: { cv_id: id } });
  }

  deleteCV(id: string) {
    confirm("You want delete cv, you can't restore this cv.");
    this.vacancyService.deleteVacancy(id).subscribe(
      data => {
        this.getVacancies();
      },
      error => {
        console.warn(error);
      }
    );
  }

}
