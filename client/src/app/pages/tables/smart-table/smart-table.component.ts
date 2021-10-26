import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { VacancyService } from '../../../@core/data/vacancy.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  public candidates: Array<any>;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      // _id: {
      //   title: 'ID',
      //   type: 'number',
      // },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
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
      view: {
        title: 'View more',
        type: 'html',
      }
    },
    // actions: {
    //   custom: [
    //     {
    //       name: 'yourAction',
    //       title: '-->',
    //     }
    //   ],
    // }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private vacancyService: VacancyService) {
    const data = this.service.getData();
    // console.log(data)
    // this.source.load(data);
    this.getVacancies();
  }

  getVacancies() {
    this.vacancyService.getVacancies().subscribe(
      (data: Array<any>) => {
        this.candidates = data;
        this.candidates = this.candidates.map(item => {
          item.view = `<span (click)="seeMore($event)"><i  class="far fa-address-card"></i></span>`;
          return item;
        })
        // this.sortedItems = items.sort((a: any, b: any) =>
        //   new Date(a.date).getTime() - new Date(b.date).getTime()
        // );
        this.source.load(this.candidates);
        console.log(this.candidates)
      },
      error => {
        console.warn(error);
      }
    )
  }

  seeMore(item) {
    console.log(item)
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onUserRowSelect(item) {
    // console.log(item)
  }
}
