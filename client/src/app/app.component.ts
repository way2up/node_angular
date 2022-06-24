/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';
// import { AnalyticsService } from './@core/utils/analytics.service';
// import { SeoService } from './@core/utils/seo.service';

@Component({
  selector: 'ngx-app',
  template: `
  <router-outlet ></router-outlet>
  <ngx-loader *ngIf="loader" id="loader"></ngx-loader>`,
  styles: [`#loader { 
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 9999;
    height: 100vh;
    background-color: white; }`]
})
export class AppComponent implements OnInit {
  public loader = true;

  constructor(
    public loaderService: LoaderService,
    // private analytics: AnalyticsService, 
    // private seoService: SeoService
    ) { }

  ngOnInit(): void {
    this.loaderService.loaderListener().subscribe(res => {
      setTimeout(() => {
        this.loader = res;
      }, 30);
    });
    // this.analytics.trackPageViews();
    // this.seoService.trackCanonicalChanges();
  }
}
