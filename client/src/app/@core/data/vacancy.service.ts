import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
// import { Vacancy } from '../interfaces/IVacancy';


export interface Vacancy {
    firstName: string,
    LastName: string,
    email: string,
    position:string,
    skills: Array<any>,
    languages: Array<any>,
    education: Array<any>,
    socialLinks: Array<any>,
    workExperience: Array<any>,
    city: string,
    address: string,
    telephone: string,
    fileName: string,
    date: string,
    motivation_letter: string,
    Interests_hobby: string,
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