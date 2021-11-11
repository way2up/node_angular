import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b><a href="https://way2up.am/index" target="_blank">WAY2UP</a></b> 2021
    </span>
    <div class="socials">
      <a href="javascript:;"  class="ion ion-social-github"></a>
      <a href="javascript:;" class="ion ion-social-facebook"></a>
      <a href="javascript:;" class="ion ion-social-twitter"></a>
      <a href="javascript:;" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
