import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../@core/data/candidate.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  public bids: number;

  constructor(private candidateService: CandidateService) {
  }

  ngOnInit() {
    this.getVacancies();
  }

  getVacancies() {
    this.candidateService.getCandidates().subscribe(
      (data) => {
        this.bids = data[`length`];
      },
      error => {
        console.warn(error);
      }
    )
  }

}
