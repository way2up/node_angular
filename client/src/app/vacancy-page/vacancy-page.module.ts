import { InjectionToken, NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFocusMonitor, NbInputModule, NbMenuModule, NbSelectModule, NbStatusService, NbTimepickerModule } from '@nebular/theme';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { VacancyPageComponent } from './vacancy-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../@theme/theme.module';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CandidatePageComponent } from './candidate-page/candidate-page.component';
import { AuthGuard } from './candidate.guard';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbdModalContent, VacancyFormComponent } from './vacancy-form/vacancy-form.component';
import { BtDataPickerComponent } from './vacancy-form/bt-data-picker/bt-data-picker.component';

const routes: Routes = [
    {
        path: '',
        component: VacancyPageComponent,

    },
    {
        path: 'candidatePage',
        canActivate: [AuthGuard],
        component: CandidatePageComponent,

    }
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        NbCardModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        ThemeModule,
        NbMenuModule,
        MatDatepickerModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatInputModule,
        NbButtonModule,
        NbTimepickerModule,
        Ng2SmartTableModule,
        NbSelectModule,
        NbInputModule,
        NbCheckboxModule,

    ],
    exports: [RouterModule],

    declarations: [
        VacancyPageComponent,
        VacancyFormComponent,
        HeaderComponent,
        FooterComponent,
        CandidatePageComponent,
        NgbdModalContent,
        BtDataPickerComponent
    ],
    providers: [NbStatusService, AuthGuard],
})
export class VacancyFormModule { }