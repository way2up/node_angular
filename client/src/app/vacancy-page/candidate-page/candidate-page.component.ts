import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VacancyService } from '../../@core/data/vacancy.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'ngx-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.scss'],
})
export class CandidatePageComponent implements OnInit, OnDestroy {

  public user_id = localStorage.getItem("user-id");
  public candidates: Array<any>;

  constructor(private router: Router, private auth: AuthService, private vacancyService: VacancyService,) { }

  ngOnInit(): void {

    if (localStorage.getItem("reloadPage") === "true") {
      localStorage.setItem("reloadPage", "false");
      window.location.reload();
    }

    this.getVacancies();

  }

  getVacancies() {
    this.vacancyService.getVacancies('', '', this.user_id).subscribe(
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

  createCV() {
    this.router.navigate(['/vacancy'], { queryParams: { user_id: this.user_id} });
  }

  updateCV(id: string) {
    this.router.navigate(['/vacancy'], { queryParams: { cv_id: id } });
  }

  deleteCV(id: string) {
    if (!confirm("You want delete cv, you can't restore this cv.")) {
      return;
    };
    this.vacancyService.deleteVacancy(id).subscribe(
      data => {
        this.getVacancies();
      },
      error => {
        console.warn(error);
      }
    );
  }

  ngOnDestroy() {
    localStorage.removeItem('reloadPage');
  }

}
