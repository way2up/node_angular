import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vacancy } from '../../../@core/data/vacancy.service';

@Component({
  selector: 'ngx-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.scss']
})
export class CandidatePageComponent implements OnInit {
  public candidateInfo;
  public age: number;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activeRoute.queryParams.subscribe((params) => {
      this.candidateInfo = JSON.parse(params.data);
      this.age = new Date().getFullYear() - new Date(this.candidateInfo.dateOfBirth).getFullYear();
      console.log(this.candidateInfo);
    })
  }

}
