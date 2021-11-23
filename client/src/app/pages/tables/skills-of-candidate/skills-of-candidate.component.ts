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

  skills: Array<any>;

  source: LocalDataSource = new LocalDataSource();

  constructor(private skillService: SkillService) { 
  }

  ngOnInit(): void {
    this.getSkills();
  }

  getSkills() {
    this.skillService.getSkills().subscribe(
      (data: Array<any>) => {
        this.skills = data;
        this.source.load(this.skills);
      },
      error => {
        console.warn(error);
      }
    )
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.skillService.deleteSkill( event.data._id).subscribe(
        data => {
          console.log(data)
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

  onEditConfirm(event): void {
    this.skillService.setSkill( event.newData._id, {name: event.newData.name}).subscribe(
      data => {
        console.log(data)
        this.getSkills();
      },
      error => {
        console.warn(error);
      }
    );
    event.confirm.resolve();
  }

  onCreateConfirm(event): void {
    this.skillService.createSkill({name: event.newData.name}).subscribe(
      data => {
        console.log(data)
        this.getSkills();
      },
      error => {
        console.warn(error);
      }
    );
    event.confirm.resolve();
  }
 
}
