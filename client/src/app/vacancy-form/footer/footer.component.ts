import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer_way2up',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toTop() {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
     });
  }
 
}
