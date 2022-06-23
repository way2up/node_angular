import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from '../../@core/data/candidate.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'ngx-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.scss'],
})
export class CandidatePageComponent implements OnInit, OnDestroy {

  public user_id = localStorage.getItem("user-id");
  public candidates: Array<any>;

  constructor(private router: Router, private auth: AuthService, private candidateService: CandidateService,) { }

  ngOnInit(): void {

    if (localStorage.getItem("reloadPage") === "true") {
      localStorage.setItem("reloadPage", "false");
      window.location.reload();
    }

    this.getVacancies();

  }

  getVacancies() {
    this.candidateService.getCandidates('', '', this.user_id).subscribe(
      (data: Array<any>) => {
        this.candidates = data;
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
    this.candidateService.deleteCandidate(id).subscribe(
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
