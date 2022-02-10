import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b><a href="https://way2up.am/index" target="_blank">WAY2UP</a></b> 2021
    </span>
    <div class="socials">
      <a href="https://www.facebook.com/way2up.am"  target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://www.linkedin.com/company/way2up/"  target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
