import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { vacancy, NewVacancyService } from '../../../@core/data/newVacancy.service';
import { SkillService } from '../../../@core/data/skills.service';

import { AuthService } from '../../../shared/services/auth.service';
import { CheckboxComponent } from '../statuses/checkbox.component';

@Component({
    selector: 'all-vacancies',
    templateUrl: './allVacancies.component.html',
    styleUrls: ['./allVacancies.component.scss'],
})

export class AllVacanciesComponent implements OnInit {

    public newVacancies: Array<any>;
    public statusId: any;

    settings = {
        columns: {
            metaTitle: {
                title: 'Name',
                type: 'string',
            },
            startDate: {
                title: 'Start Date',
                type: 'string',
                filter: false,
            },
            endDate: {
                title: 'End Date',
                type: 'string',
                filter: false,
            },
            show: {
                title: 'Show',
                type: 'custom',
                editable: false,
                filter: false,
                renderComponent: CheckboxComponent,
                onComponentInitFunction: (instance: any) => {
                    instance.retry.subscribe(updatedData => {
                        this.changeCheckbox(updatedData);
                    });
                },
            }
            // endDate: {
            //     title: 'Status',
            //     type: 'html',
            //     // sort: false,
            //     editable: false,
            //     // filter: false,
            // },
            // date: {
            //     title: 'Date',
            //     type: 'string',
            // },
        },
        actions: {
            columnTitle: 'Actions',
            add: false,
            edit: false,
            delete: false,
            custom: [
                { name: 'viewrecord', title: '<i class="fa fa-edit"></i>' },
            ],
            position: 'right'
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(private auth: AuthService, public newVacancyService: NewVacancyService, public router: Router) { }

    ngOnInit() {
        this.getVacancies();
    }

    changeCheckbox(data) {
        delete data.colorWhite;
        this.updateVacancy(data);
    }

    updateVacancy(vacancy) {
        this.newVacancyService.updateVacancy(vacancy).subscribe(
            (data) => {
                console.log(data);
            },
            error => {
                console.warn(error);
            }
        );
    }

    getVacancies() {
        this.newVacancyService.getVacancies().subscribe((data: Array<any>) => {
            this.newVacancies = data;
            this.source.load(this.newVacancies);
        },
            error => {
                console.warn(error);
            });
    }

    seeMoreInfo(vac) {
        console.log(vac);
        this.router.navigate(['/pages/forms/inputs'], { queryParams: { data: JSON.stringify(vac[`data`]) }, skipLocationChange: true });
    }

}