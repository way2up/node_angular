import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ColorSketchModule } from 'ngx-color/sketch';

import { ThemeModule } from '../../@theme/theme.module';
import { CheckboxComponent } from './statuses/checkbox.component';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    ColorSketchModule,
    FormsModule ,
  ],
  entryComponents: [
    CheckboxComponent
 ],
  declarations: [
    ...routedComponents,
    CheckboxComponent,
    FsIconComponent,
  ],
})
export class TablesModule { }
