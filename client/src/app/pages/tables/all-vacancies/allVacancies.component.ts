import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { newVacancy, NewVacancyService } from '../../../@core/data/newVacancy.service';
import { SkillService } from '../../../@core/data/skills.service';

// import { SmartTableData } from '../../../@core/data/smart-table';
import { VacancyService } from '../../../@core/data/vacancy.service';
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
        this.getNewVacancies();
    }

    changeCheckbox(data) {
        delete data.colorWhite;
        this.updateVacancy(data);
    }

    createNewVacancy() {
        let data: newVacancy = {
            metaTitle: 'User_7',
            metaDescription: 'desmetetedes_2',
            ogType: 'desmetetedes_2',
            ogTitle: 'desmetetedes_2',
            ogDescription: 'desmetetedes_2',
            ogImage: 'desmetetedes_2',
            vacancyTitle: 'desmetetedes_2',
            startDate: '04.08.2023',
            endDate: '07.10.2023',
            smallImage: 'desmetetedes_2',
            bigImage: 'desmetetedes_2',
            shortDescription: 'desmetetedes_2',
            longDescription: 'desmetetedes_2',
            show: true
        }
        this.newVacancyService.createNewVacancy(data).subscribe(
            (data) => {
                console.log(data, 556985);
            },
            error => {
                console.warn(error);
            }
        );
    }

    updateVacancy(vacancy) {
        this.newVacancyService.updateNewVacancy(vacancy).subscribe(
            (data) => {
                console.log(data);
            },
            error => {
                console.warn(error);
            }
        );
    }

    getNewVacancies() {
        this.newVacancyService.getNewVacancies().subscribe((data: Array<any>) => {
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