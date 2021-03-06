import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SkillService } from '../../../@core/data/skills.service';

@Component({
  selector: 'ngx-skills-of-candidate',
  templateUrl: './skills-of-candidate.component.html',
  styleUrls: ['./skills-of-candidate.component.scss']
})
export class SkillsOfCandidateComponent implements OnInit {

  settingsSkills = {
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
    },
  };

  settingsPositions = {
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
    },
  };


  source: LocalDataSource = new LocalDataSource();
  sourcePosition: LocalDataSource = new LocalDataSource();

  constructor(private skillService: SkillService) {
  }

  ngOnInit(): void {
    this.getSkills();
    this.getPositions();
  }

  getSkills() {
    this.skillService.getSkills().subscribe(
      (data: Array<any>) => {
        for(let i = 0; i< data.length; i++) {
          data[i].name = data[i].name.toUpperCase();
        }
        data = data.sort((a: any, b: any) => (a.name >  b.name) ? 1 : -1);
        this.source.load(data);
      },
      error => {
        console.warn(error);
      }
    )
  }

  onDeleteSkill(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.skillService.deleteSkill(event.data._id).subscribe(
        data => {
          this.getSkills();
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

  onEditSkill(event): void {
    if (!event.newData.name) {
      return;
    }
    this.skillService.setSkill(event.newData._id, { name: event.newData.name }).subscribe(
      data => {
        this.getSkills();
      },
      error => {
        console.warn(error);
      }
    );
    event.confirm.resolve();
  }

  onCreateSkill(event): void {
    if (!event.newData.name) {
      return;
    }
    this.skillService.createSkill({ name: event.newData.name }).subscribe(
      data => {
        this.getSkills();
      },
      error => {
        console.warn(error);
      }
    );
    event.confirm.resolve();
  }

  // Positions
  getPositions() {
    this.skillService.getPositions().subscribe(
      (data: Array<any>) => {
        for(let i = 0; i< data.length; i++) {
          data[i].name = data[i].name.toUpperCase();
        }
        data = data.sort((a: any, b: any) => (a.name >  b.name) ? 1 : -1);
        this.sourcePosition.load(data);
      },
      error => {
        console.warn(error);
      }
    )
  }

  onDeletePosiotion(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.skillService.deletePosition(event.data._id).subscribe(
        data => {
          this.getPositions();
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

  onEditPosiotion(event): void {
    if (!event.newData.name) {
      return;
    }
    this.skillService.setPosition(event.newData._id, { name: event.newData.name }).subscribe(
      data => {
        this.getPositions();
      },
      error => {
        console.warn(error);
      }
    );
    event.confirm.resolve();
  }

  onCreatePosiotion(event): void {
    if (!event.newData.name) {
      return;
    }
    this.skillService.createPosition({ name: event.newData.name }).subscribe(
      data => {
        this.getPositions();
      },
      error => {
        console.warn(error);
      }
    );
    event.confirm.resolve();
  }

}
