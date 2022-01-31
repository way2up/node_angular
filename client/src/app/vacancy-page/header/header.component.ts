import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'header_way2up',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public loggedUser: boolean;
  public contextMenu: boolean;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.loggedUser = this.auth.isAuthenticated();
    this.contextMenu = false
  }

  toggleContext() {
    this.contextMenu = !this.contextMenu; 
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }


}
