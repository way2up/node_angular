import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header_way2up',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public activeHome = true;
  public activeAbout = false;
  public activeServices = false;
  public activeProjects = false;
  public activeProducts = false;
  public activeCareer = false;
  public activeContact = false;

  constructor() { }

  ngOnInit(): void {
  }

  select(data) {
    this.activeHome = false;
    this.activeAbout = false;
    this.activeServices = false;
    this.activeProjects = false;
    this.activeProducts = false;
    this.activeCareer = false;
    this.activeContact = false;

    switch (data) {
      case 'HOME':
        this.activeHome = true;
        break;
      case 'ABOUT':
        this.activeAbout = true;
        break;
      case 'SERVICES':
        this.activeServices = true;
        break;
      case 'PROJECTS':
        this.activeProjects = true;
        break;
      case 'PRODUCTS':
        this.activeProducts = true;
        break;
      case 'CAREER':
        this.activeCareer = true;
        break;
      case 'CONTACT':
        this.activeContact = true;
        break;
    }
  }

}
