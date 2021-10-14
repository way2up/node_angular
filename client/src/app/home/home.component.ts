import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.auth.getUsers().subscribe(
      (data) => console.log(data),
      error => {
        console.warn(error);
      }
    )
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
