import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

// import { SmartTableData } from '../../../@core/data/smart-table';
import { VacancyService } from '../../../@core/data/vacancy.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  public candidates: Array<any>;

  settings = {
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      position: {
        title: 'Position',
        type: 'string',
      },
      date: {
        title: 'Date',
        type: 'string',
      },
    },
    actions: {
      columnTitle: 'View more',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'viewrecord', title: '<i class="fa fa-eye"></i>' },
      ],
      position: 'right'
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private vacancyService: VacancyService, public router: Router) {
    this.getVacancies();
  }

  getVacancies() {
    this.vacancyService.getVacancies().subscribe(
      (data: Array<any>) => {
        this.candidates = data;
        this.candidates = this.candidates.map(item => {
          item.name = item.firstName + ' ' + item.lastName;
          return item;
        })
        this.candidates = this.candidates.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.source.load(this.candidates);
      },
      error => {
        console.warn(error);
      }
    )
  }

  seeMoreInfo(user) {
    this.router.navigate(['/pages/tables/candidateInfo'], { queryParams: {data: JSON.stringify(user[`data`])} } );
  }

}
