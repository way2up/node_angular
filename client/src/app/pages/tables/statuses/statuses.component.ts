import { Component, OnInit } from '@angular/core';
import { ColorEvent } from 'ngx-color';
import { LocalDataSource } from 'ng2-smart-table';
import { SkillService } from '../../../@core/data/skills.service';
import { CheckboxComponent } from './checkbox.component';

@Component({
  selector: 'ngx-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})
export class StatusesComponent implements OnInit {
  public state = '#f30000';
  public statusesData: Array<any>;
  public current_color: string;
  public rowData: any;

  settings = {
    rowClassFunction: (row) => {
      // return 'Naushnik'
      // console.log(row);
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      backgroundColor: {
        title: 'Background Color',
        type: 'string',
      },
      colorWhite: {
        title: 'White Text And Background',
        type: 'custom',
        editable: false,
        filter: false,
        renderComponent: CheckboxComponent,
        onComponentInitFunction: (instance: any) => {
          instance.retry.subscribe(updatedData => {
            this.changeCheckbox(updatedData);
          });
        },
      }

    },
  };

  sourceStatus: LocalDataSource = new LocalDataSource();

  constructor(private skillService: SkillService) { }

  ngOnInit(): void {
    this.current_color = this.state;
    this.getStatuses();
  }

  changeCheckbox(data) {
    this.statusesData.map(obj => data.id === obj.id || obj);
    this.sourceStatus.load(this.statusesData);
  }

  getStatuses() {
    this.skillService.getStatuses().subscribe(
      (data: Array<any>) => {
        this.statusesData = data;
        this.sourceStatus.load(this.statusesData);
      },
      error => {
        console.warn(error);
      }
    )
  }

  onDeleteStatus(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.skillService.deleteStatus(event.data._id).subscribe(
        data => {
          this.getStatuses();
        },
        error => {
          console.warn(error);
        }
      );
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditStatus(event): void {
    const reg = /^#([0-9A-F]{3}){1,2}$/i;
    if (!event.newData.name || !event.newData.backgroundColor) {
      alert("Write name and color");
      return;
    }
    if (!reg.test(event.newData.backgroundColor)) {
      alert("Write valid color");
      return
    }
    this.skillService.setStatus(event.newData._id, { name: event.newData.name, backgroundColor: event.newData.backgroundColor, colorWhite: event.newData.colorWhite }).subscribe(
      data => {
        this.getStatuses();
      },
      error => {
        console.warn(error);
      }
    );
    event.confirm.resolve();
  }

  onCreateStatus(event): void {
    const reg = /^#([0-9A-F]{3}){1,2}$/i;
    if (!event.newData.name || !event.newData.backgroundColor) {
      alert("Write name and color");
      return;
    }
    if (!reg.test(event.newData.backgroundColor)) {
      alert("Write valid color");
      return
    }
    this.skillService.createStatus({ name: event.newData.name, backgroundColor: event.newData.backgroundColor, colorWhite: true }).subscribe(
      data => {
        this.getStatuses();
      },
      error => {
        console.warn(error);
      }
    );
    event.confirm.resolve();
  }

  changeComplete(event: ColorEvent) {
    this.current_color = event.color.hex;
  }

}
