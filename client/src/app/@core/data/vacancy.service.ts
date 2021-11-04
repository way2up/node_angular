import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
// import { Vacancy } from '../interfaces/IVacancy';


export interface Vacancy {
    firstName: string,
    LastName: string,
    email: string,
    position:string,
    skills: Array<any>,
    education: Array<any>,
    workExperience: Array<any>,
    city: string,
    address: string,
    telephone: string,
    fileName: string,
    date: string,
    introductionText: string,
}

@Injectable({
    providedIn: 'root'
})
export class VacancyService {

    constructor(private http: HttpClient) { }

    getVacancies() {
        return this.http.get(`/api/getVacancies`);
    }

    setVacancy(vacancy: Vacancy) {
        return this.http.post('/api/setVacancy', vacancy);
    }

    uploadFile(file) {
        return this.http.post('/api/upload', file);
    }

}