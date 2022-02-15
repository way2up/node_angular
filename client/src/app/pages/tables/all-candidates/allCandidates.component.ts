import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { SkillService } from '../../../@core/data/skills.service';

// import { SmartTableData } from '../../../@core/data/smart-table';
import { VacancyService } from '../../../@core/data/vacancy.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './allCandidates.component.html',
  styleUrls: ['./allCandidates.component.scss'],
})
export class AllCandidatesTableComponent implements OnInit {

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

  constructor( private auth: AuthService,
    private vacancyService: VacancyService, private skillService: SkillService, public router: Router) {
    this.getStatuses();
  }

  ngOnInit() {
    this.source.onChanged().subscribe((change) => {
      if (change.action === 'filter' || change.action === 'sort') {
        this.getVacancies('', this.statusId);
      }
    });

  }


  getStatuses() {
    this.skillService.getStatuses().subscribe(
      (data: Array<any>) => {
        this.statusesArr = data;
        this.getVacancies();
      },
      error => {
        console.warn(error);
      }
    )
  }

  getVacancies(_id?: string, statusId?: string, user_id?: string) {
    this.vacancyService.getVacancies(null, statusId, null).subscribe(
      (data: Array<any>) => {
        this.candidates = data;
        this.candidates = this.candidates.map(item => {
          item.name = item.firstName + ' ' + item.lastName;
          return item;
        })
        this.source.load(this.candidates);
        for (let i = 0; i < this.candidates.length; i++) {
          if (this.candidates[i].statusId) {
            let status = this.statusesArr.find(item => item[`_id`] === this.candidates[i].statusId);
            this.candidates[i].statusName = `<span class="a${status['backgroundColor']}">${status['name']}</span>`;
            setTimeout(() => {
              let spanBack = Array.from(document.getElementsByClassName(`a${status['backgroundColor']}`) as HTMLCollectionOf<HTMLElement>);
              for (let j = 0; j < spanBack.length; j++) {
                spanBack[j].style.backgroundColor = `${status['backgroundColor']}`;
                spanBack[j].style.color = status['colorWhite'] ? 'white' : 'black';
              }
            }, 1000);

          }
        }
        this.source.load(this.candidates);

      },
      error => {
        console.warn(error);
      }
    )
  }

  selectStatus(status) {
    this.filterByStatus = status.name;
    this.statusId = status._id;
    this.getVacancies('', this.statusId);
  }

  cancelFilter() {
    this.filterByStatus = 'Filter by Status';
    this.statusId = undefined;
    this.getVacancies();
  }

  seeMoreInfo(user) {
    this.router.navigate(['/pages/tables/candidateInfo'], { queryParams: { data: JSON.stringify(user[`data`]) }, skipLocationChange: true });
  }

}
