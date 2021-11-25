import { Component, OnInit } from '@angular/core';
import { ColorEvent } from 'ngx-color';
import { LocalDataSource } from 'ng2-smart-table';
import { SkillService } from '../../../@core/data/skills.service';

@Component({
  selector: 'ngx-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})
export class StatusesComponent implements OnInit {
  public state = '#f30000';
  public current_color: string;

  settings = {
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
      color: {
        title: 'Color',
        type: 'string',
      },
    },
  };

  sourceStatus: LocalDataSource = new LocalDataSource();

  constructor(private skillService: SkillService) { }

  ngOnInit(): void {
    this.current_color = this.state;
    this.getStatuses();
  }

  getStatuses() {
    this.skillService.getStatuses().subscribe(
      (data: Array<any>) => {
        this.sourceStatus.load(data);
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
    if (!event.newData.name || !event.newData.color) {
      alert("Write name and color");
      return;
    }
    if (!reg.test(event.newData.color)) {
      alert("Write valid color");
      return
    }
    this.skillService.setStatus(event.newData._id, { name: event.newData.name, color: event.newData.color }).subscribe(
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
    if (!event.newData.name || !event.newData.color) {
      alert("Write name and color");
      return;
    }
    if (!reg.test(event.newData.color)) {
      alert("Write valid color");
      return
    }
    this.skillService.createStatus({ name: event.newData.name, color: event.newData.color }).subscribe(
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
