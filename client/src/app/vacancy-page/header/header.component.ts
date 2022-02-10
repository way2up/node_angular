import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VacancyService } from '../../@core/data/vacancy.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'header_way2up',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public loggedUser: boolean;
  public contextMenu: boolean;
  public fullName: string;
  public user_id: string;
  public user_photo: string;

  constructor(private router: Router, private auth: AuthService, private vacancyService: VacancyService,) { }

  ngOnInit(): void {
    this.loggedUser = this.auth.isAuthenticated();
    this.user_id = localStorage.getItem("user-id")
    this.fullName = localStorage.getItem("user-fullName")
    this.contextMenu = false;
    this.getVacancies();
  }

  getVacancies() {
    this.vacancyService.getVacancies('', '', this.user_id).subscribe(
      (data: Array<any>) => {
        if (data.length) {
          this.user_photo = data[0].photoName;
        }
      },
      error => {
        console.warn(error);
      }
    )
  }

  toggleContext() {
    this.contextMenu = !this.contextMenu;
  }

  goToProfilePage() {
    this.router.navigate(['/vacancy/candidatePage']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }


}
