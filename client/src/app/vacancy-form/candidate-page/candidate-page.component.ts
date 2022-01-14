import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'ngx-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.scss']
})
export class CandidatePageComponent implements OnInit {

  public candidate_mail = localStorage.getItem("user-email")

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    

  }

}
