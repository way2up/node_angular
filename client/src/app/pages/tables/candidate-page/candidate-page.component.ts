import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkillService } from '../../../@core/data/skills.service';
import { Vacancy, VacancyService } from '../../../@core/data/vacancy.service';

@Component({
  selector: 'ngx-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.scss']
})
export class CandidatePageComponent implements OnInit {
  public candidateInfo;
  public age: number;
  public statusesArr: Array<any>;
  public selectedStatusName: string;
  public selectedStatusColor: string;
  public selectedS: string;

  constructor(private activeRoute: ActivatedRoute, 
    private skillService: SkillService, private vacancyService: VacancyService) { }

  ngOnInit(): void {

    this.activeRoute.queryParams.subscribe((params) => {
      this.candidateInfo = JSON.parse(params.data);
      this.selectedStatusName = this.candidateInfo['status'] ?  this.candidateInfo['status']['name'] : null;
      this.selectedStatusColor = this.candidateInfo['status'] ? this.candidateInfo['status']['color'] : null;
      this.age = new Date().getFullYear() - new Date(this.candidateInfo.dateOfBirth).getFullYear();
      this.getStatuses();
    })
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

  selectStatus(status) {
    this.selectedStatusName = status.name;
    this.selectedStatusColor = status.color;
    this.candidateInfo.status = status;
    const newStatusData = {
      id: this.candidateInfo._id,
      statusName: this.selectedStatusName,
      statusColor: this.selectedStatusColor,
    }

    this.vacancyService.updateVacancy(newStatusData).subscribe(
      (data) => {
        console.log(data)
      },
      error => {
        console.warn(error);
      }
    );
  }

}
