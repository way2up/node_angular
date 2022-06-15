import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface newVacancy {
    _id?: string,
    metaTitle?: string,
    metaDescription?: string,
    url: string,
    ogType?: string,
    ogTitle?: string,
    ogDescription?: string,
    ogImage?: string,
    vacancyTitle?: string,
    startDate?: string,
    endDate?: string,
    smallImage?: string,
    bigImage?: string,
    shortDescription?: string,
    longDescription?: string,
    show?: boolean,
    startD?: any,
    endD?: any
    
}

@Injectable({
    providedIn: 'root'
})

export class NewVacancyService {

    constructor(private http: HttpClient) { }

    getNewVacancies() {
        return this.http.get(`/api/getNewVacancies`);
    }

    createNewVacancy(vacancy: newVacancy) {
        return this.http.post('/api/createNewVacancy', vacancy);
    }

    updateNewVacancy(data) {
        return this.http.post('/api/updateNewVacancy', data);
    }

}