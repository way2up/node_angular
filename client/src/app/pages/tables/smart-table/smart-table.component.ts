import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { SkillService } from '../../../@core/data/skills.service';

// import { SmartTableData } from '../../../@core/data/smart-table';
import { VacancyService } from '../../../@core/data/vacancy.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent implements OnInit {

  public candidates: Array<any>;
  public statusesArr: Array<any>;
  public filterByStatus = 'Filter by Status';
  public statusId: any;

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
      statusName: {
        title: 'Status',
        type: 'html',
        // sort: false,
        editable: false,
        // filter: false,
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
    private vacancyService: VacancyService, private skillService: SkillService, public router: Router) {
    this.getVacancies();
    this.getStatuses();
  }

  ngOnInit() {
    this.source.onChanged().subscribe((change) => {
      if (change.action === 'filter' || change.action === 'sort') {
        this.getVacancies(this.statusId);
      }
    });

  }

  getStatuses() {
    this.skillService.getStatuses().subscribe(
      (data: Array<any>) => {
        this.statusesArr = data;
      },
      error => {
        console.warn(error);
      }
    )
  }

  getStatusById(id: string, index: number) {
    this.skillService.getStatuses(id).subscribe(
      (data: Array<any>) => {
        if (data.length) {
          this.candidates[index].statusName = `<span class="a${data[0]['backgroundColor']}">${data[0]['name']}</span>`;
          setTimeout(() => {
            let spanBack = Array.from(document.getElementsByClassName(`a${data[0]['backgroundColor']}`) as HTMLCollectionOf<HTMLElement>);
            for (let i = 0; i < spanBack.length; i++) {
              spanBack[i].style.backgroundColor = `${data[0]['backgroundColor']}`;
            }
          }, 250);
          this.source.load(this.candidates);
        }
      },
      error => {
        console.warn(error);
      }
    )
  }

  selectStatus(status) {
    this.filterByStatus = status.name;
    this.statusId = status._id;
    this.getVacancies(this.statusId);
  }

  cancelFilter() {
    this.filterByStatus = 'Filter by Status';
    this.statusId = undefined;
    this.getVacancies();
  }

  getVacancies(statusId?) {
    this.vacancyService.getVacancies(statusId).subscribe(
      (data: Array<any>) => {
        this.candidates = data;
        if (!this.candidates.length) {
          this.source.load([]);
        }
        this.candidates = this.candidates.map(item => {
          item.name = item.firstName + ' ' + item.lastName;
          return item;
        })
        this.candidates = this.candidates.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        for (let i = 0; i < this.candidates.length; i++) {
          this.getStatusById(this.candidates[i].statusId, i);
        }
      },
      error => {
        console.warn(error);
      }
    )
  }

  seeMoreInfo(user) {
    this.router.navigate(['/pages/tables/candidateInfo'], { queryParams: { data: JSON.stringify(user[`data`]) } });
  }

}
