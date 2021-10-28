import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

import { FormsModule } from '@angular/forms';
import { MiscellaneousModule } from '../miscellaneous/miscellaneous.module';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
