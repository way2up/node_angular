import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../../@core/data/vacancy.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  public bids: number;

  constructor(private vacancyService: VacancyService) {
  }

  ngOnInit() {
    this.getVacancies();
  }

  getVacancies() {
    this.vacancyService.getVacancies().subscribe(
      (data) => {
        this.bids = data[`length`];
      },
      error => {
        console.warn(error);
      }
    )
  }

}
