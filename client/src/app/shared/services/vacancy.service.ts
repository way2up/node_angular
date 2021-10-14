import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Vacancy } from '../interfaces/IVacancy';

@Injectable({
    providedIn: 'root'
})
export class VacancyService {

    constructor(private http: HttpClient) { }

    setVacancy(vacancy: Vacancy) {
        return this.http.post('/api/setVacancy', vacancy);
    }

}