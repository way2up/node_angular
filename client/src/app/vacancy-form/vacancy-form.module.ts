import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { VacancyFormComponent } from './vacancy-form.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../@theme/theme.module';
import { NbMenuModule } from '@nebular/theme';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';


const routes: Routes = [{
    path: '',
    component: VacancyFormComponent,
}];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        ThemeModule,
        NbMenuModule,
        MatDatepickerModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatInputModule,
    ],
    exports: [RouterModule],
    declarations: [
        VacancyFormComponent,
    ],
})
export class VacancyFormModule { }