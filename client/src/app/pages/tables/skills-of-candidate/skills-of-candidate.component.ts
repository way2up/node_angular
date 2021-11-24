import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SkillService } from '../../../@core/data/skills.service';

@Component({
  selector: 'ngx-skills-of-candidate',
  templateUrl: './skills-of-candidate.component.html',
  styleUrls: ['./skills-of-candidate.component.scss']
})
export class SkillsOfCandidateComponent implements OnInit {

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
        this.source.load(data);
      },
      error => {
        console.warn(error);
      }
    )
  }

  onDeleteSkill(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.skillService.deleteSkill( event.data._id).subscribe(
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
    this.skillService.setSkill( event.newData._id, {name: event.newData.name}).subscribe(
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
    this.skillService.createSkill({name: event.newData.name}).subscribe(
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
        this.sourcePosition.load(data);
      },
      error => {
        console.warn(error);
      }
    )
  }

  onDeletePosiotion(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.skillService.deletePosition( event.data._id).subscribe(
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
    this.skillService.setPosition( event.newData._id, {name: event.newData.name}).subscribe(
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
    this.skillService.createPosition({name: event.newData.name}).subscribe(
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
